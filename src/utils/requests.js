import {
  storeInternshipData,
  storePlacementData,
} from "../actions/userActions";

const base_url = "http://localhost:5000/";
const EligibleInternships_url = "interns";
const EligiblePlacements_url = "placements";

// Login
export const LOGIN = async (url, username, password) => {
  const user = {
    username: username,
    password: password,
  };

  const res = await fetch(base_url + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const response = await res.json();
  return response;
};

// fetch internship data 
export const fetchInternships = (url) => (dispatch) => {
  fetch(base_url + EligibleInternships_url) // update url
    .then((response) => response.json())
    .then((data) => {
      dispatch(UserInternshipData(data));
    })
    .catch((error) => console.log(error));
};

// fetch placements data
export const fetchPlacements = (url) => (dispatch) => {
  fetch(base_url + EligiblePlacements_url) // update url
    .then((response) => response.json())
    .then((data) => {
      dispatch(UserPlacementData(data));
    })
    .catch((error) => console.log(error));
};

// add internship data to redux
export const UserInternshipData = (object) => (dispatch) => {
  dispatch(storeInternshipData(object));
};

// add placement data to redux
export const UserPlacementData = (object) => (dispatch) => {
  dispatch(storePlacementData(object));
};
