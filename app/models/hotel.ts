import mongoose, { Document, Model, Schema } from 'mongoose';
import { Hotel as HotelType } from '../components/Hotel/table_columns';



type HotelDocument = HotelType & Document;

const HotelSchema: Schema<HotelDocument> = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  source: { type: String, required: true },
  country_id: { type: Number, required: true },
  country: { type: String, required: true },
  city_id: { type: Number, required: true },
  city: { type: String, required: true },
  zip: { type: Number, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  star: { type: Number, required: true },
  image: { type: String, required: true }
});

const Hotel: Model<HotelDocument> = mongoose.models.Hotel || mongoose.model<HotelDocument>('Hotel', HotelSchema);

export default Hotel;
