import express from "express";
const router = express.Router();
import {
  RDB_get_all_services,
  RDB_get_a_service_by_id,
} from "../../Cache-Redis/service/RDB_service";

import {
  add_a_service,
  edit_a_service,
  delete_a_service,
  get_all_services,
  get_service_by_id,
} from "../../Controller/services/C_services";
import {
  add_a_service_validator,
  edit_a_service_validator,
  delete_a_service_validator,
  get_service_by_id_validator,
} from "../../Validation/services/V_services";

router.get("/getallservices", RDB_get_all_services, get_all_services);
router.get(
  "/getservicebyid/:id",
  get_service_by_id_validator,
  RDB_get_a_service_by_id,
  get_service_by_id
);
router.post("/addaservice", add_a_service_validator, add_a_service);
router.delete(
  "/deleteaservice/:id",
  delete_a_service_validator,
  delete_a_service
);
router.put("/editaservice/:id", edit_a_service_validator, edit_a_service);

export default router;
