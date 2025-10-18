import { QueryRunner } from "typeorm";
import { CreateCommandDTO } from "../../interfaces/CommandDto";
import { Command } from "../../entities/Command.entity";
import { CommandDetails } from "../../entities/CommandDetails.entity";
import { ArticleService } from "../articles/ArticleService";

export class CommandService {

    constructor(){}

    static async createCommand(queryRunner:QueryRunner,data:CreateCommandDTO){

        try {
            const commandRepo =  queryRunner.manager.getRepository(Command);
            const commandDetailsRepo = queryRunner.manager.getRepository(CommandDetails);
            
            
            const newCommand = await commandRepo.save(data);
            
            if(!newCommand) throw new Error("Failed To create Command");

            const commandDetailsSavingResult = await  Promise.all(data.articles.map((article)=>{
                const detail = queryRunner.manager.create(CommandDetails, {
                command_id: newCommand.id,
                article_id: article.article_id,
                quantity: article.quantity,
                batchnumber: article.batchNumber ?? null
            });
            return queryRunner.manager.save(detail);

            }))
            
            return {command :newCommand,commandDetails:commandDetailsSavingResult}
            
        } catch (error) {
            throw error;
        }

    }
}