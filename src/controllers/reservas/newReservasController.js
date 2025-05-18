import { selectUserByIdModel } from "../../models/users/selectUserByIdModel.js";
import { newReservaService } from "../../services/reservas/newReservaService.js";

export const newReservasController = async (req, res, next) => {
    try {
        const usuarioId = req.usuario;
        const usuario = await selectUserByIdModel(usuarioId.id);
        delete usuario.password;
        // Obtenemos el coche
        const coche = req.coche;

        const reserva = await newReservaService(usuario, coche);

        res.status(201).send({
            status: "ok",
            message: "Reserva realizada con exito",
            data: { reserva },
        });
    } catch (error) {
        next(error);
    }
};
