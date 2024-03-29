const animals = require('../DB/animals');
const tutors = require('../DB/tutors');

const animalsService = {

    getAllAnimals: async (req, res) => {

        const {
            query
        } = req;
        let limit = query.limit;
        let start = query.start;


        if (start == null) {
            start = 0;
        }

        if (limit == null) {
            const animalsArray = animals.slice(start);
            return {
                "animals": animalsArray,
                "start": start
            }
        } else {
            const animalsArray = animals.slice(start, limit);
            return {
                "animals": animalsArray,
                "start": start,
                "limit": limit
            }
        }


    },

    getOneAnimal: async (req, res) => {

        const id = req.params.idAnimal;

        const animal = animals.filter(animal => animal.id == id);

        return animal;
    },

    createAnimal: async (req, res) => {

        let maxId = Math.max.apply(null, await Promise.all(animals.map(async animal => animal.id)));

        let id = maxId + 1
        console.log(req.body)
        console.log("maxId", maxId)
        console.log("criando animal")
        animals.push({
            "id": id,
            "name": req.body.name,
            "species": req.body.species,
            "age": req.body.age,
            "tutor": req.body.tutor
        })
        return animals
    },

    updateAnimal: async (req, res) => {

        const id = req.params.idAnimal;

        const index = animals.findIndex(animal => animal.id == id);

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
                "message": "Animal not found"
            }).status(204);
        }
        res.json({
            "message": "Updated"
        }).status(200)
    },

    deleteAnimal: async (req, res) => {

        const id = req.params.idAnimal;

        const index = animals.findIndex(animal => animal.id == id);

        if (index !== -1) {
            animals.splice(index, 1);
            res.json({
                "message": "Deleted"
            }).status(200)
        } else {
            res.json({
                "message": "Animal not found"
            }).status(204);
        }
    }
    
}
module.exports = animalsService;