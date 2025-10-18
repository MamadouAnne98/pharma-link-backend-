import { Router } from "express";

import {
  createListingValidator,
  updateListingValidator,
} from "../middlewares/listing.middleware";
import { CommandController } from "../controllers/CommandController";

const commandRoute = Router();
commandRoute.post("/create", createListingValidator, CommandController.create);

// commandRoute.get("/", CommandController.getAll);
// commandRoute.get("/:id", CommandController.getById);
// commandRoute.get("/delete/:id", CommandController.delete);

export default commandRoute;
