import axios from "axios";
import { API_URL } from "../constant/constant";

export const fetchGroupedProperties = async () => {
  const { data } = await axios.get(`${API_URL}/properties`);
  return data;
};
