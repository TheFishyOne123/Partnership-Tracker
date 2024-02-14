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
    <div className="bg-[#383d41f0] text-white w-11/12 mx-auto flex justify-center p-6 mt-28 overflow-x-hidden">
      <div className="overflow-hidden w-full">
        <table className=" m-auto max-w-full table-auto border-separate border-spacing-y-4 border-spacing-x-3 lg:border-spacing-3 md:border-spacing-x-3 sm:border-spacing-x-1 text-center font-mono shadow-md border-spacing-1 md:text-xs bt:text-[10px]">
          <thead>
            <tr className="text-lg tst:text-sm" key="Head">
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
          <tbody className="w-11/12 m-auto">
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
                      <tr className="bg-gray-500 bt:text-xs" key={partner._id}>
                        <td
                          title={partner.companyName}
                          className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[8rem] lg:max-w-[20rem] overflow-hidden"
                        >
                          {partner.companyName}
                        </td>
                        <td
                          title={partner.position}
                          className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[8rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden "
                        >
                          {partner.position}
                        </td>
                        <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap">
                          {partner.owner}
                        </td>
                        <td
                          title={partner.email}
                          className=" bt:hidden py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[14rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden "
                        >
                          {partner.email}
                        </td>
                        <td className="py-0.5 px-1  bt:px-.5  sm:p-0 whitespace-nowrap">
                          {partner.phone}
                        </td>
                        <td
                          title={partner.pathway}
                          className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[10rem] bt:max-w-[6rem] sm:max-w-[10rem] lg:max-w-[20rem] overflow-hidden "
                        >
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
                        <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[11rem] laptop:max-w-[10rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden ">
                          {result.companyName}
                        </td>
                        <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[5rem] laptop:max-w-[10rm] sm:max-w-[10rem] lg:max-w-[20rem] overflow-hidden ">
                          {result.position}
                        </td>
                        <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap">
                          {result.owner}
                        </td>
                        <td className="bt:hidden py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[14rem] laptop:max-w-[10rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden ">
                          {result.email}
                        </td>
                        <td className="py-0.5 px-1  bt:px-.5  sm:p-0 whitespace-nowrap">
                          {result.phone}
                        </td>
                        <td className="py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[15rem] bt:max-w-[10rem] sm:max-w-[10rem] lg:max-w-[20rem] overflow-hidden ">
                          {result.pathway}
                        </td>
                        <td className="p-2 sm:p-0">{result.timeOfDay}</td>
                        <td className="p-2 sm:p-0">
                          {result.firstDayAvailable}
                        </td>
                        <td className="p-2 sm:p-0">
                          {result.lastDayAvailable}
                        </td>
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
    </div>
  );
}

export default Database;
