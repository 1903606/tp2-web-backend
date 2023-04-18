const express = require('express');
const router = express.Router();
const controleursCours = require("../controllers/cours-controller");

router.put("/:coursId", controleursCours.creerCours); 
router.get("/:coursId", controleursCours.getCoursById);
router.patch("/:coursId", controleursCours.updateCours);
router.delete("/:coursId", controleursCours.supprimerCours);



module.exports = router;
