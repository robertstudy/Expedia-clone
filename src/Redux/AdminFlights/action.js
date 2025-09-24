import axios from "axios";
import {
  DELETE_FLIGHTS,
  FETCH_FLIGHTS,
  FLIGHT_FAILURE,
  FLIGHT_REQUEST,
  GET_FLIGHT_SUCCESS,
  POST_FLIGHT_SUCCESS,
  EDIT_FLIGHT_SUCCESS,
  EDIT_FLIGHT,
} from "./actionType";

export const getFlightSuccess = (payload) => {
  return { type: GET_FLIGHT_SUCCESS, payload };
};

export const postFlightSuccess = (payload) => {
  return { type: POST_FLIGHT_SUCCESS };
};

export const flightRequest = () => {
  return { type: FLIGHT_REQUEST };
};

export const flightFailure = () => {
  return { type: FLIGHT_FAILURE };
};

//
export const fetch_flights_product = (payload) => {
  return { type: FETCH_FLIGHTS, payload };
};
//
export const handleDeleteProduct = (payload) => {
  return { type: DELETE_FLIGHTS, payload };
};

export const handleEditFlight = (payload) => {
  return { type: EDIT_FLIGHT, payload };
};

export const editFlightSuccess = () => {
  return { type: EDIT_FLIGHT_SUCCESS };
};

export const addFlight = (payload) => (dispatch) => {
  dispatch(flightRequest());

  axios
    .post("http://localhost:8080/flight", payload) // https://makemytrip-api-data.onrender.com/flight
    .then(() => {
      dispatch(postFlightSuccess());
    })
    .catch((err) => {
      dispatch(flightFailure());
    });
};

//
export const fetchFlightProducts = (limit) => (dispatch) => {
  dispatch(flightRequest());
  axios
    .get(`http://localhost:8080/flight?_limit=${limit}`)   //https://makemytrip-api-data.onrender.com/flight?_limit=${limit}
    .then((res) => {
      dispatch(fetch_flights_product(res.data));
    })
    .catch((err) => {
      dispatch(flightFailure());
    });
};

export const DeleteFlightProducts = (deleteId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:8080/flight/${deleteId}` //https://makemytrip-api-data.onrender.com/flight/${deleteId}
    );
    console.log("Flight deleted successfully", res.data);
    dispatch(handleDeleteProduct(deleteId));
  } catch (e) {
    console.log("Error deleting flight:", e);
  }
};

export const EditFlightProduct = (flightId, updatedData) => async (dispatch) => {
  dispatch(flightRequest());
  try {
    const res = await axios.put(
      `http://localhost:8080/flight/${flightId}`,
      updatedData
    );
    console.log("Flight updated successfully", res.data);
    dispatch(editFlightSuccess());
    dispatch(handleEditFlight({ id: flightId, ...updatedData }));
  } catch (e) {
    console.log("Error updating flight:", e);
    dispatch(flightFailure());
  }
};
