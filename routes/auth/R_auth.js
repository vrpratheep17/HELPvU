import express from "express";
const router = express.Router();
import {
  sent_otp,
  verify_otp,
  refresh_token,
  get_all_users
} from "../../Controller/auth/C_auth.js";
import {
  send_otp_validator,
  verify_otp_validator,
  refresh_token_validator,
} from "../../Validation/auth/V_auth";

router.post("/sentotp", send_otp_validator, sent_otp);
router.post("/verifyotp", verify_otp_validator, verify_otp);
router.post("/refreshtoken", refresh_token_validator, refresh_token);
router.get("/getallUsers",get_all_users)

export default router;
