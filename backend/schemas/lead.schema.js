import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";


const leadSchema = new mongoose.Schema(
  {
   id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      enum: ["website", "facebook_ads", "google_ads", "referral", "events", "other"],
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost", "won"],
      default: "new",
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    lead_value: {
      type: Number,
      default: 0,
    },
    last_activity_at: {
      type: Date,
      default: null,
    },
    is_qualified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
