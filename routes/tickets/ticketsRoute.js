const {
  postTicket,
  getTickets,
  getTicketsByArea,
  getTicketsByUser,
} = require("../../controllers/tickets/tickets");
const { checkJWT } = require("../../helpers/generateJWT");
const uploadFile = require("../../middlewares/multer");

const router = require("express").Router();

router.post("/post-ticket", checkJWT, uploadFile, postTicket);

router.get("/get-tickets", checkJWT, getTickets);

router.get("/get-tickets-by-area/:area", checkJWT, getTicketsByArea);

router.get("/get-tickets-by-user/:user", checkJWT, getTicketsByUser);

module.exports = router;
