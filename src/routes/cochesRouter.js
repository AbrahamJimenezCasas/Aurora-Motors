import express from "express";

export const cochesRouter = express.Router();

import { getCocheByIdController } from "../controllers/coches/getCocheByIdController.js";
import { editCocheController } from "../controllers/coches/editCocheController.js";
import { getCochesFilteredController } from "../controllers/coches/getCochesFilteredController.js";
import { getCategoriasController } from "../controllers/coches/getCategoriasController.js";
import { getPriceRangeController } from "../controllers/coches/getPriceRangeController.js";
import { newCocheController } from "../controllers/coches/newCocheController.js";
import { publishCocheController } from "../controllers/coches/publishCocheController.js";

cochesRouter.get("/coches", getCochesFilteredController);
cochesRouter.get("/coches/categorias", getCategoriasController);
cochesRouter.get("/coches/precios", getPriceRangeController);
cochesRouter.get("/coches/:id", getCocheByIdController);
cochesRouter.post("/coches/new", newCocheController);
cochesRouter.patch("/coches/:id/publicar", publishCocheController);
cochesRouter.put("/coches/:id", editCocheController);
