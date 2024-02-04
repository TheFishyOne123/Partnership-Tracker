import React, { useEffect, useState } from "react";
import axios from "axios";
import EditingForm from "./editingForm.jsx";
import AddNewPartnersDiv from "./addNewPartnersDiv.jsx";
import PartnerDeletionPopUp from "./partnerDeletionPopUp.jsx";
import UserGuideAdmin from "./userGuideAdmin.jsx";
import Dropdown from "react-bootstrap/Dropdown";

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
  const [guideStatus, setGuideStatus] = useState(false);

  const updateUser = async (userData) => {
    try {
      const response = await axios.get(
        `http://localhost:5555/users/user?user=${userData[0][1]}`
      );

      response.data.data.newUser = false;

      await axios.put(
        `http://localhost:5555/users/edit/${response.data.data.email}`,
        response.data.data
      );

      console.log("Successfully Updated User");
    } catch (error) {
      console.error("Error Updating User Data", error);
    }
  };

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
    <div className="bg-[#383d41f0] text-white w-11/12 mx-auto flex-grow flex-col p-6 mt-28">
      <UserGuideAdmin
        isOpen={guideStatus}
        onClose={() => {
          setGuideStatus(false);
          updateUser(forwardedState);
        }}
      />

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
            <Dropdown.Item>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <table className="mx-auto border-separate border-spacing-y-4 border-spacing-x-3 lg:border-spacing-3 md:border-spacing-x-3 sm:border-spacing-x-1 text-center font-mono shadow-md border-spacing-1 md:text-xs bt:text-[12px]">
        <thead>
          <tr className="text-lg tst:text-sm" key="Head">
            <th className="px-1 py-2 sm:p-0">Select</th>
            <th className="px-1 py-2 sm:p-0">Company Name</th>
            <th className="px-1 py-2 sm:p-0">Position</th>
            <th className="px-1 py-2 sm:p-0">Owner</th>
            <th className="px-1 py-2 bt:hidden sm:p-0">Email</th>
            <th className="px-1 py-2 sm:p-0">Phone</th>
            <th className="px-1 py-2 sm:p-0">Pathway</th>
            <th className="px-1 py-2 sm:p-0">Availability</th>
            <th className="px-1 py-2 sm:p-0 whitespace-nowrap">
              First Day Available
            </th>
            <th className="px-1 py-2 sm:p-0 whitespace-nowrap">
              Last Day Available
            </th>
          </tr>
        </thead>
        <tbody>
          {!search ? (
            <>
              {partnersList.map((partner) => (
                <tr className="tst:text-xs" key={partner._id}>
                  <td className="py-0.5 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-4 align-middle"
                    />
                  </td>
                  <td className="bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[8rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden">
                    {partner.companyName}
                  </td>
                  <td className="bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[8rem] tst:max-w-[6rem] lg:max-w-[20rem] overflow-hidden ">
                    {partner.position}
                  </td>
                  <td className="bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap">
                    {partner.owner}
                  </td>
                  <td className="bg-gray-500 bt:hidden py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[8rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden ">
                    {partner.email}
                  </td>
                  <td className="bg-gray-500 py-0.5 px-1  bt:px-.5  sm:p-0 whitespace-nowrap">
                    {partner.phone}
                  </td>
                  <td className="bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[11rem] tst:max-w-[5rem] lg:max-w-[20rem] overflow-hidden ">
                    {partner.pathway}
                  </td>
                  <td className="bg-gray-500 p-1.5 sm:p-0">
                    {partner.timeOfDay}
                  </td>
                  <td className="bg-gray-500 p-.5 sm:p-0">
                    {partner.firstDayAvailable}
                  </td>
                  <td className="bg-gray-500 p-.5 sm:p-0">
                    {partner.lastDayAvailable}
                  </td>
                </tr>
              ))}
            </>
          ) : (
            searchResults.map((result) => (
              <tr className="bg-gray-500" key={result._id}>
                <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[14rem] laptop:max-w-[10rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                  {result.companyName}
                </td>
                <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[14rem] laptop:max-w-[10rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                  {result.position}
                </td>
                <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap">
                  {result.owner}
                </td>
                <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[10rem] laptop:max-w-[10rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar lg:hidden bt:hidden">
                  {result.email}
                </td>
                <td className="py-0.5 px-1  bt:px-.5  sm:p-0 whitespace-nowrap">
                  {result.phone}
                </td>
                <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[10rem] laptop:max-w-[10rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                  {result.pathway}
                </td>
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
              <AddNewPartnersDiv creationFormStatus={setCreationFormStatus} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminPartnerDatabase;
