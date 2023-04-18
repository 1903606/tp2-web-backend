const { reponse } = require("express");
const { v4: uuidv4 } = require("uuid");
const HttpErreur = require("../models/http-erreur");
const Cours = require("../models/cours-model");


let COURS = [
  {
    id: uuidv4(),
    nom: "",
    description: "",
    professeur: "",
    etudiants: [],
  },
];

const creerCours = async (requete, reponse, next) => {
  const {id, nom, description, professeur, etudiants } = requete.body;
    const nouveauCours = new Cours({
      id,
      nom,
      description,
      professeur,
      etudiants,
    });
  try {
    await nouveauCours.save();
  } catch (err) {
    const erreur = new HttpErreur("Erreur: Ajout de cours échoué", 500);
    return next(erreur);
  }
  reponse.status(201).json({ cours: nouveauCours });
};

const getCoursById = (requete, reponse, next) => {
  const coursId = requete.params.coursId;
  const cours = COURS.find((cours) => {
    return cours.id === coursId;
  });

  if (!cours) {
    return next(new HttpErreur("Erreur: l'id fourni ne correspond pas à aucun cours", 404));
  }

  reponse.json({ cours });
};
const updateCours = (requete, reponse, next) => {
  const {nom, description} = requete.body;
  const coursId = requete.params.coursId;
    const coursModifie = { ...COURS.find(cours.id === coursId) };
    const indiceCours = COURS.findIndex((cours) => cours.id === coursId);

    coursModifie.nom = nom;
    coursModifie.description = description;

    COURS[indiceCours] = coursModifie;

    reponse.status(200).json({cours:coursModifie});
};
const supprimerCours = (requete, reponse, next) => {
  const coursId = requete.params.coursId;
  COURS = COURS.filter((cours) => cours.id !== coursId);
  reponse.status(200).json({ message: "Le cours à été supprimer" });
};



exports.creerCours = creerCours;
exports.getCoursById = getCoursById;
exports.updateCours = updateCours;
exports.supprimerCours = supprimerCours;