const animalsService = require('../services/animals.service');
const tutorsService = require('../services/tutors.service');
const usersService = require('../services/users.service');
const storeService = require('../services/store.service');

const jwt = require('jsonwebtoken');

const generateBearerToken = async (req, res) => {
    const payload = {};
    const secretKey = 's3cr3t';
    const options = {
        expiresIn: '1h',
    };

    try {
        const token = await jwt.sign(payload, secretKey, options);
        console.log('Bearer token generated:', token);
        return token;
    } catch (error) {
        console.error('Error generating bearer token:', error);
        throw error;
    }
};



const controllers = {

    createBearerToken: async (req, res) => {

        const token = await generateBearerToken();
        res.json({
            token
        }).status(200);

    },

    getAllUsers: async (req, res) => {
        const data = await usersService.getAllUsers(req, res);
    },

    createUser: async (req, res) => {
        const data = await usersService.createUser(req, res);
        res.status(201);
    },
    getOneUser: async (req, res) => {

        const data = await usersService.getOneUser(req, res);
        if (Object.keys(data).length === 0) {
            res.status(404)
        } else {
            res.json(data).status(200);
        }
    },

    updateUser: async (req, res) => {
        animalsService.updateUser(req, res)
    },

    deleteUser: async (req, res) => {
        animalsService.deleteUser(req, res)
    },

    // Animals
    getAllAnimals: async (req, res) => {

        const data = await animalsService.getAllAnimals(req, res);
        res.json(data).status(200);

    },

    getOneAnimal: async (req, res) => {
        const data = await animalsService.getOneAnimal(req, res);
        if (Object.keys(data).length === 0) {
            res.status(404)
        } else {
            res.json(data).status(200);
        }
    },

    createAnimal: async (req, res) => {
        
        try{
            animalsService.createAnimal(req, res).then(res.status(201));
        }catch{
            res.status(400).send("Bad inputs")
        }
    },

    updateAnimal: async (req, res) => {
        animalsService.updateAnimal(req, res)

    },

    deleteAnimal: async (req, res) => {
        animalsService.deleteAnimal(req, res)
    },

    getAllTutors: async (req, res) => {
        const data = await tutorsService.getAllTutors(req, res);
        res.json(data).status(200);
    },

    getOneTutor: async (req, res) => {
        const data = await tutorsService.getOneTutor(req, res);
        if (Object.keys(data).length === 0) {
            res.status(404)
        } else {
            res.json(data).status(200);
        }
    },

    createTutor: async (req, res) => {
        if (animalModel.validateTutorInput(req.body)) {
            tutorsService.createTutor(req, res)
        } else {
            res.json({
                "message": "Bad inputs"
            }).send(400)
        }
    },

    updateTutor: async (req, res) => {
        if (animalModel.validateTutorUpdate(req.body)) {
            tutorsService.updateTutor(req, res)
        } else {
            res.json({
                "message": "Bad inputs"
            }).send(400)
        }
    },

    deleteTutor: async (req, res) => {
        tutorsService.deleteTutor(req, res)
    },

    getStoreInfo: async (req, res) => {
        const data = await storeService.getStoreInfo(req, res);
        res.json(data).status(200);
    },

    updateStore: async (req, res) => {
        storeService.updateStore(req, res)
    }
};

module.exports = controllers;