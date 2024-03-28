var express = require('express');
var router = express.Router();

const controller = require('../v1/controllers/v1/controller');

/v1//v1/ Middlewares
const verifyToken = require('../v1/middlewares/v1/verifyToken');

router.get('/', async (req, res) => {res.send('Server is UP').status(200);});

router.post('/v1/login', controller.createBearerToken);

router.get('/v1/animals', verifyToken, controller.getAllAnimals)
router.get('/v1/animals', verifyToken, controller.getOneAnimal)
router.post('/v1/animals', verifyToken, controller.createAnimal);
router.put('/v1/animals', verifyToken, controller.updateAnimal);
router.delete('/v1/animals', verifyToken, controller.deleteAnimal);

router.get('/v1/tutors', verifyToken, controller.getAllTutors)
router.get('/v1/tutors', verifyToken, controller.getOneTutor)
router.post('/v1/tutors', verifyToken, controller.createTutor);
router.put('/v1/tutors', verifyToken, controller.updateTutor);
router.delete('/v1/tutors', verifyToken, controller.deleteTutor);

router.get('/v1/users', verifyToken, controller.getAllUsers);
router.get('/v1/users', verifyToken, controller.getOneUser);
router.post('/v1/users', verifyToken, controller.createUser);
router.put('/v1/users', verifyToken, controller.updateUser);
router.delete('/v1/users', verifyToken, controller.deleteUser);

router.get('/v1/store', verifyToken, controller.getStoreInfo);
router.put('/v1/store', verifyToken, controller.updateStore);

module.exports = router