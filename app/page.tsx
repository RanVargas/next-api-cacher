import axios from "axios";
import { Hotel, Columns } from "./components/Hotel/table_columns";
import { HotelTableWrapper } from "./hotels_list";
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { fetchHotelsFromAPI } from "./lib/fetch_hotels_from_api";

async function getHotels(): Promise<Hotel[]> {
  try {
    const response = await axios.get("/api/hotels");
    console.log(`What was gotten from the call is this: ${response}`);
    if (!response.data) {
      throw new Error("Failed to fetch hotels");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:");
    return [];
  }
}

type Props = {
  data?: Hotel[];
  error?: string
}

export const getSeverSideProps: GetServerSideProps<Props> = async () => {
  const apiKey = process.env.API_key;
  const apiUrl = process.env.API_URL;
  if (!apiKey || !apiUrl) {
    throw new Error("Keys not found")
  }
  try {
    const response = await fetch(apiUrl!, {
      headers: {
        'X-API-KEY': apiKey!
      }
    });
    console.log(`this is what was gotten from the response${response}`);
    const data = await response.json()
    return {
      props: {
        data: data
      }
    }
  } catch (error) {
    return {
      props: {
        error: 'Error fetching'
      }
    }
  }
}

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
