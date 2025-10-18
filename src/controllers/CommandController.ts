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
      const listing = await CommandService.createCommand(queryRunner,req.body);
      return res.status(200).send({
        success: true,
        message: "Command  created successfully",
        data: { listing },
      });
    } catch (error: any) {
      console.error("CreateCommandError", error);
      return res.status(500).send({
        success: false,
        message: error.message || "Error creating listing",
      });
    }
  };

  // static getAll = async (req: Request, res: Response) => {
  //   try {
  //     const listings = await CommandService.getCommandByDistributor(distributorId);
  //     return res.status(200).send({
  //       success: true,
  //       message: "Listings retrieved successfully",
  //       data: { listings },
  //     });
  //   } catch (error: any) {
  //     console.error("Error getting listings: ", error);
  //     return res.status(500).send({
  //       success: false,
  //       message: error.message || "Error getting listings",
  //     });
  //   }
  // };

  // static getById = async (req: Request, res: Response) => {
  //   try {
  //     const { id } = req.params;
  //     const listing = await CommandService.getListingById(id);
  //     return res.status(200).send({
  //       success: true,
  //       message: "Listing retrieved successfully",
  //       data: { listing },
  //     });
  //   } catch (error: any) {
  //     console.error("Error getting listing: ", error);
  //     return res.status(500).send({
  //       success: false,
  //       message: error.message || "Error getting listing",
  //     });
  //   }
  // };



 
}
