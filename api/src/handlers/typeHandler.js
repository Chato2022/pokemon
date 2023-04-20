const {getAllTypes} = require("../controllers/typesController")

const getAllTypesHandler = async(req,res) => {

    try {
        const allPokemonTypes = await getAllTypes();
        res.status(200).json(allPokemonTypes);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

module.exports = {
    getAllTypesHandler
}