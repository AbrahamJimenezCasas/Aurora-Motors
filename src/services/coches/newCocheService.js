import { insertCocheModel } from "../../models/coches/insertCocheModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const newCocheService = async (
    adminId,
    modelo,
    categoria,
    precio,
    descripcion
) => {
    const id = crypto.randomUUID();
    const result = await insertCocheModel(
        id,
        adminId,
        modelo,
        categoria,
        precio,
        descripcion
    );
    if (result.affectedRows !== 1) {
        throw generateErrorUtils(
            500,
            "COCHE_NOT_CREATED",
            "No se ha podido crear coche"
        );
    }

    return { id, adminId, modelo, categoria, precio, descripcion };
};
