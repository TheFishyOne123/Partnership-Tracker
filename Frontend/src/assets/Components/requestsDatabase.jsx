import { React, useEffect, useState, Fragment } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import RequestDeletionPopUp from "./requestDeletionPopUp";

const RequestsDatabase = () => {
  const [requestsList, setRequestsList] = useState([]);
  const [requestData, setRequestData] = useState();
  const [requestStatus, setRequestStatus] = useState(false);
  const [selected, setSelected] = useState([]);
  const [deletionPopUp, setDeletionPopup] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5555/requests/all")
      .then((response) => {
        setRequestsList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, [requestStatus, deletionPopUp]);

  // const handleCreatePartner = async (requestID) => {
  //   const findRequest = async (requestID) => {
  //     try {
  //       const request = await axios.get(
  //         "http://localhost:5555/requests/searchByID",
  //         { params: { id: requestID } }
  //       );
  //       console.log(request);
  //       setRequestData(request);
  //       console.log(requestData);
  //       return request.data;
  //     } catch (error) {
  //       console.error("Error Finding Request: ", error);
  //     }
  //   };

  //   const createPartner = async (newPartner) => {
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5555/partners/create",
  //         newPartner
  //       );
  //       if (response.status === 200) {
  //         console.log("Successfully Created New Partner");
  //       }
  //     } catch (error) {
  //       console.error("Error Creating Partner: ", error);
  //     }
  //   };

  //   const removeRequest = async (requestID) => {
  //     try {
  //       const url = `http://localhost:5555/requests/delete/${requestID}`;

  //       const response = await axios.delete(url);

  //       if (response.status === 200) {
  //         console.log("Request Deleted Successfully");
  //       }
  //     } catch (error) {
  //       console.log("Error Deleting");
  //       console.log("Error: ", error);
  //     }
  //   };

  //   try {
  //     setRequestStatus(false);
  //     const response = await findRequest(requestID);
  //     console.log(response);
  //     if (response) {
  //       console.log(response);
  //       await createPartner(response);
  //       removeRequest(requestID);
  //       setRequestStatus(true);
  //       alert("Request Successfully Created");
  //     } else {
  //       console.error("Invalid response from findRequest");
  //     }
  //   } catch (error) {
  //     console.error("Error handling request and creating partner: ", error);
  //   }
  // };

  const handleDelete = () => {
    setDeletionPopup(true);
  };

  const handleSelected = (email) => {
    if (!selected.includes(email)) {
      setSelected((prevList) => [...prevList, email]);
    } else if (selected.includes(email)) {
      setSelected((prevList) => prevList.filter((item) => item !== email));
    } else {
      console.log("Error Removing / Adding Selection.");
      alert("Error Adding / Removing Selection. See Console For More Info");
    }
  };

  return (
    <div className="bg-[#383d41f0] text-white w-11/12 mx-auto flex-grow flex-col p-6 mt-28">
      <RequestDeletionPopUp
        isOpen={deletionPopUp}
        onClose={() => {
          setDeletionPopup(false);
        }}
        deletionIDs={selected}
      />
      <div className="flex justify-end">
        <Dropdown drop="down-centered" className="d-inline">
          <Dropdown.Toggle
            variant="secondary"
            className="text-lg"
            id="dropdown-autoclose-outside"
          >
            Actions
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Edit</Dropdown.Item>
            <Dropdown.Item>Duplicate</Dropdown.Item>
            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <table className="mx-auto border-separate border-spacing-y-4 border-spacing-x-3 lg:border-spacing-3 md:border-spacing-x-3 sm:border-spacing-x-1 text-center font-mono shadow-md border-spacing-1 md:text-xs bt:text-[12px]">
        <thead>
          <tr key="Head">
            <th className="p-2 sm:p-0">Select</th>
            <th className="p-2 sm:p-0">Company Name</th>
            <th className="p-2 sm:p-0">Position</th>
            <th className="p-2 sm:p-0">Owner</th>
            <th className="p-2 bt:hidden sm:p-0">Email</th>
            <th className="p-2 sm:p-0">Phone</th>
            <th className="p-2 sm:p-0">Pathway</th>
            <th className="p-2 sm:p-0">Availability</th>
            <th className="p-2 sm:p-0 whitespace-nowrap">Start Day</th>
            <th className="p-2 sm:p-0 whitespace-nowrap">End Day</th>
          </tr>
        </thead>
        <tbody key="Body">
          {requestsList.length === 0 ? (
            <tr key="Empty">
              <td colSpan="10">
                <h1>Empty</h1>
              </td>
            </tr>
          ) : (
            requestsList.map((request, index) => (
              <Fragment key={`fragment-${request.id || index}`}>
                <tr key={`row-${request.id}`}>
                  <td className="py-0.5 whitespace-nowrap">
                    <input
                      type="checkbox"
                      onChange={() => handleSelected(request._id)}
                      checked={selected.includes(request._id)}
                      className="form-checkbox h-5 w-5 align-middle"
                    />
                  </td>
                  <td className="bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[10rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                    {request.companyName}
                  </td>
                  <td className="bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[14rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                    {request.position}
                  </td>
                  <td className="bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap">
                    {request.owner}
                  </td>
                  <td className="bg-gray-500 bt:hidden py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[12rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                    {request.email}
                  </td>
                  <td className="bg-gray-500 py-0.5 px-1  bt:px-.5  sm:p-0 whitespace-nowrap">
                    {request.phone}
                  </td>
                  <td className="bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[10rem] bt:max-w-[8rem] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                    {request.pathway}
                  </td>
                  <td className="bg-gray-500 p-1.5 sm:p-0">
                    {request.timeOfDay}
                  </td>
                  <td className="bg-gray-500 p-1.5 sm:p-0">
                    {request.firstDayAvailable}
                  </td>
                  <td className="bg-gray-500 p-1.5 sm:p-0">
                    {request.lastDayAvailable}
                  </td>
                </tr>
              </Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsDatabase;
