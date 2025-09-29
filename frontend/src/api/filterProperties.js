import axios from "axios";
import { API_URL } from "../constant/constant";

export const fetchProperties = async (filters) => {
  const params = new URLSearchParams();

  if (filters.where) params.append("where", filters.where);
  if (filters.checkIn) params.append("checkIn", filters.checkIn.toISOString());
  if (filters.checkOut)
    params.append("checkOut", filters.checkOut.toISOString());
  if (filters.guests) params.append("guests", filters.guests);

  const { data } = await axios.get(
    `${API_URL}/properties/search?${params.toString()}`
  );
  return data;
};
