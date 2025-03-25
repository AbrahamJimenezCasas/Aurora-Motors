import { loginUserSchema } from "../../schemas/users/loginUserSchema.js";
import { loginUserService } from "../../services/users/loginUserService.js";
import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";

export const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        await validateSchemaUtil(loginUserSchema, req.body);

        const token = await loginUserService(email, password);

        res.status(200).send({
            status: "success",
            message: "Usuario logueado correctamente",
            data: { token },
        });
    } catch (error) {
        next(error);
    }
};
