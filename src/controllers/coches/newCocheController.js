import { newCocheFotosService } from "../../services/coches/newCocheFotosService.js";
import { newCocheService } from "../../services/coches/newCocheService.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const newCocheController = async (req, res, next) => {
    try {
        const admin = req.usuario;
        const adminId = admin.id;
        const { modelo, categoria, precio, descripcion } = req.body;

        let imagenes = [];
        if (req.files) {
            imagenes = Object.values(req.files);
        }

        if (imagenes.length > 4) {
            throw generateErrorUtils(
                400,
                "IMAGES_LIMIT",
                "No puedes subir mas de 4 imagenes"
            );
        }

        const coche = await newCocheService(
            adminId,
            modelo,
            categoria,
            precio,
            descripcion
        );

        let imagenesResult = [];
        if (imagenes.length > 0) {
            imagenesResult = await newCocheFotosService(
                adminId,
                coche.id,
                imagenes
            );
            if (imagenesResult.length === 0) {
                throw generateErrorUtils(
                    400,
                    "IMAGES_ERROR",
                    "Error al crear las imagenes"
                );
            }
        }

        res.status(201).send({
            status: "success",
            message: "Coche creado con exito",
            data: { ...coche, imagenes: imagenesResult },
        });
    } catch (error) {
        next(error);
    }
};
