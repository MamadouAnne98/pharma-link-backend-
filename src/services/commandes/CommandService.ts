import { QueryRunner } from "typeorm";
import { CreateCommandDTO } from "../../interfaces/CommandDto";
import { Command } from "../../entities/Command.entity";
import { CommandDetails } from "../../entities/CommandDetails.entity";
import { ArticleService } from "../articles/ArticleService";
import { getCommandRepository } from "../../repository/commandRepository";
import { getCommandDetailsRepository } from "../../repository/commandDetailsRepository";

const commandRepository = getCommandRepository();
const commandDetailsRepo = getCommandDetailsRepository();

export class CommandService {

    constructor(){}

    static async createCommand(queryRunner:QueryRunner,data:CreateCommandDTO){

        try {
            const commandRepo =  queryRunner.manager.getRepository(Command);
            const commandDetailsRepo = queryRunner.manager.getRepository(CommandDetails);
            
            
            const newCommand = await commandRepo.save(data);

            console.log("New Commande ",newCommand)
            
            if(!newCommand) throw new Error("Failed To create Command");

            const commandDetailsSavingResult = await  Promise.all(data.articles.map(async(article)=>{
                
                const detail =new CommandDetails();
                detail.command_id = newCommand.id,
                detail.article_id = article.article_id,
                detail.quantity= article.quantity,
                detail.batchnumber= article.batchNumber ?? null
            
                return detail;

            }));
            
            await commandDetailsRepo.save(commandDetailsSavingResult)
            return newCommand;
            
        } catch (error) {
            throw error;
        }

    }

    static async getCommandById(data:{id: number,distibutorId:number}) {
    try {
      const command = await commandRepository.findOne({
        where: { id:data.id,distributorid:data.distibutorId },
        relations: ["details"],
      });

      return command;
      
    } catch (error) {
      return Promise.reject(error);
    }
    }

    static async getCommandByDistributorId(data:
        {
        distibutorId:number
    }){
        try {
        const commands = await commandRepository.find({
            where: { distributorid:data.distibutorId },
            relations: ["details"],
        });

        return commands;
        
        } catch (error) {
        return Promise.reject(error);
        }
    }



}