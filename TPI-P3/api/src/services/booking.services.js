import { Booking } from "../models/Booking.js";

export const getAllBookings = async (req, res) => {
   const bookings = await Booking.findAll();
   if (!bookings) {
        return res.status(404).send({message: "No se encontraron reservas"});
   }
   res.json(bookings);
}

export const updateBooking = async (req, res) => {
    const { startDate, endDate, totalPrice } = req.body;
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) {
        return res.status(404).send({message: "Reserva no encontrada"});
    }
    await booking.update({
        startDate, endDate, totalPrice
    });

    res.json(booking);
}

export const createBooking = async (req, res) => {
  const { startDate, endDate, totalPrice } = req.body;

  try {
    const newBooking = await Booking.create({
      startDate, endDate, totalPrice
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error al crear reserva:", error);
    res.status(500).json({ message: "No se pudo crear la reserva" });
  }
};

export const deleteBooking = async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) {
        return res.status(404).send({message: "Reserva no encontrada"});
    }
    await booking.destroy();
    res.send(`La Reserva con id ${id} ha sido eliminada correctamente`);
}