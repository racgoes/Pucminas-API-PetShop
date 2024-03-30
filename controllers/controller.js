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
    // Login
    createBearerToken: async (req, res) => {

        const token = await generateBearerToken();
        res.json({
            token
        }).status(200);

    },

    // Users
    getAllUsers: async (req, res) => {
        const data = await usersService.getAllUsers(req, res);
        res.json(data).status(200);
    },

    createUser: async (req, res) => {
        try{
            await usersService.createUser(req, res).then(res.status(201).send({"message":"Created"}));
            console.log("Created")
            
        }catch(e){
            res.send({"Message":"Error"}).status(400);
        }
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
        usersService.updateUser(req, res)
    },

    deleteUser: async (req, res) => {
        usersService.deleteUser(req, res)
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
            await animalsService.createAnimal(req, res).then(res.status(201).send({"message":"Created"}));
            console.log("Created")
            
        }catch(e){
            res.send({"Message":"Error"}).status(400);
        }
    },

    updateAnimal: async (req, res) => {
        console.log("updateAnimal")
        console.log(req.body)
        animalsService.updateAnimal(req, res)
    },

    deleteAnimal: async (req, res) => {
        await animalsService.deleteAnimal(req, res)
    },

    // Tutors
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
        try{
            await tutorsService.createTutor(req, res).then(res.status(201).send({"message":"Created"}));
            console.log("Created")
            
        }catch(e){
            res.send({"Message":"Error"}).status(400);
        }
    },

    updateTutor: async (req, res) => {
        await tutorsService.updateTutor(req, res)
    },

    deleteTutor: async (req, res) => {
        await tutorsService.deleteTutor(req, res)
    },

    // Store
    getStoreInfo: async (req, res) => {
        const data = await storeService.getStoreInfo(req, res);
        res.json(data).status(200);
    },

    updateStore: async (req, res) => {
        await storeService.updateStore(req, res)
    }
};

module.exports = controllers;