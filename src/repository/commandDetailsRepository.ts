import { AppDataSource } from "../configs/data-source";
import { Repository } from "typeorm";
import { CommandDetails } from "../entities/CommandDetails.entity";
export function getCommandDetailsRepository(): Repository<CommandDetails> {
  return AppDataSource.getRepository(CommandDetails);
}
