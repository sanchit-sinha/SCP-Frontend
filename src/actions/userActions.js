import { sessionService } from "redux-react-session";
import { type internshipData, type placementData } from "../types";

export const login =
  (data: {
    eligibleInternship: Array<internshipData>,
    eligiblePlacement: Array<placementData>,
  }) =>
  async () => {
    try {
      const response = {
        eligibleInternship: data.eligibleInternship,
        eligiblePlacement: data.eligiblePlacement,
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
