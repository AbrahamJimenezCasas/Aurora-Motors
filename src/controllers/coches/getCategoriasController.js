import { getCategoriasService } from "../../services/coches/getCategoriasService.js";

export const getCategoriasController = async (req, res, next) => {
    try {
        const categorias = await getCategoriasService();
        res.status(200).send({
            status: "success",
            message: "Categorias encontradas",
            data: { categorias },
        });
    } catch (error) {
        next(error);
    }
};
