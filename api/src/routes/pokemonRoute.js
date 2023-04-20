const { Router } = require('express');

const {
    getPokemonsHandler,
    getPokemonByIdHandler,
    createPokemonHandler
} = require("../handlers/pokemonHandler");

const pokemonRouter = Router();

pokemonRouter.get("/",getPokemonsHandler);

pokemonRouter.get("/:id",getPokemonByIdHandler);

pokemonRouter.post("/",createPokemonHandler);


module.exports = pokemonRouter;