import express from "express";

import { cochesRouter } from "./cochesRouter.js";
import { usuariosRouter } from "./usuariosRouter.js";

export const router = express.Router();

router.use(cochesRouter);
router.use(usuariosRouter);
