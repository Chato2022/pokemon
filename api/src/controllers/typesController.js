const {Type} = require("../db");
const axios = require("axios");
const {apiRawData, cleanTypeArray, createDatabaseTypes} = require("../utils/utils");
//RUTA: Obtener todos los tipos de pokemon
const getAllTypes = async() => {

    const databaseTypes = await Type.findAll();
    if(databaseTypes.length===0){
        const apiTypesRaw = (await axios.get(`https://pokeapi.co/api/v2/type`)).data.results;
        const results = await apiRawData(apiTypesRaw);
        const apiTypes = cleanTypeArray(results);
        let databaseTypesCreated = await createDatabaseTypes(apiTypes);
        if (databaseTypesCreated = "Database Types created") {
            return apiTypes;
        }
    }
    return databaseTypes
}

module.exports = {
    getAllTypes
}