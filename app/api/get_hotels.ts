import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../lib/mongoose';
import Hotel from '../models/hotel';
import cache from '../lib/cache';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const cachedData = cache.get('hotels');
    if (cachedData) {
      return res.status(200).json({ success: true, data: cachedData });
    }

    try {
      const hotels = await Hotel.find({});
      cache.set('hotels', hotels);
      return res.status(200).json({ success: true, data: hotels });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch hotels' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
