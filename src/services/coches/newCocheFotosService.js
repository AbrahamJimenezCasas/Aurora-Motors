import path from "path";
import crypto from "crypto";
import { generateErrorUtils } from "../../utils/helpersUtils.js";
import { savePhotoUtil } from "../../utils/photoUtils.js";
import { insertPhotoModel } from "../../models/photos/insertPhotoModel.js";

export const newCocheFotosService = async (adminId, cocheId, imagenes) => {
    const processedPhotos = [];

    const photosRelativePath = path.join(
        "src/uploads/coches",
        adminId,
        cocheId
    );

    for (const imagen of imagenes) {
        const id = crypto.randomUUID();

        const nombre = await savePhotoUtil(photosRelativePath, imagen, 800);

        const result = await insertPhotoModel(id, cocheId, nombre);

        if (result.affectedRows !== 1) {
            throw generateErrorUtils(
                500,
                "FOTO_NOT_CREATED",
                "No se ha podido crear la foto"
            );
        }

        processedPhotos.push({ id, nombre, cocheId });
    }

    return processedPhotos;
};
