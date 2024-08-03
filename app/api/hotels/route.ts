import { NextResponse } from 'next/server';
import axios from 'axios';
//import { dbConnect, saveHotelsToDb, getHotelsWithCache } from '../../lib/mongoose';
import { Hotel } from '../../components/Hotel/table_columns';
import { json } from 'stream/consumers';

export async function GET(request: Request) {
  const API_KEY = process.env.API_KEY; 
  const API_URL = process.env.API_URL;
  /*try {
    const cachedHotels: Hotel[] = await axios.get("/api/hotels");
    if (cachedHotels != undefined) {
      return cachedHotels;
    }
  } catch (error) {
    console.log("No hotels in cache");
  }*/


  if (!API_URL || !API_KEY) {
    throw new Error('API_URL or API_KEY is not defined in environment variables');
  }

  try {
    let response: Response;
    response = await fetch(API_URL, {
      headers: { 'X-API-KEY': API_KEY },
      cache: 'no-store'
    });
    

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const hotels =  transformToHotels(data.data.hotels);
    
    //await saveHotelsToDb(hotels);
    //await axios.post(`api/add_hotels`, hotels);
    //await fetch("/api/save_hotels", )
    console.log(hotels)
    return NextResponse.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }

  /*try {
    const body = await request.json();
    const hotels: Hotel[] = body.hotels;

    if (!Array.isArray(hotels) || hotels.length === 0) {
      return NextResponse.json({ error: 'Invalid input. Expected an array of hotels.' }, { status: 400 });
    }

    await dbConnect();
    await saveHotelsToDb(hotels);

    return NextResponse.json({  }, { status: 201 });
  } catch (error) {
    console.error('Error saving hotels:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }*/
}

function transformToHotels(data: any): Hotel[] {
  
  if (!Array.isArray(data)) {
    console.warn('Data is not an array. Attempting to process as a single object.');
    data = [data];
  }
  
  return data.map((item: any) => (
    {
    id: item.hotel_id,
    name: item.hotel_name,
    price: parseFloat(item.price),
    source: item.source,
    country_id: item.country_id,
    country: item.country,
    city_id: item.city_id,
    city: item.city,
    zip: item.zip,
    address: item.address,
    latitude: parseFloat(item.latitude),
    longitude: parseFloat(item.longitude),
    star: parseInt(item.star, 10),
    image: item.image
  }));
}

/*export async function GET() {
  try {
    const hotels = await getHotelsWithCache();
    return NextResponse.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}*/