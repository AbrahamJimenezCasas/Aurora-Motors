import { getCocheByIdService } from "../services/coches/getCocheByIdService.js";

export const cocheExistsMiddleware = async (req, res, next) => {
    try {
        const { id } = req.params;
        const coche = await getCocheByIdService(id);

        // Guardar el artículo en req
        req.coche = coche;

        // Continuar
        next();
    } catch (error) {
        next(error);
    }
};
