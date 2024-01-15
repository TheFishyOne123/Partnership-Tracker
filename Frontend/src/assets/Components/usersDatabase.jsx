import { React, useEffect, useState } from "react";
import axios from "axios";

function usersDatabase() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5555/users/all")
      .then((response) => {
        console.log("Response data:", response.data.data);
        setUsersList(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, []);

  return (
    <div className="bg-[#383d41f0] text-white w-11/12 mx-auto flex justify-center p-6 mt-28">
      <table className="border-separate border-spacing-y-4 border-spacing-x-3 lg:border-spacing-3 md:border-spacing-x-3 sm:border-spacing-x-1 text-center font-mono shadow-md border-spacing-1 md:text-xs bt:text-[12px]">
        <thead>
          <tr>
            <th className="p-2 sm:p-0">Name</th>
            <th className="p-2 sm:p-0">Email</th>
            <th className="p-2 sm:p-0">Admin</th>
            <th className="p-2 sm:p-0">New User</th>
            <th className="p-2 sm:p-0">Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList && usersList.length === 0 ? (
            <tr>
              <td colSpan="10">
                <h1>Empty</h1>
              </td>
            </tr>
          ) : (
            usersList.map((user) => (
              <tr className="bg-gray-500" key={user._id}>
                <td className="py-0.5 px-2 whitespace-nowrap">{user.name}</td>
                <td className="py-0.5 px-2 whitespace-nowrap">{user.email}</td>
                <td className="py-0.5 px-2 whitespace-nowrap">
                  {user.admin ? "Yes" : "No"}
                </td>
                <td className="py-0.5 px-2 ">{user.newUser ? "Yes" : "No"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default usersDatabase;
