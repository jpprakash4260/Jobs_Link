const express = require("express");
const employerRoutes = express.Router();
const { employerController, } = require("../../controllers");
const { employer_validate } = require("../../validators");
const { verifyToken } = require("../../middleware");



// CRUD Routes

employerRoutes.post("/", employer_validate.create, employerController.create)
employerRoutes.get("/", employerController.get)
employerRoutes.get("/:recut_id", employerController.getByPk)
employerRoutes.post("/Details", employerController.getCollegeDetails)
employerRoutes.put("/:recut_id", employer_validate.update, employerController.update)
employerRoutes.delete("/delete", employerController.delete)

// Logged In USER
employerRoutes.get('/employer-dashboard', verifyToken.validateToken, employerController.dashboard);
employerRoutes.post('/emp-change-password', verifyToken.validateToken, employer_validate.empChangePassword, employerController.emp_change_Password);
employerRoutes.post('/emp-postJob', verifyToken.validateToken, employer_validate.empPostJob, employerController.post_job);

module.exports = employerRoutes;