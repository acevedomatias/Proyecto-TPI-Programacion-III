import { DataTypes } from "sequelize";
import { sequelize } from "../../db.js";
import { ReservationStatus } from "../enums/enums.js";

export const Reservation = sequelize.define("reservation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }
}, { timestamps: false });
