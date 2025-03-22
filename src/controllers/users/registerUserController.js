import { registerUserSchema } from "../../schemas/users/registerUserSchema.js";
import { registerUserService } from "../../services/users/registerUserService.js";
import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";

export const registerUserController = async (req, res, next) => {
    try {
        const { username, nombre, apellidos, email, password } = req.body;

        await validateSchemaUtil(registerUserSchema, req.body);

        const user = await registerUserService(
            username,
            nombre,
            apellidos,
            email,
            password
        );

        res.status(201).send({
            status: "success",
            message: "Usuario creado correctamente",
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};
