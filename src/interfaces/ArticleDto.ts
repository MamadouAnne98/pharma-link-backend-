export interface ArticleDto {
  id: string;
  code: string;
  name: string;
  price: number;
  imageLink?: string;
  description?: string;
  expiryDate?: Date;
  barcode?: string;
  createdAt: Date;
  updatedAt: Date;
}
