import RDB from "../../config/Database/Redis/redisDB";

export let RDB_get_all_services = (req, res, next) => {
  RDB.hgetall("Service", (err, data) => {
    if (data == null) next();
    else if (Object.keys(data).length > 1) {
      let services = [];
      services.push(JSON.parse(Object.values(data)[0]));

      res.json({ error: null, data: services });
    } else {
      next();
    }
  });
};

export let RDB_get_a_service_by_id = (req, res, next) => {
  RDB.HMGET("Service", 1, (err, data) => {
    if (Object.keys(data).length > 0) {
      res.json({ error: null, data: JSON.parse(Object.values(data)[0]) });
    } else {
      next();
    }
  });
};
