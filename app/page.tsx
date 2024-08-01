import { Hotel, Columns } from "./components/Hotel/table_columns";
import { HotelTableWrapper } from "./hotels_list";

async function getHotels(): Promise<Hotel[]> {
  try {
    const response = await fetch("/api/fetch_and_cache_hotels", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch hotels");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return [];
  }
}

export default async function Home() {
  const data = await getHotels();

  return (
    <main className="">
      <div className="container mx-auto py-10">
        <HotelTableWrapper initialData={data} />
      </div>
    </main>
  );
}
