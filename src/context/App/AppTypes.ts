export interface RecallProductInterface {
  Name: string
  Description: string
  Model: string
  Type: string
  CategoryID: string
  NumberOfUnits: string
}

export interface RecallImageInterface {
  URL: string
  Caption: string
}

export interface RecallHazardInterface {
  Name: string
  HazardType: string
  HazardTypeID: string
}

export interface RecallNamedEntityInterface {
  Name: string
  CompanyID: string
}

export interface RecallInterface {
  RecallID: number
  RecallNumber: string
  RecallDate: string
  Description: string
  URL: string
  Title: string
  ConsumerContact: string
  LastPublishDate: string
  Products: RecallProductInterface[]
  Images: RecallImageInterface[]
  Injuries: { Name: string }[]
  Manufacturers: RecallNamedEntityInterface[]
  Retailers: RecallNamedEntityInterface[]
  Importers: RecallNamedEntityInterface[]
  Distributors: RecallNamedEntityInterface[]
  Hazards: RecallHazardInterface[]
  Remedies: { Name: string }[]
}

export interface RecallSearchParamsInterface {
  RecallNumber?: string
  RecallDateStart?: string
  RecallDateEnd?: string
  LastPublishDateStart?: string
  LastPublishDateEnd?: string
  RecallTitle?: string
  ProductName?: string
  ProductModel?: string
  ProductType?: string
  Manufacturer?: string
  ManufacturerCountry?: string
  Retailer?: string
  Hazard?: string
  UPC?: string
}
