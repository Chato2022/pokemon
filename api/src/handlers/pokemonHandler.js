const {createPokemon, getPokemonById, getPokemonsByName, getAllPokemons} = require("../controllers/pokemonsController");
//RUTA: Obtener todos los pokemons o solo los que coincidan con el nombre
const getPokemonsHandler = async (req,res) => {
    const {name} = req.query;

    const results = name? await getPokemonsByName(name) : await getAllPokemons();
    try {
        if(results.length===0){
            throw Error("No se encontraron a los pokemons");
        }
        else{
            res.status(200).json(results);
        }
    } catch (error) {
        res.status(404).json({error:error.message});
    }
};
//RUTA: Obtener el Pokemon por id
const getPokemonByIdHandler = async(req,res) => {
        const {id} = req.params;
        const source = isNaN(id)? "bdd": "api";
    try {
        const pokemon = await getPokemonById(id,source);

        if (!pokemon) {
            throw Error("No se encontro al pokemon")
        } else {
            return res.status(200).json(pokemon);
        }
    } catch (error) {
        return res.status(404).json({error : error.message});
    }
};
//RUTA: Crear un pokemon
const createPokemonHandler = async (req,res) => {
    try {
        const {name, image, hp, attack, defense, type} = req.body;

        if (!name || !image || !hp || !attack || !defense || !type) {
            throw Error("No se pasaron los valores necesarios");
        } else {
            const newPokemon = await createPokemon(name, image, hp, attack, defense, type)

            if (!newPokemon) {
                throw Error("No se pudo crear el Pokemon")
            } else {
                return res.status(200).json(newPokemon);
            }
        }
    } catch (error) {
        return res.status(404).json({error:error.message});
    }
};

module.exports = {
    getPokemonsHandler,
    getPokemonByIdHandler,
    createPokemonHandler
}