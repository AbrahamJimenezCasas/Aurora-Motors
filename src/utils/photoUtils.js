import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import crypto from "crypto";

import { generateErrorUtils } from "./helpersUtils.js";
import { createPathUtil } from "./foldersUtils.js";

export const savePhotoUtil = async (userRelativePath, image, width) => {
    // Crear el directorio
    await createPathUtil(path.join(process.cwd(), userRelativePath));

    // Nombre de la foto
    const avatarName = `${crypto.randomUUID()}.jpg`;

    // Ruta de la foto
    const avatarPath = path.join(process.cwd(), userRelativePath, avatarName);

    const imgSharp = sharp(image.data);
    imgSharp.resize(width);
    imgSharp.jpeg({ quality: 100 });
    await imgSharp.toFile(avatarPath);

    console.log("Imagen guardada en: ", avatarPath);

    return avatarName;
};

export const deletePhotoUtil = async (avatarPath) => {
    // Borrar la foto
    await fs.unlink(avatarPath, (error) => {
        if (error) {
            throw generateErrorUtils(
                500,
                "DELETE_PHOTO_ERROR",
                `No se ha podido borrar la foto: ${avatarPath}`
            );
        }
    });

    console.log(`Borrado correctamente la foto: ${avatarPath}`);
};
