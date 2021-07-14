import { sessionService } from "redux-react-session";
import changeUserState from "../reducers/loginReducer";

export const login = (username) => async () => {
  try {
    const response = {
      username: username,
    };

    sessionService.saveSession();
    sessionService.saveUser(response);
    console.log("response", response);
  } catch (err) {
    console.log("Error while logging in!");
  }
};

export const register = (email, password) => async () => {
  try {
    const response = {
      email: email,
      password: password,
    };

    sessionService.saveSession();
    sessionService.saveUser(response);
    console.log("response", response);
  } catch (err) {
    console.log("Error while registering!");
  }
};

// store eligible internships in redux
export const storeInternshipData = (object) => ({
  object,
  type: "USER_INTERNSHIP",
});

// store eligible placements in redux
export const storePlacementData = (object) => ({
  object,
  type: "USER_PLACEMENT",
});

export const logout = () => async () => {
  try {
    //await sessionApi.logout(); LOGOUTAPI
    console.log("OUT");
    sessionService.deleteSession();
    sessionService.deleteUser();
  } catch (err) {
    // error
  }
};
