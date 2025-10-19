import { Request, Response, NextFunction } from "express";
import { body, ValidationError, validationResult } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


export const createCommandValidator = [
  // ✅ distributor_id : obligatoire, numérique
  body("distributorid")
    .exists().withMessage("Le champ distributor_id est obligatoire")
    .isInt().withMessage("distributor_id doit être un entier"),

  // ✅ code : obligatoire, string non vide
  body("code")
    .exists().withMessage("Le champ code est obligatoire")
    .isString().withMessage("code doit être une chaîne de caractères")
    .notEmpty().withMessage("code ne doit pas être vide"),

  // ✅ status : obligatoire, string non vide
  body("status")
    .exists().withMessage("Le champ status est obligatoire")
    .isString().withMessage("status doit être une chaîne de caractères")
    .notEmpty().withMessage("status ne doit pas être vide"),

  // ✅ pharmacyId : obligatoire, format UUID
  body("pharmacyId")
    .exists().withMessage("Le champ pharmacyId est obligatoire")
    .isUUID().withMessage("pharmacyId doit être un UUID valide"),

  // ✅ articles : obligatoire, tableau non vide
  body("articles")
    .exists().withMessage("Le champ articles est obligatoire")
    .isArray({ min: 1 }).withMessage("articles doit être un tableau contenant au moins un élément"),

  // ✅ articles[].article_id : obligatoire, UUID
  body("articles.*.article_id")
    .exists().withMessage("Chaque article doit avoir un article_id")
    .isUUID().withMessage("article_id doit être un UUID valide"),

  // ✅ articles[].quantity : obligatoire, nombre > 0
  body("articles.*.quantity")
    .exists().withMessage("Chaque article doit avoir une quantité")
    .isInt({ min: 1 }).withMessage("quantity doit être un entier positif"),

  // ✅ articles[].batchNumber : optionnel, string si présent
  body("articles.*.batchNumber")
    .optional({ nullable: true })
    .isString().withMessage("batchNumber doit être une chaîne si fourni"),

  // ✅ commandreference : optionnel, string
  body("commandreference")
    .optional({ nullable: true })
    .isString().withMessage("commandreference doit être une chaîne"),

  // ✅ invoicereference : optionnel, string
  body("invoicereference")
    .optional({ nullable: true })
    .isString().withMessage("invoicereference doit être une chaîne"),

  // ✅ totalprice : optionnel, numérique >= 0
  body("totalprice")
    .optional({ nullable: true })
    .isFloat({ min: 0 }).withMessage("totalprice doit être un nombre positif ou nul"),

  validate
];


