import { React, useEffect, useState } from "react";
import axios from "axios";
import { GrCheckmark } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { MdEdit } from "react-icons/md";

const RequestsDatabase = () => {
  const [requestsList, setRequestsList] = useState([]);
  const [requestData, setRequestData] = useState();
  const [requestStatus, setRequestStatus] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5555/requests/all")
      .then((response) => {
        setRequestsList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, [requestStatus]);

  const handleCreatePartner = async (requestID) => {
    const findRequest = async (requestID) => {
      try {
        const request = await axios.get(
          "http://localhost:5555/requests/searchByID",
          { params: { id: requestID } }
        );
        console.log(request);
        setRequestData(request);
        console.log(requestData);
        return request.data;
      } catch (error) {
        console.error("Error Finding Request: ", error);
      }
    };
    const createPartner = async (newPartner) => {
      try {
        const response = await axios.post(
          "http://localhost:5555/partners/create",
          newPartner
        );
        if (response.status === 200) {
          console.log("Successfully Created New Partner");
        }
      } catch (error) {
        console.error("Error Creating Partner: ", error);
      }
    };
    const removeRequest = async (requestID) => {
      try {
        const url = `http://localhost:5555/requests/delete/${requestID}`;

        const response = await axios.delete(url);

        if (response.status === 200) {
          console.log("Request Deleted Successfully");
        }
      } catch (error) {
        console.log("Error Deleting");
        console.log("Error: ", error);
      }
    };

    try {
      setRequestStatus(false);
      const response = await findRequest(requestID);
      console.log(response);
      if (response) {
        console.log(response);
        await createPartner(response);
        removeRequest(requestID);
        setRequestStatus(true);
        alert("Request Successfully Created");
      } else {
        console.error("Invalid response from findRequest");
      }
    } catch (error) {
      console.error("Error handling request and creating partner: ", error);
    }
  };

  const handleDeleteRequest = (requestID) => {
    setRequestStatus(false);
    const removeRequest = async (requestID) => {
      try {
        const url = `http://localhost:5555/requests/delete/${requestID}`;

        const response = await axios.delete(url);

        if (response.status === 200) {
          console.log("Request Deleted Successfully");
        }
      } catch (error) {
        console.log("Error Deleting");
        console.log("Error: ", error);
      }
    };
    removeRequest(requestID);
    alert("Request Deleted Successfully");
    setRequestStatus(true);
  };

  return (
    <div className="bg-[#383d41f0] text-white w-11/12 mx-auto flex justify-center p-6 mt-28">
      <table className="border-separate border-spacing-y-4 border-spacing-x-3 lg:border-spacing-3 md:border-spacing-x-3 sm:border-spacing-x-1 text-center font-mono shadow-md border-spacing-1 md:text-xs bt:text-[12px]">
        <thead>
          <tr>
            <th className="p-2 sm:p-0">Company Name</th>
            <th className="p-2 sm:p-0">Position</th>
            <th className="p-2 sm:p-0">Owner</th>
            <th className="p-2 bt:hidden sm:p-0">Email</th>
            <th className="p-2 sm:p-0">Phone</th>
            <th className="p-2 sm:p-0">Pathway</th>
            <th className="p-2 sm:p-0">Availability</th>
            <th className="p-2 sm:p-0 whitespace-nowrap">
              First Day Available
            </th>
            <th className="p-2 sm:p-0 whitespace-nowrap">Last Day Available</th>
            <th className=" p-2 sm:p-0">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requestsList.length === 0 ? (
            <tr>
              <td colSpan="10">
                <h1>Empty</h1>
              </td>
            </tr>
          ) : (
            requestsList.map((request) => (
              <>
                <tr className="bg-gray-500" key={request._id}>
                  <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[10rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                    {request.companyName}
                  </td>
                  <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[14rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                    {request.position}
                  </td>
                  <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap">
                    {request.owner}
                  </td>
                  <td className=" bt:hidden py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[12rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                    {request.email}
                  </td>
                  <td className="py-0.5 px-1  bt:px-.5  sm:p-0 whitespace-nowrap">
                    {request.phone}
                  </td>
                  <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[10rem] bt:max-w-[8rem] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                    {request.pathway}
                  </td>
                  <td className="p-1.5 sm:p-0">{request.timeOfDay}</td>
                  <td className="p-.5 sm:p-0">{request.firstDayAvailable}</td>
                  <td className="p-.5 sm:p-0">{request.lastDayAvailable}</td>
                  <td className="p-1 sm:p-0 flex gap-2 justify-center pt-1.5 align-middle">
                    <div className="flex gap-2 content-center pt-2">
                      <button
                        className="text-green-500"
                        onClick={() => handleCreatePartner(request._id)}
                      >
                        <GrCheckmark size="2em" />
                      </button>
                      <button>
                        <MdEdit size="2em" />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDeleteRequest(request._id)}
                      >
                        <IoMdClose size="2.2em" />
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsDatabase;
