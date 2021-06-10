module.exports = {
    getMods: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        try {
            const interiorArr = await db.mods.get_interior_mods(id)
            const exteriorArr = await db.mods.get_exterior_mods(id)

            res.status(200).send({exteriorArr, interiorArr})
        } catch(err) {
            console.log(err)
            res.status(511).send('You broke it bud')
        }
        

        // db.mods.read_mods(req.params.id)
        // .then(mods => {
        //     console.log(mods)
        //     mods[0] ? res.status(200).send(mods) : res.sendStatus(511)
        // })
        // .catch((err) => {
        //     console.log(err)
        //     res.status(500).send(err)
        // })
    },
    addMod: async (req, res) => {
        const db = req.app.get('db')
        // const {id} = req.params
        const {vehicle, description, type} = req.body
        try{
            await db.mods.create_mod(vehicle, description, type)
            const interiorArr = await db.mods.get_interior_mods(vehicle)
            const exteriorArr = await db.mods.get_exterior_mods(vehicle)

            res.status(200).send({exteriorArr, interiorArr})
        }
        catch(err) {
            console.log(err)
            res.status(511).send('You done goofed bud')
        }
    },
    editMod: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {vehicle, descriptionTwo} = req.body
        // console.log(id)
        // console.log(vehicle)
        // console.log(description)
        try{
            await db.mods.edit_mod(id, descriptionTwo)
            const interiorArr = await db.mods.get_interior_mods(vehicle)
            const exteriorArr = await db.mods.get_exterior_mods(vehicle)
            
            res.status(200).send({exteriorArr, interiorArr})
        }
        catch(err){
            console.log(err)
            res.status(511).send('You done goofed bud')
        }
    },
    deleteMod: async (req, res) => {
        const db = req.app.get('db')
        const {mod_id} = req.params
        const {vehicle} = req.body
        try{
            await db.mods.delete_mod(mod_id)
            const interiorArr = await db.mods.get_interior_mods(vehicle)
            const exteriorArr = await db.mods.get_exterior_mods(vehicle)
            
            res.status(200).send({exteriorArr, interiorArr})
        }
        catch(err){
            console.log(err)
            res.status(511).send('You done goofed bud')
        }
    }
}