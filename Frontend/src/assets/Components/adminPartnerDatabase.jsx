import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import EditingForm from "./editingForm.jsx";
import AddNewPartnersDiv from "./addNewPartnersDiv.jsx";
import PartnerDeletionPopUp from "./partnerDeletionPopUp.jsx";

function AdminPartnerDatabase({ search }) {
  const [partnersList, setPartnersList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [editingForm, setEditingForm] = useState(false);
  const [deletionPopUp, setDeletionPopup] = useState(false);
  const [deletionID, setDeletionId] = useState("");
  const [idSearchResults, setIdSearch] = useState({
    data: { companyName: "" },
  });
  const [creationFormStatus, setCreationFormStatus] = useState(false);
  const [duplicationStatus, setDuplicationStatus] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5555/partners/all")
      .then((response) => {
        setPartnersList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching partners:", error);
      });
  }, [editingForm, creationFormStatus, deletionPopUp, duplicationStatus]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/partners/search",
          { params: { search: search } }
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error With Search:", error);
      }
    };

    if (search) {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [search]);

  const handleEdit = (partnerID) => {
    const searchForPartner = async (ID) => {
      try {
        const results = await axios.get(
          "http://localhost:5555/partners/searchByID",
          { params: { id: ID } }
        );
        setIdSearch(results);
      } catch (error) {
        console.error("Error With Search:", error);
      }
    };
    searchForPartner(partnerID);
    setIdSearch["_id"] = partnerID;
    setEditingForm(true);
  };

  const handleDuplicate = async (duplicationID) => {
    try {
      console.log("Duplicating Partner");
      setDuplicationStatus(true);
      const results = await axios.get(
        "http://localhost:5555/partners/searchByID",
        { params: { id: duplicationID } }
      );
      const response = await axios.post(
        `http://localhost:5555/partners/create`,
        results.data
      );
      if (response.status === 200) {
        console.log("Successfully Duplicated Partner");
        setDuplicationStatus(false);
      }
    } catch (error) {
      setDuplicationStatus(false);
      console.log("Error Duplicating Partner");
      console.log("Error: ", error);
    }
  };

  const handleDelete = (deletionID) => {
    setDeletionId(deletionID);
    setDeletionPopup(true);
  };

  return (
    <div className="bg-[#383d41f0] text-white w-11/12 mx-auto flex justify-center p-6 mt-28">
      <EditingForm
        isOpen={editingForm}
        onClose={() => {
          setEditingForm(false);
        }}
        rowdata={idSearchResults.data}
      />
      <PartnerDeletionPopUp
        isOpen={deletionPopUp}
        onClose={() => {
          setDeletionPopup(false);
          setDeletionId("");
        }}
        deletionID={deletionID}
      />
      <table className="border-separate bt:text-sm border-spacing-y-4 border-spacing-x-3 lg:border-spacing-3 md:border-spacing-x-3 sm:border-spacing-x-1 text-center font-mono shadow-md border-spacing-1 md:text-xs sm:text-[6px]">
        <thead>
          <tr className="bt:text-xs">
            <th className="p-2 sm:p-0">Company Name</th>
            <th className="p-2 sm:p-0">Position</th>
            <th className="p-2 sm:p-0">Owner</th>
            <th className="p-2 lg:hidden bt:hidden  sm:p-0">Email</th>
            <th className="p-2 sm:p-0">Phone</th>
            <th className="p-2 sm:p-0">Pathway</th>
            <th className="p-2 sm:p-0">Availability</th>
            <th className="p-2 sm:p-0 whitespace-nowrap">
              First Day Available
            </th>
            <th className="p-2 sm:p-0 whitespace-nowrap">Last Day Available</th>
            <th className="p-2 sm:p-0">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!search ? (
            <>
              {partnersList.map((partner) => (
                <tr className="bg-gray-500" key={partner._id}>
                  <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[10rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                    {partner.companyName}
                  </td>
                  <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[10rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                    {partner.position}
                  </td>
                  <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap">
                    {partner.owner}
                  </td>
                  <td className=" bt:hidden py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[10rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                    {partner.email}
                  </td>
                  <td className="py-0.5 px-1  bt:px-.5  sm:p-0 whitespace-nowrap">
                    {partner.phone}
                  </td>
                  <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[8rem] bt:max-w-[8rem] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                    {partner.pathway}
                  </td>
                  <td className="p-1.5 sm:p-0">{partner.timeOfDay}</td>
                  <td className="p-.5 sm:p-0">{partner.firstDayAvailable}</td>
                  <td className="p-.5 sm:p-0">{partner.lastDayAvailable}</td>
                  <td className="p-1 sm:p-0 flex gap-2 justify-center pt-1.5 align-middle">
                    <div className="flex gap-2.5 content-center pt-2">
                      <button
                        className="text-green-500"
                        onClick={() => handleEdit(partner._id)}
                      >
                        <FaPencilAlt size="1.5em" />
                      </button>
                      <button
                        className="text-blue-500"
                        onClick={() => handleDuplicate(partner._id)}
                      >
                        <FaCopy size="1.5em" />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(partner._id)}
                      >
                        <FaTrash size="1.5em" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={10}>
                  <div className="inline-block p-2">
                    <AddNewPartnersDiv
                      creationFormStatus={setCreationFormStatus}
                    />
                  </div>
                </td>
              </tr>
            </>
          ) : (
            <>
              {searchResults.length === 0 ? (
                <tr>
                  <td colSpan={10}>
                    <AddNewPartnersDiv
                      creationFormStatus={setCreationFormStatus}
                    />
                  </td>
                </tr>
              ) : (
                searchResults.map((result) => (
                  <tr className="bg-gray-500" key={result._id}>
                    <td className="p-2 sm:p-0">{result.companyName}</td>
                    <td className="p-2 sm:p-0">{result.position}</td>
                    <td className="p-2 sm:p-0">{result.owner}</td>
                    <td className="p-2 lg:hidden sm:p-0">{result.email}</td>
                    <td className="p-2 sm:p-0">{result.phone}</td>
                    <td className="p-2 sm:p-0">{result.pathway}</td>
                    <td className="p-2 sm:p-0">{result.timeOfDay}</td>
                    <td className="p-2 sm:p-0">{result.firstDayAvailable}</td>
                    <td className="p-2 sm:p-0">{result.lastDayAvailable}</td>
                    <td className="p-1 sm:p-0 flex gap-2 justify-center pt-1.5">
                      <button
                        className="text-green-500"
                        onClick={() => handleEdit(result._id)}
                      >
                        <FaPencilAlt size="1.5em" />
                      </button>
                      <button className="text-blue-500">
                        <FaCopy size="1.5em" />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(result._id)}
                      >
                        <FaTrash size="1.5em" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
              <tr>
                <td colSpan={10}>
                  <AddNewPartnersDiv
                    creationFormStatus={setCreationFormStatus}
                  />
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPartnerDatabase;
