import axios from "axios";
import { Hotel, Columns } from "./components/Hotel/table_columns";
import { HotelTableWrapper } from "./hotels_list";
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { fetchHotelsFromAPI } from "./lib/fetch_hotels_from_api";


export default async function Home() {
  const data = await fetchHotelsFromAPI();


  return (
    <main className="">
      <div className="h-1/2">
        {<HotelTableWrapper initialData={data} />}
        
      </div>
    </main>
  );
}
