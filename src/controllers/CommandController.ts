import { Request, Response } from "express";
import { ListingService } from "../services/listing/ListingService";
import { logger } from "../app";
import { validationResult } from "express-validator";
import { AppDataSource } from "../configs/data-source";
import { CommandService } from "../services/commandes/CommandService";
export class CommandController {


  static create = async (req: Request, res: Response) => {

    logger.info("Start Creation Command")
     
    // Start the querry runner insatance
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const commandes = await CommandService.createCommand(queryRunner,req.body);
      await queryRunner.commitTransaction()
      return res.status(200).send({
        success: true,
        message: "Command  created successfully",
        data: { commandes },
      });
    } catch (error: any) {
      console.error("CreateCommandError", error);
      queryRunner.rollbackTransaction();
      return res.status(500).send({
        success: false,
        message: error.message || "Error creating listing",
      });
    }finally{
      await queryRunner.release();
    }
  };

  static getAllByDistributor = async (req: Request, res: Response) => {
    try {
      const commands = await CommandService.getCommandByDistributorId(req.body);
      return res.status(200).send({
        success: true,
        message: "Commands retrieved successfully",
        data: { commands },
      });
    } catch (error: any) {
      console.error("Error getting listings: ", error);
      return res.status(500).send({
        success: false,
        message: error.message || "Error getting listings",
      });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      
      const command = await CommandService.getCommandById(req.body);
      return res.status(200).send({
        success: true,
        message: "Command retrieved successfully",
        data: { command },
      });
    } catch (error: any) {
      console.error("Error getting Command: ", error);
      return res.status(500).send({
        success: false,
        message: error.message || "Error getting Command",
      });
    }
  };



 
}
