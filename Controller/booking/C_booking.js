import models from "../../models/index.js";

export let book_a_service = (req, res) => {
  try {
    const { service_name, location, location_type } = req.body;
    models.user_booking_history
      .create({
        service_name,
        location,
        location_type,
        userId: req.user.id,
      })
      .then((success) => {
        res.json({ error: null, data: "Service booked sucessfully" });
      })
      .catch((err) => {
        res.status(500).json({ error: "Unable to insert data", data: null });
        console.log(err);
      });
    console.log(req.user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something broke", data: null });
  }
};

export let get_booking_history_by_id = (req, res) => {
  try {
    let { limit, offset } = req.body;
    models.user_booking_history
      .findAndCountAll({
        limit: limit,
        offset: offset,
        where: { userId: req.user.id },
      })
      .then((bookings) => {
        res.json({ error: null, data: bookings });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: "Unable to access the Database", data: null });
      });
  } catch (err) {
    res.status(500).send({ error: "Something broke", data: null });
  }
};

export let get_all_booking = (req, res) => {
  try {
    let { limit, offset } = req.body;
    models.user_booking_history
      .findAndCountAll({
        limit: limit,
        offset: offset,
      })
      .then((bookings) => {
        res.json({ error: null, data: bookings });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: "Unable to access the Database", data: null });
      });
  } catch (err) {
    res.status(500).send({ error: "Something broke", data: null });
  }
};

export let update_a_booking_by_id = (req, res) => {
  try {
    models.user_booking_history
      .findOne({ where: { id: req.body.id } })
      .then((booking) => {
        if (booking) {
          let {
            service_name,
            cost,
            service_by_person_name,
            service_by_person_number,
            service_status,
            remarks,
            location,
            location_type,
          } = req.body;
          booking
            .update({
              service_name,
              cost,
              service_by_person_name,
              service_by_person_number,
              service_status,
              remarks,
              location,
              location_type,
            })
            .then((success) => {
              res.send({ error: null, data: "Data updated successfully" });
            })
            .catch((err) => {
              res.send({ error: "Unable to update the data", data: null });
            });
        } else {
          res.status(404).json({ error: "No booking available", data: null });
        }
      });
  } catch (err) {
    res.status(500).send({ error: "Something broke", data: null });
  }
};
