import joi from "joi";
import { joiErrorMessages } from "../..users/joiErrorMessages.js";

export const registerCocheSchema = joi.object({
    modelo: joi.string().min(2).max(50).required().messages(joiErrorMessages),
    categoria: joi
        .string()
        .valid("Clase B", "Clase C", "Clase D", "Clase E", "Clase F", "Clase S")
        .required()
        .messages(joiErrorMessages),
    precio: joi.number().precision(2).required().messages(joiErrorMessages),
    descripcion: joi.string().min(20).required().messages(joiErrorMessages),
});
