import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";
import { Cabin } from "./Cabin.js";

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
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, { timestamps: false });

// relaciones
User.hasMany(Reservation, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Reservation.belongsTo(User, { foreignKey: "userId" });

Cabin.hasMany(Reservation, {
  foreignKey: "cabinId",
  onDelete: "CASCADE",
});
Reservation.belongsTo(Cabin, { foreignKey: "cabinId" });