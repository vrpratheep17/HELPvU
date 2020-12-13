export default (sequelize, DataTypes) => {
  const user_booking_history = sequelize.define(
    "user_booking_history",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      service_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      service_by_person_name: {
        type: DataTypes.STRING,
      },
      service_by_person_number: {
        type: DataTypes.INTEGER,
      },
      service_status: {
        type: DataTypes.STRING,
        isIn: [["Completed", "Cancelled", "Not active", "Active"]],
        defaultValue: "Not active",
      },
      remarks: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location_type: {
        type: DataTypes.STRING,
        isIn: [["Home", "Office"]],
        allowNull: false,
      },
    },
    {
      tableName: "user_booking_history",
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );

  return user_booking_history;
};
