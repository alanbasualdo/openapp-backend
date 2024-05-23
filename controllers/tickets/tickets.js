const Tickets = require("../../models/Tickets/Tickets");

const postTicket = async (req, res) => {
  try {
    const { area, category, title, description, observers } = JSON.parse(
      req.body.ticket
    );
    const { user } = req;
    const fileName = req.files ? req.files.map((file) => file.filename) : [];

    const newTicket = new Tickets({
      area,
      category,
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
      .populate("category")
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
      .populate("category")
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

const getTicketsByUser = async (req, res) => {
  try {
    const { user } = req.params;
    const tickets = await Tickets.find({
      $or: [{ createdBy: user }, { observers: user }],
    })
      .populate("createdBy")
      .populate("takenBy")
      .populate("observers")
      .populate("category")
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

const putObservers = async (req, res) => {
  try {
    const { ticketID } = req.params; // ID del ticket
    const { user: userId } = req.body; // ID del usuario a agregar/quitar

    // Busca el ticket por su ID
    let ticket = await Tickets.findById(ticketID);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket no encontrado",
      });
    }

    // Si el ID del usuario ya está en el array de observers, lo quita; de lo contrario, lo agrega
    const index = ticket.observers.indexOf(userId);
    if (index !== -1) {
      ticket.observers.splice(index, 1);
    } else {
      ticket.observers.push(userId);
    }

    // Guarda el ticket actualizado
    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Observadores actualizados exitosamente",
      ticket,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const putPriority = async (req, res) => {
  const { ticketID } = req.params;
  const { priority } = req.body;

  try {
    const ticket = await Tickets.findById(ticketID);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket no encontrado",
      });
    }

    ticket.priority = priority;
    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Prioridad actualizada exitosamente",
      ticket,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const putStatus = async (req, res) => {
  const { ticketID } = req.params;
  const { status } = req.body;

  try {
    const ticket = await Tickets.findById(ticketID);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket no encontrado",
      });
    }

    ticket.status = status;
    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Estado actualizado exitosamente",
      ticket,
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
  getTicketsByUser,
  putObservers,
  putPriority,
  putStatus,
  deleteTicket
};
