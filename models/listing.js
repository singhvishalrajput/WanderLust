const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: { type: String},
        url: { 
            type: String,  
            default: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
          }
    },  
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Listing = mongoose.model("listing", listingSchema);

module.exports = Listing;