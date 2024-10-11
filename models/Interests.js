import { Folder } from "@mui/icons-material";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  dob: {type: Date, required: true},
  memberNumber: {type: Number, required: true},
  interests: {type: String, require: true}
});

const Product = mongoose.models.product || mongoose.model("product", productSchema);

export default Interests;


