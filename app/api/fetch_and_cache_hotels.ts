import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../lib/mongoose';
import Hotel from '../models/hotel';
import { fetchHotelsFromAPI } from '../lib/fetch_hotels_from_api';
import cache from '../lib/cache';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const hotels = await fetchHotelsFromAPI();
      console.log(hotels)
      
      if (hotels == undefined || hotels.length == 0) {
        throw new Error("No hotels could be fetch");
      }

      // Save hotels to the database
      const result = await Hotel.insertMany(hotels);

      // Update cache
      cache.set('hotels', result);

      return res.status(201).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch and cache hotels' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
