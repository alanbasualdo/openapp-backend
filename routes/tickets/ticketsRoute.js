const { postTicket, getTickets } = require("../../controllers/tickets/tickets");
const { checkJWT } = require("../../helpers/generateJWT");
const uploadFile = require("../../middlewares/multer");

const router = require("express").Router();

router.post("/post-ticket", checkJWT, uploadFile, postTicket);

router.get("/get-tickets", checkJWT, getTickets);

module.exports = router;
