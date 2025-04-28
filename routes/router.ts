import express from "express"
import messageRoutes from "./messageRoutes"
import ticketRoutes from "./ticketRoutes"
import appConfig from "../config/urlConfig"


const router = express.Router();


router.use(appConfig.messageRoute, messageRoutes)
router.use(appConfig.ticketRoute, ticketRoutes)

export default router