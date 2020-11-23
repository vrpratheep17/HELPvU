// ? for post method template
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