import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import EditingForm from "./editingForm.jsx";
import AddNewPartnersDiv from "./addNewPartnersDiv.jsx";

function AdminPartnerDatabase({ search }) {
  const [partnersList, setPartnersList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [editingForm, setEditingForm] = useState(false);
  const [idSearchResults, setIdSearch] = useState({
    data: { companyName: "" },
  });
  const [creationForm, setCreationForm] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5555/partners/all")
      .then((response) => {
        setPartnersList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching partners:", error);
      });
  }, [editingForm, creationForm, setCreationForm]);

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

  const handleDuplicate = () => {};

  const handleDelete = () => {};

  return (
    <div className="bg-[#383d41f0] text-white w-10/12 mx-auto mt-20 flex justify-center p-3">
      <EditingForm
        isOpen={editingForm}
        onClose={() => {
          setEditingForm(false);
        }}
        rowdata={idSearchResults.data}
      />
      <table className="border-separate border-spacing-y-3 border-spacing-x-6 lg:border-spacing-3 md:border-spacing-x-3 sm:border-spacing-x-1 text-center font-mono shadow-md border-spacing-1 md:text-xs sm:text-[6px] md:">
        <thead>
          <tr className="bg-gray-500">
            <th className="p-2 sm:p-0">Company Name</th>
            <th className="p-2 sm:p-0">Position</th>
            <th className="p-2 sm:p-0">Owner</th>
            <th className="p-2 lg:hidden  sm:p-0">Email</th>
            <th className="p-2 sm:p-0">Phone</th>
            <th className="p-2 sm:p-0">Pathway</th>
            <th className="p-2 sm:p-0">Availability</th>
            <th className="p-2 sm:p-0">First Day Available</th>
            <th className="p-2 sm:p-0">Last Day Available</th>
            <th className="p-2 sm:p-0">Actions</th>
          </tr>
        </thead>
        <tbody>
          {partnersList.length === 0 ? (
            <tr>
              <td colSpan={10}>
                <AddNewPartnersDiv creationFormStatus={setCreationForm} />
              </td>
            </tr>
          ) : (
            <>
              {!search ? (
                <>
                  {partnersList.map((partner) => (
                    <tr className="bg-gray-500" key={partner._id}>
                      <td className="py-0.5 px-1 sm:p-0">
                        {partner.companyName}
                      </td>
                      <td className="py-0.5 px-1  sm:p-0">
                        {partner.position}
                      </td>
                      <td className="py-0.5 px-1  sm:p-0">{partner.owner}</td>
                      <td className="py-0.5 px-1  lg:hidden sm:p-0">
                        {partner.email}
                      </td>
                      <td className="py-0.5 px-1  sm:p-0">{partner.phone}</td>
                      <td className="py-0.5 px-1  sm:p-0">{partner.pathway}</td>
                      <td className="py-0.5 px-1  sm:p-0">
                        {partner.timeOfDay}
                      </td>
                      <td className="py-0.5 px-1  sm:p-0">
                        {partner.firstDayAvailable}
                      </td>
                      <td className="p-2 sm:p-0">{partner.lastDayAvailable}</td>
                      <td className="p-1 sm:p-0 flex gap-2 justify-center pt-1.5 align-middle">
                        <div className="flex gap-2.5 content-center pt-2">
                          <button
                            className="text-green-500"
                            onClick={() => handleEdit(partner._id)}
                          >
                            <FaPencilAlt size="1.5em" />
                          </button>
                          <button className="text-blue-500">
                            <FaCopy size="1.5em" />
                          </button>
                          <button className="text-red-500">
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
                          creationFormStatus={setCreationForm}
                        />
                      </div>
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  {searchResults.map((result) => (
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
                        <button className="text-red-500">
                          <FaTrash size="1.5em" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPartnerDatabase;
