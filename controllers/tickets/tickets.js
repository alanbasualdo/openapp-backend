const Tickets = require("../../models/Tickets/Tickets");

const postTicket = async (req, res) => {
  try {
    const { area, category, subcategory, title, description, observers } =
      JSON.parse(req.body.ticket);
    const { user } = req;
    const fileName = req.files ? req.files.map((file) => file.filename) : [];

    const newTicket = new Tickets({
      area,
      category,
      subcategory,
      title,
      description,
      observers,
      attachments: fileName,
      createdBy: user._id,
    });

    await newTicket.save();

    res.status(201).json({
      success: true,
      message: "Ticket creado exitosamente",
      newTicket,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await Tickets.find()
      .populate("createdBy")
      .populate("takenBy")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Lista de tickets obtenida exitosamente",
      tickets,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const getTicketsByArea = async (req, res) => {
  try {
    const { area } = req.params;
    const tickets = await Tickets.find({ area: area })
      .populate("createdBy")
      .populate("takenBy")
      .populate("observers")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Lista de tickets obtenida exitosamente",
      tickets,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    await Position.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Puesto eliminado exitosamente",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

module.exports = {
  postTicket,
  getTickets,
  getTicketsByArea,
  deleteTicket,
};
