import axios from "axios";
import { AsyncStorage } from "react-native";

export const api = axios.create({
  baseURL: "https://pfehelloapi.herokuapp.com",
  timeOut: 1000,
  headers: { Accept: "application/json" }
});

export const loadAuthorisationHeader = (token) => ({
  headers: { Authorization: "Bearer " + token }
});
