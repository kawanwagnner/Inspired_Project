const { Router } = require("express");
const locationController = require("../controller/locationController.js");

const router = Router();

router.get("/", locationController.getHome);
router.get("/contact", locationController.getContact);
router.get("/home", locationController.getHome);
router.get("/listLocation", locationController.getAllLocation);
router.get("/forms", locationController.getForm);
router.post("/forms", locationController.newDataForm);
router.get("/error", (req, res) => {
  res.render("error");
});

module.exports = router;
