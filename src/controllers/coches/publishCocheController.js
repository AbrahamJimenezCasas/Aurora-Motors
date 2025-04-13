import { publishCocheService } from "../../services/coches/publishCocheService.js";

export const publishCocheController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const coche = await publishCocheService(id);

        res.status(200).send({
            status: "success",
            message: "Coche publicado",
            data: { coche },
        });
    } catch (error) {
        next(error);
    }
};
