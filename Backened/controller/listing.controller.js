import listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createlisting = async (req,res,next) => {
    try {
        const Listing = await listing.create(req.body);
        return res.status(201).json(Listing);
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req,res,next) => {
    const Listing = await listing.findById(req.params.id);

    if(!Listing){
        return next(errorHandler(404,'Listing not found'));
    }
    if(req.user.id !== Listing.userRef){
        return next(errorHandler(401,'you can only delete your own listings!'));
    }
    try {
        await listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing has been deleted");
    } catch (error) {
        next(error);
    }

}

export const updatelisting = async (req,res,next) => {
    const Listing = await listing.findById(req.params.id);
    if (!Listing) {
        return next(errorHandler(404,"listing not found"));
    }
    if (req.user.id !== Listing.userRef) {
        return next(errorHandler(401,'You can only update your own listing'));
    }
    try {
        const updatedListing = await listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error)
    }
}

export const getListing = async (req,res,next) => {
   
   try {
    const Listing = await listing.findById(req.params.id);
    if (!Listing) {
        return next(errorHandler(404,'Listing not found'));
        
    }
    res.status(200).json(Listing);
    
   } catch (error) {
    next(error);
   }
   

}

export const getListings = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let offer = req.query.offer;
  
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
      }
  
      let furnished = req.query.furnished;
  
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      }
  
      let parking = req.query.parking;
  
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };
      }
  
      let type = req.query.type;
  
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent'] };
      }
  
      const searchTerm = req.query.searchTerm || '';
  
      const sort = req.query.sort || 'createdAt';
  
      const order = req.query.order || 'desc';
  
      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: 'i' },
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
}