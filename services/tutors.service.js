const animals = require('../DB/animals');
const tutors = require('../DB/tutors');

const tutorsService = {

    getAllTutors: async (req, res) => {

        const {
            query
        } = req;
        const limit = query.limit;
        const start = query.start;


        if (start == null) {
            start = 0;
        }

        if (limit == null) {
            const tutorsArray = tutors.slice(start);
            return {
                "tutors": tutorsArray,
                "start": start
            }
        } else {
            const tutorsArray = tutors.slice(start, limit);
            return {
                "tutors": tutorsArray,
                "start": start,
                "limit": limit
            }
        }


    },

    getOneTutor: async (req, res) => {

        const {
            query
        } = req;
        const id = query.id;

        const tutor = tutors.filter(tutor => tutor.id == id);

        return tutor;
    },

    createTutor: async (req, res) => {

        const ids = tutors.map(tutor => {
            return tutor.id;
        });

        const maxId = Math.max(ids)

        id = maxId + 1

        tutors.push({
            "id": maxId,
            "name": req.body.name,
            "email": req.body.email,
            "phone": req.body.phone
        })

        res.json({
            "message": "Tutor created"
        }).status(201)
    },

    updateTutor: async (req, res) => {
        const {
            id
        } = req.query;

        const index = tutors.findIndex(tutor => tutor.id == id);

        const attributes = Object.keys(req.body);

        if (req.body.name) {
            index.name = req.body.name
        } else if (req.body.species) {
            index.species = req.body.species
        } else if (req.body.age) {
            index.age = req.body.age
        } else if (req.body.tutor) {
            index.tutor = req.body.tutor
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
        const {
            id
        } = req.query;

        const index = tutors.findIndex(tutor => tutor.id == id);

        if (index !== -1) {
            animals.splice(index, 1);
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