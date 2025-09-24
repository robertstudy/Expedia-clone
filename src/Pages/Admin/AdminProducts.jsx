import React, { useEffect, useState } from "react";
import "./adminProduct.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  DeleteFlightProducts,
  fetchFlightProducts,
  EditFlightProduct,
} from "../../Redux/AdminFlights/action";

export const AdminProducts = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [editingFlight, setEditingFlight] = useState(null);
  const [editForm, setEditForm] = useState({
    airline: "",
    number: "",
    from: "",
    to: "",
    departure: "",
    arrival: "",
    price: "",
    totalTime: "",
  });
  
  const { isLoading, data } = useSelector((store) => {
    return {
      isLoading: store.FlightReducer.isLoading,
      data: store.FlightReducer.data,
    };
  }, shallowEqual);

  const handleDeleteFlights = (deleteId) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      dispatch(DeleteFlightProducts(deleteId));
      toast.success("Flight Removed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleLoadMore = () => {
    if (data.length >= limit) {
      setLimit((prev) => prev + 5);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (flight) =>
          flight.airline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          flight.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          flight.to?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          flight.number?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleEditClick = (flight) => {
    setEditingFlight(flight.id);
    setEditForm({
      airline: flight.airline,
      number: flight.number,
      from: flight.from,
      to: flight.to,
      departure: flight.departure,
      arrival: flight.arrival,
      price: flight.price,
      totalTime: flight.totalTime,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(EditFlightProduct(editingFlight, editForm));
    setEditingFlight(null);
    toast.success("Flight Updated Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleEditCancel = () => {
    setEditingFlight(null);
    setEditForm({
      airline: "",
      number: "",
      from: "",
      to: "",
      departure: "",
      arrival: "",
      price: "",
      totalTime: "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "price" ? +value : value,
    }));
  };

  const handleRefreshFlights = () => {
    console.log("Manually refreshing flights...");
    setLimit(5); // Reset limit
    dispatch(fetchFlightProducts(5));
    toast.info("Refreshing flights...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    console.log("Fetching flights with limit:", limit);
    dispatch(fetchFlightProducts(limit));
  }, [limit, dispatch]);

  useEffect(() => {
    console.log("Flight data received:", data);
    handleSearch();
  }, [data, searchTerm]);

  // Add debugging for data loading
  useEffect(() => {
    if (data.length === 0 && !isLoading) {
      console.log("No flights loaded. Checking API connection...");
      // Try to fetch without limit to see if API is working
      fetch('http://localhost:8080/flight')
        .then(response => {
          if (!response.ok) {
            throw new Error('API not responding');
          }
          return response.json();
        })
        .then(flights => {
          console.log("Direct API call successful. Flights available:", flights.length);
        })
        .catch(error => {
          console.error("API connection failed:", error);
          toast.error("Unable to connect to the database. Please ensure JSON server is running on port 8080.", {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  }, [data, isLoading]);

  return (
    <>
      <ToastContainer />
      <div className="adminProductMain">
        <div className="adminSideBr">
          <h1><Link to={"/admin"}>Home</Link></h1>
          <h1><Link to={"/admin/adminflight"}>Add Flight</Link></h1>
          <h1><Link to={"/admin/adminstay"}>Add Stays</Link></h1>
          <h1><Link to={"/admin/products"}>All Flights</Link></h1>
          <h1><Link to={"/admin/hotels"}>All Hotels</Link></h1>
          <h1><Link to={"/"}>Log out</Link></h1>
        </div>
        <div className="adminProductbox">
          <div className="filterProdcut">
            <input 
              placeholder="Search Flight" 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleRefreshFlights} style={{ marginLeft: '10px' }}>
              Refresh <i className="fa fa-refresh"></i>
            </button>
            {limit > data.length ? (
              ""
            ) : (
              <button onClick={handleLoadMore}>Load More</button>
            )}
          </div>
          <div className="head"><h1>All Flights ({filteredData.length} results)</h1></div>
          
          {/* Edit Modal */}
          {editingFlight && (
            <div className="edit-modal-overlay">
              <div className="edit-modal">
                <h2>Edit Flight</h2>
                <form onSubmit={handleEditSubmit}>
                  <div className="edit-form-grid">
                    <div>
                      <label>Airline:</label>
                      <input
                        type="text"
                        name="airline"
                        value={editForm.airline}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div>
                      <label>Flight Number:</label>
                      <input
                        type="text"
                        name="number"
                        value={editForm.number}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div>
                      <label>From:</label>
                      <input
                        type="text"
                        name="from"
                        value={editForm.from}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div>
                      <label>To:</label>
                      <input
                        type="text"
                        name="to"
                        value={editForm.to}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div>
                      <label>Departure:</label>
                      <input
                        type="text"
                        name="departure"
                        value={editForm.departure}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div>
                      <label>Arrival:</label>
                      <input
                        type="text"
                        name="arrival"
                        value={editForm.arrival}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div>
                      <label>Price:</label>
                      <input
                        type="number"
                        name="price"
                        value={editForm.price}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div>
                      <label>Total Time:</label>
                      <input
                        type="text"
                        name="totalTime"
                        value={editForm.totalTime}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="edit-form-buttons">
                    <button type="submit">Update Flight</button>
                    <button type="button" onClick={handleEditCancel}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/*  */}
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h2>Loading flights...</h2>
              <p>Please wait while we fetch the flight data</p>
            </div>
          ) : ""}
          
          {filteredData.length === 0 && !isLoading ? (
            <div className="no-results">
              <h2>No flights found</h2>
              {data.length === 0 ? (
                <div>
                  <p><strong>Database connection issue detected!</strong></p>
                  <p>To load flights from db.json, please ensure:</p>
                  <ol style={{ textAlign: 'left', maxWidth: '400px', margin: '20px auto' }}>
                    <li>JSON Server is installed: <code>npm install -g json-server</code></li>
                    <li>Start the server: <code>json-server --watch db.json --port 8080</code></li>
                    <li>Server should be running on <code>http://localhost:8080</code></li>
                  </ol>
                  <button 
                    onClick={handleRefreshFlights} 
                    style={{ 
                      marginTop: '20px', 
                      padding: '10px 20px', 
                      backgroundColor: '#007bff', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Try Again <i className="fa fa-refresh"></i>
                  </button>
                </div>
              ) : (
                <p>Try adjusting your search terms or click refresh</p>
              )}
            </div>
          ) : (
            filteredData.map((ele, i) => (
              <div key={i} className="adminProductlist">
                <span>{ele.airline}</span>
                <span>{ele.from}</span>
                <span>{ele.to}</span>
                <span>₹{ele.price}</span>
                <span>{ele.number}</span>
                <span>
                  <button onClick={() => handleDeleteFlights(ele.id)} className="delete-btn">
                    Delete <i className="fa fa-trash"></i>
                  </button>
                  <button onClick={() => handleEditClick(ele)} className="edit-btn">
                    Edit <i className="fa fa-pencil"></i>
                  </button>
                </span>
              </div>
            ))
          )}
          {/*  */}
        </div>
      </div>
    </>
  );
};
