import { ColumnDef } from "@tanstack/react-table";

export type Hotel = {
  id: number;
  name: string;
  price: number;
  source: string;
  country_id: number;
  country: string;
  city_id: number;
  city: string;
  zip: string;
  address: string;
  latitude: number;
  longitude: number;
  star: number;
  image: string;
};

export const Columns: ColumnDef<Hotel>[] = [
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "name",
    header: "Hotel Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "star",
    header: "Rating",
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "zip",
    header: "Zip Code",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "latitude",
    header: "Latitude",
  },
  {
    accessorKey: "longitude",
    header: "Longitude",
  },
];
