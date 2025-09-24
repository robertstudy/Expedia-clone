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

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const FlightReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FLIGHT_REQUEST:
      return { ...state, isLoading: true };

    case FLIGHT_FAILURE:
      return { ...state, isError: true };

    case GET_FLIGHT_SUCCESS:
      return { ...state, isLoading: false, flight: payload };

    case POST_FLIGHT_SUCCESS:
      return { ...state, isLoading: false, flight: payload };

    case FETCH_FLIGHTS:
      return { ...state, isLoading: false, data: (state.data = payload) };

    case DELETE_FLIGHTS: {
      const filterFlight = state.data.filter((ele) => ele.id !== payload);
      return { ...state, data: filterFlight };
    }

    case EDIT_FLIGHT_SUCCESS:
      return { ...state, isLoading: false };

    case EDIT_FLIGHT: {
      const updatedData = state.data.map((flight) =>
        flight.id === payload.id ? { ...flight, ...payload } : flight
      );
      return { ...state, data: updatedData };
    }

    default:
      return state;
  }
};
