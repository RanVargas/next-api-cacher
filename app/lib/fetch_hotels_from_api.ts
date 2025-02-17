import axios from 'axios';
import { Hotel as HotelType } from '../components/Hotel/table_columns';
import Hotel from '../models/hotel';
import connectToDatabase from './mongoose';


const API_KEY = process.env.API_KEY; 
const API_URL = process.env.API_URL;

export async function fetchHotelsFromAPI(): Promise<HotelType[]> {
  try {
    if (API_URL == undefined || API_KEY == undefined) {
      
    }
    try {
      let response: Response;
      response = await fetch(API_URL!, {
        headers: { 'X-API-KEY': API_KEY! },
        cache: 'force-cache'
      });
      
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
    // Process and transform the API data to match the Hotel type
    const hotels: HotelType[] = data.data.hotels.map((item: any) => (
      
      {
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      source: item.source || 'Unknown',
      country_id: item.country_id,
      country: item.country,
      city_id: item.city_id,
      city: item.city,
      zip: item.zip,
      address: item.address,
      latitude: parseFloat(item.latitude),
      longitude: parseFloat(item.longitude),
      star: parseInt(item.star, 10),
      image: item.image || ''
      
    }));
    //connectToDatabase();
    
    return hotels;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }


    
  } catch (error) {
    console.error('Error fetching hotels from API:', error);
    throw error;
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