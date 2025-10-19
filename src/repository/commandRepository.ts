import { AppDataSource } from "../configs/data-source";
import { Article } from "../entities/Article.entity";
import { Repository } from "typeorm";
import { Command } from "../entities/Command.entity";

export function getCommandRepository(): Repository<Command> {
  return AppDataSource.getRepository(Command);
}
