const { Pokemon } = require("../db");
const {Type} = require("../db");
const axios = require("axios");
const {cleanPokemonArray, apiRawData, cleanPokemon} = require("../utils/utils")

const createPokemon = async (name, image, hp, attack, defense, type) => {
    const newPokemon = await Pokemon.create({name,image,hp,attack,defense});
    //Buscar por id de los tipos q ingresa el usuario
    type.forEach(async(tipo)=>{
        let types = await Type.findOne({where:{name:tipo}});
        //agregar el id del newpokemon y el id del type a la tabla de detalle
        await newPokemon.addType(types);
    })
    return newPokemon;
}

const getPokemonById = async (id,source) => {
    if (source==="api") {
        const apiPokemonRaw = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;//trae la info de la api
        const apiPokemon = cleanPokemon(apiPokemonRaw);
        return apiPokemon
    }else{
        const databasePokemon = await Pokemon.findByPk(id,{
            include:{
                model: Type,
                through:{
                    attributes:[]
                }
            }
        });//trae la info de la bdd
        return databasePokemon
    }
        
}

const getAllPokemons = async() => {
    //Buscar en la bdd
    const databasePokemons = await Pokemon.findAll(); 
    //Buscar en la api
    const apiPokemonsRaw = (await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)).data.results;
    //Limpiar toda la data de la api para que sea similar a la bdd
    const results = await apiRawData(apiPokemonsRaw);
    const apiPokemons = cleanPokemonArray(results);
    //unificar los arrays
    return [...databasePokemons, ...apiPokemons];
}

const getPokemonsByName = async(name) => {

    const databasePokemons = await Pokemon.findAll({where: {name}});

    const apiPokemonsRaw = (await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)).data.results;

    const results = await apiRawData(apiPokemonsRaw);
    const apiPokemons = cleanPokemonArray(results);
    //filtrado de los pokemons por nombre
    const filteredApi = apiPokemons.filter(pokemon => pokemon.name === name)

    return [...databasePokemons,...filteredApi]
}




module.exports = {
    createPokemon,
    getPokemonById,
    getAllPokemons,
    getPokemonsByName
}