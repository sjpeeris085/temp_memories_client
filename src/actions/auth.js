import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    console.log(data.result);
    const user = {
      _id: data.result._id,
      _type: "user",
      name: data.result.name,
      imageUrl: "",
      token: data.token,
    };
    // TODO: store entier Token without decript
    // and then decript it when use
    dispatch({ type: AUTH, data: user });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
