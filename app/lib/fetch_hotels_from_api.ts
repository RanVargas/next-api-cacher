import axios from 'axios';
import { Hotel as HotelType } from '../components/Hotel/table_columns';


const API_KEY = process.env.API_KEY; 
const API_URL = process.env.API_URL;

export async function fetchHotelsFromAPI(): Promise<HotelType[]> {
  try {
    if (!API_KEY || !API_URL || API_KEY == undefined || API_URL == undefined) {
        console.error("No api key or url found");
        throw new Error("No api key or url could be loaded")
        
    }
    const responseV2 = await fetch(API_URL, {
        headers: {
          'x-api-key': API_KEY,
        },
      });
    let unprocessedJson = await responseV2.json;
    const arrays = transformToHotels(unprocessedJson);
    return arrays;
  } catch (error) {
    console.error('Error fetching hotels from API:', error);
    throw new Error('Failed to fetch hotels from API');
  }
}

function transformToHotels(data: any): HotelType[] {
    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      location: item.location,
      address: item.address,
      city: item.city,
      city_id: item.city_id,
      country: item.country,
      country_id: item.country_id,
      image: item.image,
      latitude: item.latitude,
      longitude: item.longitude,
      price: item.price,
      source: item.source,
      star: item.star,
      zip: item.zip
    }));
  }