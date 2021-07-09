import { type internshipData, type placementData } from "../types";
import axios from "axios";
const base_url = "http://localhost:5000";

const sendRequest = async (url, method, body, headers = {}) => {
  const response = await axios({
    method,
    url: base_url + url,
    data: body,
    headers,
  });
  console.log(response);
  return response.data;
};

// Login
export const LOGIN = async (username, password) => {
  await sendRequest("/users", "POST", {
    username,
    password,
  });
};

// get User data
export const getUserData = async () => {
  const eligibleInternship = await getInternshipData();
  const eligiblePlacement = await getPlacementData();
  return { eligibleInternship, eligiblePlacement };
};

// Get eligible internships for a user
export const getInternshipData = async (): Promise<Array<internshipData>> => {
  const res = await sendRequest("/interns", "GET");
  return res;
};

// Get eligible placements for a user
export const getPlacementData = async (): Promise<Array<placementData>> => {
  const res = await sendRequest("/placements", "GET");
  return res;
};
