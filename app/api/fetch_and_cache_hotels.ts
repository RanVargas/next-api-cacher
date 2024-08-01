import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from '../lib/mongoose'
import Hotel from '../models/hotel'
import { fetchHotelsFromAPI } from '../lib/fetch_hotels_from_api'
import cache from '../lib/cache'
import { Hotel as HotelType } from '../components/Hotel/table_columns'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HotelType[]>
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  await connectToDatabase()

  try {
    // Check cache first
    const cachedHotels: HotelType[] = cache.get('hotels')!
    if (cachedHotels || cachedHotels == undefined) {
      return res.status(200).json(cachedHotels)
    }

    // If not in cache, fetch from API
    const hotels = await fetchHotelsFromAPI()

    if (!hotels || hotels.length === 0) {
      throw new Error("No hotels could be fetched")
    }

    // Save hotels to the database
    const result = await Hotel.insertMany(hotels)

    // Update cache
    cache.set('hotels', result)

    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json([])
  }
}