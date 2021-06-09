import React, { useEffect, useState } from "react";
import { createApiconfig } from "../helpers/apiConfig";
import "./Shipments.css";

export const Shipments = () => {
  const [shipments, setShipments] = useState<any[]>([]);
  const [longitude, setLongitude] = useState<number>(30);
  const [latitude, setLatitude] = useState<number>(30);
  const [outDate, setOutDate] = useState<any>('');

  useEffect(() => {
    handleSearchByLocation();
  }, []);

  const handleSearchByLocation = (): void => {
    fetch(
       `https://case-api.trella.app/marketplace${updateQuery()}`,
      createApiconfig()
    )
      .then((response) => response.json())
      .then((response) => {
        setShipments(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateQuery = () : string => {
    let query = '';
    if (longitude) {
     query.length > 0 ? query += `&lng=${longitude}` : query += `?lng=${longitude}`;
    }

    if (latitude) {
     query.length > 0 ? query += `&lat=${latitude}` : query += `?lat=${latitude}`;
    }

    if (outDate) {
     query.length > 0 ? query += `&outdate=${outDate}` : query += `?outdate=${outDate}`;
    }

    return query;
  }

  return (
    <div className="Shipments">
      <div className="Search_Containers">
        <div className="Location_Container">
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="long">Longitude</label>
            <input
              type="number"
              className="form-control"
              id="long"
              placeholder="Enter Longitude Value"
              value={longitude}
              onChange={(e: any) => setLongitude(e.target.value)}
              onBlur={(e: any) => setLongitude(e.target.value)}
            />
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="lat">Latitude</label>
            <input
              type="number"
              className="form-control"
              id="lat"
              placeholder="Enter Latitude Value"
              value={latitude}
              onChange={(e: any) => setLatitude(e.target.value)}
              onBlur={(e: any) => setLatitude(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-2 pull-left ml-3"
            onClick={handleSearchByLocation}
          >
            Search by Location
          </button>
        </div>
        <div className="Outdate_Container">
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="outdate">OutDate</label>
            <input
              className="form-control"
              id="outdate"
              placeholder="Enter Outdate Value"
              value={outDate}
              onChange={(e: any) => setOutDate(e.target.value)}
              onBlur={(e: any) => setOutDate(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-2 pull-left ml-3"
            onClick={handleSearchByLocation}
          >
            Filter By Outdate
          </button>
        </div>
      </div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Commodity</th>
            <th scope="col">Truck Type</th>
            <th scope="col">Number Of Bids</th>
            <th scope="col">Price</th>
            <th scope="col">Addresses</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{shipment.commodity}</td>
                <td>{shipment.truck_type}</td>
                <td>{shipment.bids}</td>
                <td>{shipment.price}</td>
                <td>{shipment.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
