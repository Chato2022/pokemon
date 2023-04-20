const {Router} = require("express");

const {getAllTypesHandler} = require("../handlers/typeHandler")

const typeRouter = Router();

typeRouter.get("/",getAllTypesHandler)

module.exports = typeRouter;