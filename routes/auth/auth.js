import express from "express";
const router = express.Router();
import {  } from "../../Controller/auth/auth.js";



/**
* @swagger
* /auth/users/:id:
*  get:
*   tags:
*        - "Auth"
*   summary: get user by number
*   description: "sign up new user with the required fields"
*   parameters:
*   - name: "mobile_no"
*     description: "Enter user mobile no with +91(country code)"
*     required: true
*     type: "integer"
*     format: "int64"
*   - name: "name"
*     description: "Enter user name"
*     required: true
*     type: "string"
*   responses:
*        "200":
*            description: "success"
*        "400":
*           description: "input field missing or invalid field inputs"           
*/

router.route("/users").get().delete();
/**
* @swagger
* /auth/signup:
*  post:
*   tags:
*        - "Auth"
*   summary: signup new user
*   description: "sign up new user with the required fields"
*   parameters:
*   - name: "mobile_no"
*     description: "Enter user mobile no with +91(country code)"
*     required: true
*     type: "integer"
*     format: "int64"
*   - name: "name"
*     description: "Enter user name"
*     required: true
*     type: "string"
*   responses:
*        "200":
*            description: "success"
*        "400":
*           description: "input field missing or invalid field inputs"           
*/

router.post("/signup");
/**
* @swagger
* /auth/signupverfiyotp:
*  post:
*   tags:
*        - "Auth"
*   summary: verify signup user otp
*   description: "verify user phone with otp"
*   parameters:
*   - name: "mobile_no"
*     description: "Enter user mobile no with +91(country code)"
*     required: true
*     type: "integer"
*     format: "int64"
*   - name: "otp"
*     description: "Enter otp"
*     required: true
*     type: "integer"
*   responses:
*        "200":
*            description: "success"
*        "400":
*           description: "input field missing or invalid field inputs"           
*/
router.post("/signupverfiyotp")
/**
* @swagger
* /auth/login:
*  post:
*   tags:
*        - "Auth"
*   summary: login user sent otp
*   description: "already registered user setp otp to registered mobile no"
*   parameters:
*   - name: "mobile_no"
*     description: "Enter user mobile no with +91(country code)"
*     required: true
*     type: "integer"
*     format: "int64"
*   responses:
*        "200":
*            description: "success"
*        "400":
*           description: "input field missing or invalid field inputs"    
*        "404":
*           description: "The number entered is not registered"       
*/
router.post("/login")
/**
* @swagger
* /auth/loginverifyotp:
*  post:
*   tags:
*        - "Auth"
*   summary: login user verify otp
*   description: "verify otp of users during login "
*   parameters:
*   - name: "mobile_no"
*     description: "Enter user mobile no with +91(country code)"
*     required: true
*     type: "integer"
*     format: "int64"
*   - otp: "otp"
*     description: "Enter otp"
*     required: true
*     type: "integer"
*     format: "int64"
*   responses:
*        "200":
*            description: "success"
*        "400":
*           description: "input field missing or invalid field inputs"    
*        "404":
*           description: "The number entered is not registered"       
*/
router.post("/loginverifyotp")
export default router;
