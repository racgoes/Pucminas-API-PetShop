const store = require('../DB/store');

const storeService = {

    getStoreInfo: async (req, res) => {
        return store;
    },
    updateStore: async (req, res) => {

        if (req.body.name) {
            store.name = req.body.name
        } else if (req.body.url) {
            store.url = req.body.url
        } else if (req.body.description) {
            store.description = req.body.description
        } else if (req.body.documentNumber) {
            store.documentNumber = req.body.documentNumber
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