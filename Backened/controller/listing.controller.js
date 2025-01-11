import listing from "../models/listing.model.js";

export const createlisting = async (req,res,next) => {
    try {
        const Listing = await listing.create(req.body);
        return res.status(201).json(Listing);
    } catch (error) {
        next(error)
    }
}