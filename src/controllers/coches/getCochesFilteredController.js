import { getCochesFilteredService } from "../../services/coches/getCochesFilteredService.js";

export const getCochesFilteredController = async (req, res, next) => {
    try {
        const filtros = req.query.filtros || {};
        const precio = req.query.precio || {};
        const order = req.query.order || {};
        const limit = req.query.limit || {};
        const search = req.query.search || {};

        let coches = [];

        coches = await getCochesFilteredService(
            filtros,
            precio,
            order,
            limit,
            search
        );

        res.status(200).send({
            status: "success",
            message: "Coches encontrados",
            data: { coches },
        });
    } catch (error) {
        next(error);
    }
};
