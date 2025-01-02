import { Schema, model, models } from "mongoose";

const HIAssetsSchema = new Schema(
  {
    selcode: {
      type: String,
      required: true,
    },
    card: {
      description: {
        type: String,
        required: true,
      },
      model: {
        type: String
      },
      image: {
        type: String,
      },
    },
    technical: {
      category: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      maker : {
        name: {
        type: String,
        },
        web: {
          type: String,
        },
      },
      model_number: {
        type: String,
        
      },
      serial_number: {
        type: String,
        
      },
      instructions: {
        type: Number,
      
      },
      
    },
    finance: {
      purchase:{
        date: {
          type: Date,
          required: true,
        },
        location: {
          type: String,
          required: false,
        },
        amount: {
          type: Double,
          required: false,
        },
        note: {
          type: String,
          required: false,
        },
        invoice: {
          invoice: String,
          required: false,
        },
      },
      disposal:{
        date: {
          type: Date,
          required: true,
        },
        amount: {
          type: Double,
          required: false,
        },
        note: {
          type: String,
          required: false,
        },
        invoice: {
          invoice: String,
          required: false,
        },
      },
    },
    status: {
      type: String,
      required: true,
    },
    admin:{
      creation:{
        date: {
        type: Date,
        required: true,
      },
      user: {
        type: String,
      },
      },
      update:{
        date: {
        type: Date,
        required: true,
      },
      user: {
        type: String,
      },
      },
      
      },
   },
  {
    timestamps: true,
  },

);

const HIAssets = models.HIAssets || model("HIAssets", HIAssetsSchema);

export default HIAssets;
