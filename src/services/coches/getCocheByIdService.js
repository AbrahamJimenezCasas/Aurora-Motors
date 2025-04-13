import { selectCocheByIdModel } from "../../models/coches/selectCocheByIdModel.js";
import { selectFotosByCocheIdModel } from "../../models/coches/selectFotosByCocheIdModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const getCocheByIdService = async (id) => {
    const coche = await selectCocheByIdModel(id);

    if (!coche) {
        throw generateErrorUtils(404, "COCHE_NOT_FOUND", "Coche no encontrado");
    }

    const fotos = await selectFotosByCocheIdModel(coche.id);
    coche.fotos = fotos;

    return coche;
};
