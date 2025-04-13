import { selectCochesFilteredModel } from "../../models/coches/selectCochesFilteredModel.js";
import { selectFotosByCocheIdModel } from "../../models/coches/selectFotosByCocheIdModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const getCochesFilteredService = async (
    filtros,
    precio,
    order,
    limit,
    search
) => {
    const coches = await selectCochesFilteredModel(
        filtros,
        precio,
        order,
        limit,
        search
    );

    for (const coche of coches) {
        const fotos = await selectFotosByCocheIdModel(coche.id);
        coche.fotos = fotos;
    }

    if (!coches) {
        throw generateErrorUtils(
            404,
            "COCHES_NOT_FOUND",
            "No se han encontrado los coches con los filtros proporcionados"
        );
    }

    return coches;
};
