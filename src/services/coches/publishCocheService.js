import { updatePublishCocheModel } from "../../models/coches/updatePublishCocheModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const publishCocheService = async (cocheId) => {
    const result = await updatePublishCocheModel(cocheId);

    if (result.affectedRows !== 1) {
        throw generateErrorUtils(
            500,
            "COCHE_NOT_PUBLISHED",
            "No se ha podido publicar el coche"
        );
    }

    return { cocheId };
};
