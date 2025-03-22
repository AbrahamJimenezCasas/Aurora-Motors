import { getAllUsersService } from "../../services/users/getAllUsersService.js";

export const getAllUsersController = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        res.status(200).send({
            status: "success",
            message: "Lista de usuarios",
            data: { users },
        });
    } catch (error) {
        next(error);
    }
};
