import express from 'express'
import { getRelatorioPedidos, getTamanhos, getTipos, postPedido, deletePedido } from "../controllers/controllers.js"

const router = express.Router()

router.get("/api/tamanhos", getTamanhos)
router.get("/api/tipos", getTipos)
router.get("/api/pedido", getRelatorioPedidos)

router.post("/api/pedido", postPedido)
router.delete("/api/pedido/:id", deletePedido)

export default router