import Image from "next/image";
import { Hotel, Columns } from "./components/Hotel/table_columns";
import { Hotel_Table } from "./components/Hotel/hotel_table";
import {getHotels, addHotels, fetchAndCacheHotels} from './lib/api_caller'

async function getData(): Promise<Hotel[]> {
  try {
    let hotels = await getHotels();
    if (hotels.length > 0 && hotels) {
      return hotels;
    }
  } catch (error) {
    console.log(error)
  }
  let hotels = await fetchAndCacheHotels();

 
  if (!hotels) {
    // This will activate the closest `error.js` Error Boundary
    console.log(hotels);
  }
 
  return hotels
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="">
      <div className="container mx-auto py-10">
      <Hotel_Table columns={Columns} data={data} />
    </div>
    </main>
  );
}
