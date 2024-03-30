var express = require('express');
var router = express.Router();

const controller = require('../controllers/controller');

// Middlewares
const verifyToken = require('../middlewares/verifyToken');
const verifyPassword = require('../middlewares/verifyPassword');

router.get('/v1', async (req, res) => {res.send('Server is UP').status(200);});

router.post('/v1/login', verifyPassword, controller.createBearerToken);

router.get('/v1/animals', verifyToken, controller.getAllAnimals)
router.get('/v1/animals/:idAnimal', verifyToken, controller.getOneAnimal)
router.post('/v1/animals', verifyToken, controller.createAnimal);
router.put('/v1/animals/:idAnimal', verifyToken, controller.updateAnimal);
router.delete('/v1/animals/:idAnimal', verifyToken, controller.deleteAnimal);

router.get('/v1/tutors', verifyToken, controller.getAllTutors)
router.get('/v1/tutors/:idTutor', verifyToken, controller.getOneTutor)
router.post('/v1/tutors', verifyToken, controller.createTutor);
router.put('/v1/tutors/:idTutor', verifyToken, controller.updateTutor);
router.delete('/v1/tutors/:idTutor', verifyToken, controller.deleteTutor);

router.get('/v1/users', verifyToken, controller.getAllUsers);
router.get('/v1/users/:userId', verifyToken, controller.getOneUser);
router.post('/v1/users', verifyToken, controller.createUser);
router.put('/v1/users/:userId', verifyToken, controller.updateUser);
router.delete('/v1/users/:userId', verifyToken, controller.deleteUser);

router.get('/v1/store', verifyToken, controller.getStoreInfo);
router.put('/v1/store', verifyToken, controller.updateStore);

module.exports = router