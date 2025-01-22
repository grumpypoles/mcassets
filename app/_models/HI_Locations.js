import { Schema, model, models } from "mongoose";

const HI_LocationsSchema = new Schema({
    code: {
        type: String,
        required: [true, 'Codes is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    }
}, 
{
    timestamps: true
})

const HI_Locations = models.HI_Locations || model('HI_Locations', HI_LocationsSchema)

export default HI_Locations