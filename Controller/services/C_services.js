import models from "../../models/index.js";
import RDB from "../../config/Database/Redis/redisDB";
import faker from "faker";

export let get_all_services = (req, res) => {
  try {
    models.services
      .findAll({ raw: true })
      .then((services) => {
        if (services.length > 0) {
          for (let i = 0; i < services.length; i++) {
            RDB.hset("Service", services[i].id, JSON.stringify(services[i]));
            RDB.expire("Service", 100);
          }
        }

        res.json({ error: null, data: services });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send({ error: "Unable to access the Database", data: null });
      });
  } catch (err) {
    res.status(500).send({ error: "Something broke", data: null });
  }
};

export let get_service_by_id = (req, res) => {
  try {
    models.services
      .findOne({ where: { id: req.params.id } })
      .then((service) => {
        if (service) {
          res.send({
            error: null,
            data: service,
          });
        } else {
          res.status(404).send({ error: "service not available", data: null });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: "Unable to access the Database", data: null });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something broke", data: null });
  }
};

export let add_a_service = (req, res) => {
  try {
    const { name, description, image_url } = req.body;
    models.services
      .create({ name, description, image_url })
      .then((success) => {
        res.json({ error: null, data: "Service added successfully" });
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

export let delete_a_service = (req, res) => {
  try {
    models.services
      .destroy({ where: { id: req.params.id } })
      .then((serviceDeleted) => {
        if (serviceDeleted == 1) {
          res.status(200).json({ error: null, data: "Deleted successfully" });
        } else {
          res.status(404).json({ error: "record not found", data: null });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: "Unable to access the Database", data: null });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something broke", data: null });
  }
};

export let edit_a_service = (req, res) => {
  try {
    const { name, description, image_url } = req.body;
    models.services
      .update(
        { name, description, image_url },
        { where: { id: req.params.id } }
      )
      .then((success_report) => {
        if (success_report == 1) {
          res.send({
            error: null,
            data: "Service updated successfully",
          });
        } else {
          res.send({ error: "record not available" });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: "Unable to access the Database", data: null });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something broke", data: null });
  }
};
