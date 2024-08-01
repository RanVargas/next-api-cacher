import axios from 'axios';
import { Hotel } from '../components/Hotel/table_columns';

const API_BASE_URL = '/api';

export async function fetchAndCacheHotels(): Promise<Hotel[]> {
  try {
    const response = await axios.post(`${API_BASE_URL}/fetch_and_cache_hotels`);
    return response.data.data;
  } catch (error) {
    console.error(error)
  }
  return [];
}

export async function addHotels(hotels: Hotel[]): Promise<Hotel[]> {
  
  try {
    const response = await axios.post(`${API_BASE_URL}/add_hotels`, hotels);
    return response.data.data;  
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function getHotels(): Promise<Hotel[]> {
  
  try {
    const response = await axios.get(`${API_BASE_URL}/get_hotels`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
  return [];
}
