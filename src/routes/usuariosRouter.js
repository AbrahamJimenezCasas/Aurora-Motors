import express from "express";
import { registerUserController } from "../controllers/users/registerUserController.js";
import { getAllUsersController } from "../controllers/users/getAllUsersController.js";
import { activeUserController } from "../controllers/users/activeUserController.js";
import { loginUserController } from "../controllers/users/loginUserController.js";
import { authUserMiddleware } from "../middleware/authUserMiddleware.js";
import { getOwnUserController } from "../controllers/users/getOwnUserController.js";
import { editUserController } from "../controllers/users/editUserController.js";
import { editUserPasswordController } from "../controllers/users/editUserPasswordController.js";
import { sendRecoveryPassController } from "../controllers/users/sendRecoveryPassController.js";
import { editUserPasswordWithPassController } from "../controllers/users/editUserPasswordWithPassController.js";
import { getUserByIdController } from "../controllers/users/getUserByIdController.js";
import { editAvatarUserController } from "../controllers/users/editAvatarUserController.js";
import { removeAvatarUserController } from "../controllers/users/removeAvatarUserController.js";

export const usuariosRouter = express.Router();

usuariosRouter.get("/usuarios", getAllUsersController); // ruta para obtener todos los usuarios
usuariosRouter.post("/usuarios/register", registerUserController); // ruta para registrar un usuario
usuariosRouter.put("/usuarios/active/:registrationCode", activeUserController); // ruta para activar el usuario
usuariosRouter.post("/usuarios/login", loginUserController); // ruta para login
usuariosRouter.get("/usuarios/own", authUserMiddleware, getOwnUserController); // ruta para obtener tu propio usuario
usuariosRouter.get("/usuarios/:id", getUserByIdController); // ruta para obtener un usuario por ID
usuariosRouter.get("/usuarios/:id/reservas"); // ruta para obtener el historico de solicitudes de compra de un usuario
usuariosRouter.put("/usuarios/own", authUserMiddleware, editUserController); // ruta para editar la info de tu usuario
usuariosRouter.patch(
    "/usuarios/avatar",
    authUserMiddleware,
    editAvatarUserController
); // ruta para actualizar el avatar de tu usuario
usuariosRouter.delete(
    "/usuarios/avatar",
    authUserMiddleware,
    removeAvatarUserController
); // ruta para borrar el avatar de tu usuario
usuariosRouter.put(
    "/usuarios/password",
    authUserMiddleware,
    editUserPasswordController
); // ruta para editar la contraseña de un usuario
usuariosRouter.post("/usuarios/password/recovery", sendRecoveryPassController); // ruta para enviar correo de recuperacion de contraseña
usuariosRouter.put(
    "/usuarios/password/recovery",
    editUserPasswordWithPassController
); // ruta para editar contraseña con pass
