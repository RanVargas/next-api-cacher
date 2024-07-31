import { ColumnDef } from "@tanstack/react-table"

export type Hotel = {
    id: number,
    name: string,
    price: number,
    source: string,
    country_id: number,
    country: string,
    city_id: number,
    city: string,
    zip: number,
    address: string,
    latitude: number,
    longitude: number,
    star: number,
    image: string
}



export const Columns: ColumnDef<Hotel>[] = [
    {
        accessorKey: "name",
        header: "Hotel Name"
    },
    {
        accessorKey: "price",
        header: "Price"
    },
    {
        accessorKey: "source",
        header: "Source"
    },
    {
        accessorKey: "country",
        header: "Country"
    },
    {
        accessorKey: "city",
        header: "City"
    },
    {
        accessorKey: "zip",
        header: "Zip Code"
    },
    {
        accessorKey: "address",
        header: "Address"
    },
    {
        accessorKey: "latitude",
        header: "Latitude"
    },
    {
        accessorKey: "longitude",
        header: "Longitude"
    },


]