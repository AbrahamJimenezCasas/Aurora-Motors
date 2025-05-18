import express from "express";
import { getCochesFilteredController } from "../controllers/coches/getCochesFilteredController.js";
import { getCategoriasController } from "../controllers/coches/getCategoriasController.js";
import { getPriceRangeController } from "../controllers/coches/getPriceRangeController.js";
import { getCocheByIdController } from "../controllers/coches/getCocheByIdController.js";
import { authUserMiddleware } from "../middleware/authUserMiddleware.js";
import { newCocheController } from "../controllers/coches/newCocheController.js";
import { checkIsAdminRol } from "../middleware/isAdminMiddleware.js";
import { publishCocheController } from "../controllers/coches/publishCocheController.js";
import { cocheExistsMiddleware } from "../middleware/cocheExistsMiddleware.js";
import { editCocheController } from "../controllers/coches/editCocheController.js";
import { newReservasController } from "../controllers/reservas/newReservasController.js";
import { getAllReservasController } from "../controllers/reservas/getAllReservasController.js";
import { getReservasByUserIdController } from "../controllers/reservas/getReservasByUserIdController.js";
import { getReservaByIdController } from "../controllers/reservas/getReservaByIdController.js";
/* import { isOwnerMiddleware } from "../middleware/isOwnerMiddleware.js"; */

export const cochesRouter = express.Router();

cochesRouter.get("/coches", getCochesFilteredController);
cochesRouter.get("/coches/categorias", getCategoriasController);
cochesRouter.get("/coches/precios", getPriceRangeController);
cochesRouter.get("/coches/:id", getCocheByIdController);
cochesRouter.post("/coches", authUserMiddleware, newCocheController);
cochesRouter.patch(
    "/coches/:id/publicar",
    authUserMiddleware,
    checkIsAdminRol,
    publishCocheController
);
cochesRouter.put(
    "/coches/:id",
    authUserMiddleware,
    cocheExistsMiddleware,
    checkIsAdminRol,
    editCocheController
);
cochesRouter.post(
    "/coches/:id/reservar",
    authUserMiddleware,
    cocheExistsMiddleware,
    newReservasController
);
cochesRouter.get("/reservas", getAllReservasController);
cochesRouter.get(
    "/usuarios/reservas/",
    authUserMiddleware,
    getReservasByUserIdController
);
cochesRouter.get(
    "/coches/:id/reservas",
    cocheExistsMiddleware,
    getReservasByUserIdController
);
cochesRouter.get(
    "/coches/:id/reservas/id_res",
    authUserMiddleware,
    cocheExistsMiddleware,
    getReservaByIdController
);
/* cochesRouter.patch(
    "/coches/:id/reservas/id_res",
    authUserMiddleware,
    cocheExistsMiddleware,
    isOwnerMiddleware,
    editCancelarReservaController
); */
