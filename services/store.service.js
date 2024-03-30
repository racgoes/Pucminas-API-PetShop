const DB = require('../DB/DB');

const storeService = {

    getStoreInfo: async (req, res) => {
        return DB.store;
    },
    updateStore: async (req, res) => {

        if (req.body.name) {
            DB.store.name = req.body.name
        } else if (req.body.url) {
            DB.store.url = req.body.url
        } else if (req.body.description) {
            DB.store.description = req.body.description
        } else if (req.body.documentNumber) {
            DB.store.documentNumber = req.body.documentNumber
        } else {
            res.json({
                "message": "Attribute not found"
            }).status(204);
        }
        res.json({
            "message": "Updated"
        }).status(200)
    }


}
module.exports = storeService;