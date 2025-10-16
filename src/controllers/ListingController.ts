import { Request, Response } from "express";
import { ListingService } from "../services/listing/ListingService";
export class ListingController {
  static create = async (req: Request, res: Response) => {
    try {
      const listing = await ListingService.createListing(req.body);
      return res.status(200).send({
        success: true,
        message: "Listing created successfully",
        data: { listing },
      });
    } catch (error: any) {
      console.error("Error creating listing: ", error);
      return res.status(500).send({
        success: false,
        message: error.message || "Error creating listing",
      });
    }
  };

  static update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const listing = await ListingService.updateListing(id, req.body);
      return res.status(200).send({
        success: true,
        message: "Listing updated successfully",
        data: { listing },
      });
    } catch (error: any) {
      console.error("Error updating listing: ", error);
      return res.status(500).send({
        success: false,
        message: error.message || "Error updating listing",
      });
    }
  };

  static delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const listing = await ListingService.deleteListing(id);
      return res.status(200).send({
        success: true,
        message: "Listing deleted successfully",
        data: { listing },
      });
    } catch (error: any) {
      console.error("Error deleting listing: ", error);
      return res.status(500).send({
        success: false,
        message: error.message || "Error deleting listing",
      });
    }
  };

  static getAll = async (req: Request, res: Response) => {
    try {
      const listings = await ListingService.getListings();
      return res.status(200).send({
        success: true,
        message: "Listings retrieved successfully",
        data: { listings },
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
      const { id } = req.params;
      const listing = await ListingService.getListingById(id);
      return res.status(200).send({
        success: true,
        message: "Listing retrieved successfully",
        data: { listing },
      });
    } catch (error: any) {
      console.error("Error getting listing: ", error);
      return res.status(500).send({
        success: false,
        message: error.message || "Error getting listing",
      });
    }
  };
}
