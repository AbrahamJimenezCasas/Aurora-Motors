import { editCocheService } from "../../services/coches/editCocheService.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const editCocheController = async (req, res, next) => {
    try {
        const { id } = req.coche;

        const newInfo = req.body;

        if (!newInfo) {
            throw generateErrorUtils(
                400,
                "INFO_MISSING",
                "No se han enviado datos para actualizar"
            );
        }

        if (
            !newInfo.modelo ||
            !newInfo.categoria ||
            !newInfo.precio ||
            !newInfo.descripcion
        ) {
            throw generateErrorUtils(
                400,
                "INFO_MISSING",
                "Faltan datos para actualizar"
            );
        }

        const coche = await editCocheService(id, newInfo);

        res.status(200).send({
            status: "ok",
            message: "Coche actualizado correctamente",
            data: { coche },
        });
    } catch (error) {
        next(error);
    }
};
