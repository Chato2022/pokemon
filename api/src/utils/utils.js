const axios = require("axios");
const {Type} = require("../db");

const cleanPokemonArray = (arr) => 
    arr.map((elem) => {
        return {
            id:elem.id,
            name:elem.name,
            image:elem.sprites.other.dream_world.front_default,
            hp:(elem.stats.find((stat)=>stat.stat.name==="hp")).base_stat,
            attack:(elem.stats.find((stat)=>stat.stat.name==="attack")).base_stat,
            defense:(elem.stats.find((stat)=>stat.stat.name==="defense")).base_stat,
            //speed:(elem.stats.find((stat)=>stat.stat.name==="speed")).base_stat,
            //heigth:elem.height,
            //weight:elem.weight
            created: false
        };
    });

const cleanPokemon = (pokemon) => {
    return{
        id:pokemon.id,
        name:pokemon.name,
        image:pokemon.sprites.other.dream_world.front_default,
        hp:(pokemon.stats.find((stat)=>stat.stat.name==="hp")).base_stat,
        attack:(pokemon.stats.find((stat)=>stat.stat.name==="attack")).base_stat,
        defense:(pokemon.stats.find((stat)=>stat.stat.name==="defense")).base_stat,
        //speed:(elem.stats.find((stat)=>stat.stat.name==="speed")).base_stat,
        //heigth:elem.height,
        //weight:elem.weight,
        type: (pokemon.types.map((types)=>{ return types.type.name})),
        created: false
    }
}

const cleanTypeArray = (arr) =>
    arr.map((elem) => {
        return {
            id: elem.id,
            name: elem.name
        }
    })


const apiRawData = async(arr) => {
    const promises = arr.map(async (element) =>{
        return (await axios.get(element.url)).data
    })
    const results = await Promise.all(promises);

    return results;
}

const createDatabaseTypes = async (arr) => {
    arr.forEach(async (type) => {
        await Type.create({
            id: type.id,
            name: type.name
        })
    });
    return("Database Types created")
}



    module.exports = {
        cleanPokemonArray,
        cleanTypeArray,
        apiRawData,
        createDatabaseTypes,
        cleanPokemon
    }