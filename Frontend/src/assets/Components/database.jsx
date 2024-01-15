import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestNewPartnersDiv from "./requestNewPartnersDiv";

function Database({ search }) {
  const [partnersList, setPartnersList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [creationFormStatus, setCreationFormStatus] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5555/partners/all")
      .then((response) => {
        setPartnersList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching partners:", error);
      });
  }, []);

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

  return (
    <div className="bg-[#383d41f0] text-white w-11/12 mx-auto flex justify-center p-6 mt-28">
      <table className="border-separate border-spacing-y-4 border-spacing-x-3 lg:border-spacing-3 md:border-spacing-x-3 sm:border-spacing-x-1 text-center font-mono shadow-md border-spacing-1 md:text-xs bt:text-[12px]">
        <thead>
          <tr className="text-lg laptop:text-base" key="Head">
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
          </tr>
        </thead>
        <tbody>
          {partnersList.length === 0 ? (
            <tr key="Empty">
              <td colSpan="10">
                <h1>Empty</h1>
              </td>
            </tr>
          ) : (
            <>
              {!search ? (
                <>
                  {partnersList.map((partner) => (
                    <tr className="bg-gray-500" key={partner._id}>
                      <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[10rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                        {partner.companyName}
                      </td>
                      <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[14rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                        {partner.position}
                      </td>
                      <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap">
                        {partner.owner}
                      </td>
                      <td className=" bt:hidden py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[12rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                        {partner.email}
                      </td>
                      <td className="py-0.5 px-1  bt:px-.5  sm:p-0 whitespace-nowrap">
                        {partner.phone}
                      </td>
                      <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[10rem] bt:max-w-[8rem] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                        {partner.pathway}
                      </td>
                      <td className="p-1.5 sm:p-0">{partner.timeOfDay}</td>
                      <td className="p-.5 sm:p-0">
                        {partner.firstDayAvailable}
                      </td>
                      <td className="p-.5 sm:p-0">
                        {partner.lastDayAvailable}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={10}>
                      <div className="inline-block p-2">
                        <RequestNewPartnersDiv
                          creationFormStatus={setCreationFormStatus}
                        />
                      </div>
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  {searchResults.map((result) => (
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
                      <td className="lg:hidden bt:hidden py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[14rem] laptop:max-w-[10rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                        {result.email}
                      </td>
                      <td className="py-0.5 px-1  bt:px-.5  sm:p-0 whitespace-nowrap">
                        {result.phone}
                      </td>
                      <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[14rem] laptop:max-w-[10rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar">
                        {result.pathway}
                      </td>
                      <td className="p-2 sm:p-0">{result.timeOfDay}</td>
                      <td className="p-2 sm:p-0">{result.firstDayAvailable}</td>
                      <td className="p-2 sm:p-0">{result.lastDayAvailable}</td>
                    </tr>
                  ))}
                  <tr key="Form">
                    <td colSpan={10}>
                      <RequestNewPartnersDiv
                        creationFormStatus={setCreationFormStatus}
                      />
                    </td>
                  </tr>
                </>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Database;
