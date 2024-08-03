import mongoose, { Document, Model, Schema } from 'mongoose';
import { Hotel as HotelType } from '../components/Hotel/table_columns';



type HotelDocument = HotelType & Document;

const HotelSchema: Schema<HotelDocument> = new Schema({
  id: { type: Number, required: false, unique: true },
  name: { type: String, required: false },
  price: { type: Number, required: false },
  source: { type: String, required: false },
  country_id: { type: Number, required: false },
  country: { type: String, required: false },
  city_id: { type: Number, required: false },
  city: { type: String, required: false },
  zip: { type: String, required: false },
  address: { type: String, required: false },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
  star: { type: Number, required: false },
  image: { type: String, required: false }
});

const Hotel: Model<HotelDocument> = mongoose.models.Hotel || mongoose.model<HotelDocument>('Hotel', HotelSchema);

export default Hotel;
