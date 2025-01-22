import { Schema, model, models } from "mongoose";

const HI_CategoriesSchema = new Schema(
  {
    code: {
      type: String,
      required:  [true, 'Codes is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
   },
  {
    timestamps: true,
  },

);

const HI_Categories = models.HI_Categories || model("HI_Categories", HI_CategoriesSchema);

export default HI_Categories;
