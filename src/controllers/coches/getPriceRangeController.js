import { getPriceRangeService } from "../../services/coches/getPriceRangeService.js";

export const getPriceRangeController = async (req, res, next) => {
    try {
        const prices = await getPriceRangeService();
        res.status(200).send({
            status: "success",
            message: "Rango de precios obtenido",
            data: { prices },
        });
    } catch (error) {
        next(error);
    }
};
