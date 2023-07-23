import { Router } from "express";
import {
  getEstilos,
  createNewEstilo,
  getEstiloById,
  deleteEstiloById,
  getTotalEstilos,
  updateEstiloById,
} from "../controllers/estilos.controller";

const router = Router();

router.get("/estilos", getEstilos);

router.post("/estilos", createNewEstilo);

router.get("/estilos/count", getTotalEstilos);

router.get("/estilos/:id", getEstiloById);

router.delete("/estilos/:id", deleteEstiloById);

router.put("/estilos/:id", updateEstiloById);

export default router;
 