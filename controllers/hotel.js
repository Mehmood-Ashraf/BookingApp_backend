import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
    console.log("Hotel updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getHotels = async (req, res, next) => {
  try {
    const { min, max, featured, limit, ...others } = req.query;
    const minNum = Number(min)
    const maxNum = Number(max)

    const filter = {
      ...others,
      ...(featured !== undefined && { featured: featured === "true" }),
      ...(minNum !== undefined || maxNum !== undefined
        ? { cheapestPrice: { $gt: minNum || 1, $lt: maxNum || 999 } }
        : {}),
    };
    const hotels = await Hotel.find(filter).limit(parseInt(limit));
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const appartmentCount = await Hotel.countDocuments({ type: "appartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "appartment", count: appartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
    ]);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    const list = await Promise.all(hotel.rooms.map(room => {
      return Room.findById(room)
    }))
    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
}