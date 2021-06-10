module.exports = {
    getPhotos: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        try {
            const picArr = await db.images.get_image(id)
    
            res.status(200).send({picArr})
        } catch(err) {
            console.log(err)
            res.status(511).send('You broke it bud')
        }
    },
    addPhoto: (req, res) => {},
    deletePhoto: (req, res) => {}
}