import { UUID } from "crypto";
import { ArticleDto } from "./ArticleDto";

export interface CreateCommandDTO {
  // Obligatoire
  distributorid: number;       // référence vers Distributor
  code: string;                // code unique ou identifiant de commande
  status: string;              // status de la commande
  pharmacyId: UUID;          // référence vers Pharmacy (UUID)

  articles:{
    article_id:UUID,
    quantity:number,
    batchNumber:any
  }[]

  // Optionnel
  commandreference?: string;
  invoicereference?: string;
  totalprice?: number;         // par défaut 0 si non fourni
}
