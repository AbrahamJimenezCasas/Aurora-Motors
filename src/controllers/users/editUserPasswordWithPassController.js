import { editPasswordWithPassService } from "../../services/users/editPasswordWithPassService.js";

export const editUserPasswordWithPassController = async (req, res, next) => {
    try {
        // Obtenemos la informacion del request
        const { email, recoveryPass, newPassword } = req.body;

        // Llamamos al servicio
        const usuario = await editPasswordWithPassService(
            email,
            recoveryPass,
            newPassword
        );

        res.status(200).send({
            status: "ok",
            message: "La contraseña se ha actualizado correctamente",
            data: { usuario },
        });
    } catch (error) {
        next(error);
    }
};
