const users = require('../DB/users');

const usersService = {

    getAllUsers: async (req, res) => {

        const {
            query
        } = req;
        let limit = query.limit;
        let start = query.start;


        if (start == null) {
            start = 0;
        }

        if (limit == null) {
            const usersArray = users.slice(start);
            return {
                "users": usersArray,
                "start": start
            }
        } else {
            const usersArray = users.slice(start, limit);
            
            const usersArrayNoPass =  usersArray.map(({ id, name }) => ({ id, name }));
            
            return {
                "users": usersArrayNoPass,
                "start": start,
                "limit": limit
            }
        }


    },

    getOneUser: async (req, res) => {

        const {
            query
        } = req;
        const id = query.id;

        const user = users.filter(user => user.id == id);
        
        return user.map(({ id, name }) => ({ id, name }));
    },

    getOneUserByUsername: async (name) => {

        const user = users.filter(user => user.name == name);
        return user.map(({ id, name }) => ({ id, name }));
    },

    comparePasswords: async (password, dbPassword) => {
        console.log('password', password);
        console.log('dbPassword', dbPassword);
        if (password == dbPassword) { // Não usado hash por fins didáticos
            return true;
        } else {
            return false;
        }
    },

    createUser: async (req, res) => {

        const ids = users.map(user => {
            return user.id;
        });

        // const tutor = tutors.filter(tutor => tutor.name == req.body.name);

        const maxId = Math.max(ids)

        id = maxId + 1

        users.push({
            "id": maxId,
            "name": req.body.name,
            "password": req.body.password
        })
    },

    updateUser: async (req, res) => {
        const {
            id
        } = req.query;

        const index = users.findIndex(user => user.id == id);


        if (req.body.name) {
            index.name = req.body.name
        } else if (req.body.password) {
            index.password = req.body.password
        } else {
            res.json({
                "message": "User not found"
            }).status(204);
        }
        res.json({
            "message": "Updated"
        }).status(200)
    },

    deleteUser: async (req, res) => {
        const {
            id
        } = req.query;

        const index = users.findIndex(user => user.id == id);

        if (index !== -1) {
            users.splice(index, 1);
            res.json({
                "message": "Deleted"
            }).status(200)
        } else {
            res.json({
                "message": "User not found"
            }).status(204);
        }
    }

}
module.exports = usersService;