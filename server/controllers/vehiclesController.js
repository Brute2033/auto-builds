module.exports = {
    getVehicles: async (req, res) => {
        const {user_id} = req.session.user
        const {mine, search, oldest} = req.query
        const db = await req.app.get('db')
        if(mine && !search){
            if(oldest){
                db.vehicles.read_all_oldest_first()
                .then(builds => res.status(200).send(builds))
            } else {
                db.vehicles.read_all_builds()
                .then(builds => res.status(200).send(builds))
            }
        } else if (!mine && search){
            if(oldest){
                db.search.search_other_oldest_first([`%${search.toLowerCase()}%`, user_id])
                .then(builds => res.status(200).send(builds))
            } else {
                db.search.search_other_users_builds([`%${search.toLowerCase()}%`, user_id])
                .then(builds => res.status(200).send(builds))
            }
        } else if (mine && search){
            if(oldest){
                db.search.search_all_oldest_first([`%${search.toLowerCase()}%`])
                .then(builds => res.status(200).send(builds))
            } else {
                db.search.search_all_builds([`%${search.toLowerCase()}`])
                .then(builds => res.status(200).send(builds))
            }
        } else {
            if(oldest){
                db.vehicles.read_other_oldest_first([user_id])
                .then(builds => res.status(200).send(builds))
            } else {
                db.vehicles.read_other_users_builds([user_id])
                .then(builds => res.status(200).send(builds))
            }
        }
    },
    addVehicle: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {year, make, model, trim, description, type, link} = req.body
        const date = new Date
        const [vehicle] = await db.vehicles.create_build([user_id, year, make, model, trim, date])
        const [modInfo] = await db.mods.create_mod([vehicle.vehicle_id, description, type])
        const [imgInfo] = await db.images.create_image([vehicle.vehicle_id, link])
        res.sendStatus(200)
    },
    readVehicle: (req, res) => {
        req.app.get('db').vehicles.read_build(req.params.id)
        .then(build => {
            build[0] ? res.status(200).send(build[0]) : res.sendStatus(511)
    })
        .catch((err) => console.log(err))
    },
    deleteVehicle: async (req, res) => {
        const db = req.app.get('db')
        const {vehicle_id} = req.params
        // const {vehicle} = req.body
        try{
            await db.vehicles.delete_build(vehicle_id)
            const vehiclesArr = await db.vehicles.read_all_builds()

            res.status(200).send({vehiclesArr})
        }
        catch(err){
            console.log(err)
            res.status(511).send('You done goofed bud')
        }
    }
}