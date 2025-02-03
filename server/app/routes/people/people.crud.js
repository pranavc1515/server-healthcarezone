const { Router } = require("express");
const peopleController = require("../../controller/people/people.crud.js");
const router = Router();

router.post("/people/addPeople", peopleController.addPeople);
router.get("/people/getByRole", peopleController.getByRole);
router.get("/people/getByCategoryRef", peopleController.getByCategoryRef);
router.get("/people/getById", peopleController.getById);
router.post("/people/bookAppointment", peopleController.bookAppointment);

module.exports = router;
