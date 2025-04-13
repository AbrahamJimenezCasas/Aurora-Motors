import { updateCocheModel } from "../../models/coches/updateCocheModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const editCocheService = async (id, newInfo) => {
    const cleanInfo = {
        modelo: newInfo.modelo ?? null,
        categoria: newInfo.categoria ?? null,
        precio: newInfo.precio ?? null,
        descripcion: newInfo.descripcion ?? null,
    };

    const result = await updateCocheModel(id, cleanInfo);

    if (result.affectedRows === 0) {
        throw generateErrorUtils(
            500,
            "COCHE_NOT_UPDATED",
            "El coche no se ha actualizado"
        );
    }

    return { id, ...cleanInfo };
};
