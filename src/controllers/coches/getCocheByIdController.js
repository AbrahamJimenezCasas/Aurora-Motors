import { getCocheByIdService } from "../../services/coches/getCocheByIdService.js";

export const getCocheByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const coche = await getCocheByIdService(id);

        res.status(200).send({
            status: "success",
            message: "Coche encontrado",
            data: { coche },
        });
    } catch (error) {
        next(error);
    }
};
