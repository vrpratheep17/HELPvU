import express from "express";
import route_protection from "../../Utils/route-protection";
const router = express.Router();
import {
  book_a_service_validator,
  get_all_booking_validator,
  get_booking_history_by_id_validator,
  update_a_booking_validator,
} from "../../Validation/booking/V_booking";

import {
  update_a_booking_by_id,
  get_all_booking,
  get_booking_history_by_id,
  book_a_service,
} from "../../Controller/booking/C_booking";

router.post(
  "/bookaservice/",
  route_protection,
  book_a_service_validator,
  book_a_service
);

router.post(
  "/getbookinghistorybyid",
  route_protection,
  get_booking_history_by_id_validator,
  get_booking_history_by_id
);

router.post("/getallbooking", get_all_booking_validator, get_all_booking);

router.put(
  "/updateabookingbyid",
  update_a_booking_validator,
  update_a_booking_by_id
);

export default router;
