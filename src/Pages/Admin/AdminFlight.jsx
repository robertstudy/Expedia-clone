import "./Admin.Module.css";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addFlight } from "../../Redux/AdminFlights/action";
import { Link } from "react-router-dom";

let initialState = {
  airline: "",
  number: "",
  from: "",
  to: "",
  departure: "",
  arrival: "",
  price: "",
  totalTime: "",
};
export const Admin = () => {
  const [flight, setFlight] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    
    if (!flight.airline.trim()) newErrors.airline = "Airline is required";
    if (!flight.number.trim()) newErrors.number = "Flight number is required";
    if (!flight.from.trim()) newErrors.from = "From location is required";
    if (!flight.to.trim()) newErrors.to = "To location is required";
    if (!flight.departure.trim()) newErrors.departure = "Departure time is required";
    if (!flight.arrival.trim()) newErrors.arrival = "Arrival time is required";
    if (!flight.price || flight.price <= 0) newErrors.price = "Valid price is required";
    if (!flight.totalTime.trim()) newErrors.totalTime = "Total time is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFlight((prev) => {
      return { ...prev, [name]: name === "price" ? +value : value };
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(addFlight(flight));
      setFlight(initialState);
      setErrors({});
      toast.success("Flight added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Failed to add flight. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="adminFlightMai">
        <div className="adminSideBr">
        <h1><Link to={"/admin"}>Home</Link></h1>
          <h1><Link to={"/admin/adminflight"}>Add Flight</Link></h1>
          <h1><Link to={"/admin/adminstay"}>Add Stays</Link></h1>
          <h1><Link to={"/admin/products"}>All Flights</Link></h1>
          <h1><Link to={"/admin/hotels"}>All Hotels</Link></h1>
          <h1><Link to={"/"}>Log out</Link></h1>

        </div>
        <div className="adminFlightBox">
          <div className="adminHead">
            <h2>Admin Panel for Flights</h2>
          </div>

          <div className="adminFlightInputs">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="adminFlightInputBx">
                <label htmlFor="">Airline *</label>
                <input
                  type="text"
                  id="input"
                  name="airline"
                  value={flight.airline}
                  onChange={(e) => handleChange(e)}
                  className={errors.airline ? "error" : ""}
                  placeholder="Enter airline name"
                />
                {errors.airline && <span className="error-message">{errors.airline}</span>}
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Flight Number *</label>
                <input
                  id="input"
                  type="text"
                  name="number"
                  value={flight.number}
                  onChange={(e) => handleChange(e)}
                  className={errors.number ? "error" : ""}
                  placeholder="Enter flight number"
                />
                {errors.number && <span className="error-message">{errors.number}</span>}
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">From *</label>
                <input
                  id="input"
                  type="text"
                  name="from"
                  value={flight.from}
                  onChange={(e) => handleChange(e)}
                  className={errors.from ? "error" : ""}
                  placeholder="Departure city"
                />
                {errors.from && <span className="error-message">{errors.from}</span>}
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">To *</label>
                <input
                  id="input"
                  type="text"
                  name="to"
                  value={flight.to}
                  onChange={(e) => handleChange(e)}
                  className={errors.to ? "error" : ""}
                  placeholder="Arrival city"
                />
                {errors.to && <span className="error-message">{errors.to}</span>}
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Departure *</label>
                <input
                  id="input"
                  type="text"
                  name="departure"
                  value={flight.departure}
                  onChange={(e) => handleChange(e)}
                  className={errors.departure ? "error" : ""}
                  placeholder="e.g., 10:30 AM"
                />
                {errors.departure && <span className="error-message">{errors.departure}</span>}
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Arrival *</label>
                <input
                  id="input"
                  type="text"
                  name="arrival"
                  value={flight.arrival}
                  onChange={(e) => handleChange(e)}
                  className={errors.arrival ? "error" : ""}
                  placeholder="e.g., 2:45 PM"
                />
                {errors.arrival && <span className="error-message">{errors.arrival}</span>}
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Price *</label>
                <input
                  id="input"
                  type="number"
                  name="price"
                  value={flight.price}
                  onChange={(e) => handleChange(e)}
                  className={errors.price ? "error" : ""}
                  placeholder="Enter price in rupees"
                  min="1"
                />
                {errors.price && <span className="error-message">{errors.price}</span>}
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Total Time *</label>
                <input
                  id="input"
                  type="text"
                  name="totalTime"
                  value={flight.totalTime}
                  onChange={(e) => handleChange(e)}
                  className={errors.totalTime ? "error" : ""}
                  placeholder="e.g., 2h 30m"
                />
                {errors.totalTime && <span className="error-message">{errors.totalTime}</span>}
              </div>
              <div className="adminFlightInputBx">
                <span></span>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding Flight..." : "Add Flight Info"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

    // <div className="flightBody">
    //   {/* <div id="link">
    //     <Link to={"/"}>Home</Link>
    //     <Link to={"/adminflight"}>Admin Flight</Link>
    //     <Link to={"/adminhotel"}>Admin Hotel</Link>
    //   </div>
    //   <div>
    //     <Wrapper>
    //       <form
    //         onSubmit={(e) => {
    //           handleSubmit(e);
    //         }}
    //       >
    //         <FormControl>
    //           <Heading id="head">Admin Panel for Flights</Heading>
    //           <Box className="Box">
    //             <FormLabel id="label">Airline</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="airline"
    //               value={flight.airline}
    //               onChange={(e) => handleChange(e)}
    //             />

    //             <FormLabel id="label">Flight Number</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="number"
    //               value={flight.number}
    //               onChange={(e) => handleChange(e)}
    //             />

    //             <FormLabel id="label">From</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="from"
    //               value={flight.from}
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <FormLabel id="label">To</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="to"
    //               value={flight.to}
    //               onChange={(e) => handleChange(e)}
    //             />

    //             <FormLabel id="label">Departure</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="departure"
    //               value={flight.departure}
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <FormLabel id="label">Arrival</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="arrival"
    //               value={flight.arrival}
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <FormLabel id="label">Price</FormLabel>
    //             <Input
    //               id="input"
    //               type="number"
    //               name="price"
    //               value={flight.price}
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <FormLabel id="label">TotalTime</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="totalTime"
    //               value={flight.totalTime}
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <Button id="btn" variant="outline" type="submit">
    //               Add Flight Info
    //             </Button>
    //           </Box>
    //         </FormControl>
    //       </form>
    //     </Wrapper>
    //   </div> */}
    // </div>
  );
};
