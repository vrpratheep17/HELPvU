/////////////////////////////////////////////////////////////////
//                      ! auth/sentotp
////////////////////////////////////////////////////////////////

/**
 * @swagger
 * /auth/sentotp:
 *  post:
 *   tags:
 *        - "Auth"
 *   summary: sent otp to the mobile number
 *   description: ""
 *   parameters:
 *       - name: mobile_number
 *         type: string
 *         in: formData
 *         required: true
 *   responses:
 *        "200":
 *            description: "success"
 *        "400":
 *           description: "input field missing or invalid field inputs"
 *        "500":
 *           description: "Internal server error"
 */

/////////////////////////////////////////////////////////////////
//                      ! auth/verifyotp
////////////////////////////////////////////////////////////////

/**
 * @swagger
 * /auth/verifyotp:
 *  post:
 *   tags:
 *        - "Auth"
 *   summary: verify otp send to the mobile number
 *   description: ""
 *   consumes:
 *     - "application/json"
 *     - "application/xml"
 *   produces:
 *     - "application/xml"
 *     - "application/json"
 *   parameters:
 *       - name: mobile_number
 *         type: string
 *         in: formData
 *         required: true
 *       - name: otp
 *         type: string
 *         in: formData
 *         required: true
 *   required:
 *    - "mobile_number"
 *    - "otp"
 *   responses:
 *        "200":
 *            description: "success"
 *        "400":
 *           description: "input field missing or invalid field inputs"
 *        "500":
 *           description: "Internal server error"
 */
