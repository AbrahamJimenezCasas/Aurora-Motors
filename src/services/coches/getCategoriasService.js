import { selectCategoriasModel } from "../../models/coches/selectCategoriasModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const getCategoriasService = async () => {
    const categorias = await selectCategoriasModel();

    if (!categorias) {
        throw generateErrorUtils(
            404,
            "CATEGORIAS_NOT_FOUND",
            "Categorias no encontradas"
        );
    }

    return categorias;
};
