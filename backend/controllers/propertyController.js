import Property from "../models/propertyModel.js";

const getProperties = async (req, res) => {
  try {
    const groupedProperties = await Property.aggregate([
      {
        $group: {
          _id: "$subtitle",
          properties: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          subtitle: "$_id",
          properties: 1,
        },
      },
    ]);

    //console.log(groupedProperties);

    res.json(groupedProperties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Property.distinct("location");

    //console.log(locations);

    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const searchProperties = async (req, res) => {
  try {
    const { where, checkIn, checkOut, guests } = req.query;

    if (!where || !checkIn || !checkOut || !guests) {
      return res.json([]);
    }

    const query = {
      $and: [
        {
          $or: [
            { location: { $regex: where, $options: "i" } },
            { subtitle: { $regex: where, $options: "i" } },
          ],
        },
        { guests: { $gte: Number(guests) } },
        {
          reservations: {
            $not: {
              $elemMatch: {
                $or: [
                  {
                    checkIn: { $lt: new Date(checkOut) },
                    checkOut: { $gt: new Date(checkIn) },
                  },
                ],
              },
            },
          },
        },
      ],
    };

    const properties = await Property.find(query);
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getProperties, getLocations, searchProperties, getProperty };
