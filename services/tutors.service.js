const DB = require('../DB/DB');

const tutorsService = {

    getAllTutors: async (req, res) => {

        const {
            query
        } = req;
        let limit = query.limit;
        let start = query.start;


        if (start == null) {
            start = 0;
        }

        if (limit == null) {
            const tutorsArray = DB.tutors.slice(start);
            return {
                "tutors": tutorsArray,
                "start": start
            }
        } else {
            const tutorsArray = DB.tutors.slice(start, limit);
            return {
                "tutors": tutorsArray,
                "start": start,
                "limit": limit
            }
        }


    },

    getOneTutor: async (req, res) => {

        const id = req.params.idTutor;

        const tutor = DB.tutors.filter(tutor => tutor.id == id);

        return tutor;
    },

    createTutor: async (req, res) => {

        let maxId = Math.max.apply(null, await Promise.all(DB.tutors.map(async tutor => tutor.id)));

        let id = maxId + 1

        tutors.push({
            "id": id,
            "name": req.body.name,
            "email": req.body.email,
            "phone": req.body.phone
        })
    },

    updateTutor: async (req, res) => {
        
        const id = req.params.idTutor;

        const tutor = DB.tutors.findIndex(tutor => tutor.id == id);


        if (req.body.name) {
            tutor.name = req.body.name
        } else if (req.body.species) {
            tutor.species = req.body.species
        } else if (req.body.age) {
            tutor.age = req.body.age
        } else if (req.body.tutor) {
            tutor.tutor = req.body.tutor
        } else {
            res.json({
                "message": "Tutor not found"
            }).status(204);
        }
        res.json({
            "message": "Updated"
        }).status(200)
    },

    deleteTutor: async (req, res) => {

        const id = req.params.idTutor;

        const index = DB.tutors.findIndex(tutor => tutor.id == id);

        if (index !== -1) {
            DB.animals.splice(index, 1);
            res.json({
                "message": "Deleted"
            }).status(200)
        } else {
            res.json({
                "message": "Tutor not found"
            }).status(204);
        }
    }
    
}
module.exports = tutorsService;