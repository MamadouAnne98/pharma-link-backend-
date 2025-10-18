import { Router } from "express";
import { ArticleController } from "../controllers/ArticleController";
import {
  createArticleValidator,
  updateArticleValidator,
  imageValidator,
  uploadExcelValidator
} from "../middlewares/article.middleware";

const articeRoute = Router();
articeRoute.post("/", createArticleValidator,imageValidator, ArticleController.create);
articeRoute.post(
  "/update/:id",
  updateArticleValidator,imageValidator,
  ArticleController.update
);
articeRoute.get("/", ArticleController.getAll);
articeRoute.get("/:id", ArticleController.getById);
articeRoute.get("/delete/:id", ArticleController.delete);
articeRoute.post("/upload", uploadExcelValidator, ArticleController.upload);

export default articeRoute;
