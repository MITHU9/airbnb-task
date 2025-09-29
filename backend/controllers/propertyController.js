import Property from "../models/propertyModel.js";

const getProperties = async (req, res) => {
  try {
    const groupedProperties = await Property.find();

    console.log(groupedProperties);

    res.json(groupedProperties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getProperties };
