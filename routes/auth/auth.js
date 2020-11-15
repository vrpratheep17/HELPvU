import express from "express";
const router = express.Router();
import { testing_get, testing_post } from "../../Controller/auth/auth.js";

/**
 * @swagger
 * /auth/test:
 *  get:
 *    summary: testing purpose
 *    description: testing GET api
 *    responses:
 *       "200":
 *         description: "API call success"
 *       "404":
 *          description: "API not found"
 * @swagger
 * /auth/test:
 *  post:
 *    summary: testing post api
 *    description: testing post api
 *    responses:
 *        "200":
 *            description: "API call SUCCESS"
 *        "404":
 *            description: "API not found"
 */

router.route("/test").get(testing_get).post(testing_post);
export default router;
