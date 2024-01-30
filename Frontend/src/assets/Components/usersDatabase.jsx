import { React, useEffect, useState } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import CreateNewUserDiv from "./createNewUserDiv";

function usersDatabase() {
  const [usersList, setUsersList] = useState([]);
  const [creationFormStatus, setCreationFormStatus] = useState(false);
  const [deletionStatus, setDeletionStatus] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5555/users/all")
      .then((response) => {
        setUsersList(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, [creationFormStatus, deletionStatus]);

  const handleDelete = (deletionID) => {
    setDeletionStatus(false);
    const deleteUser = async (deletionID) => {
      try {
        const url = `http://localhost:5555/users/delete/${deletionID}`;

        const response = await axios.delete(url);

        if (response.status === 200) {
          console.log("User Deleted Successfully");
        }
      } catch (error) {
        console.log("Error Deleting");
        console.log("Error: ", error);
      }
    };
    deleteUser(deletionID);
    setDeletionStatus(true);
    alert("User Deleted Successfully");
  };

  return (
    <div className="bg-[#383d41f0] text-white w-11/12 mx-auto flex justify-center p-6 mt-28">
      <table className="border-separate border-spacing-y-4 border-spacing-x-3 lg:border-spacing-3 md:border-spacing-x-3 sm:border-spacing-x-1 text-center font-mono shadow-md border-spacing-1 md:text-xs bt:text-[12px]">
        <thead>
          <tr>
            <th className="p-2 sm:p-0">Name</th>
            <th className="p-2 sm:p-0">Email</th>
            <th className="p-2 sm:p-0">Admin</th>
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
            <>
              {usersList.map((user) => (
                <tr className="bg-gray-500" key={user._id}>
                  <td className="py-0.5 px-2 whitespace-nowrap">{user.name}</td>
                  <td className="py-0.5 px-2 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="py-0.5 px-2 whitespace-nowrap">
                    {user.admin ? "Yes" : "No"}
                  </td>
                  <td className="py-0.5 px-2">
                    <div className="flex gap-2.5 content-center p-2">
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(user._id)}
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
                    <CreateNewUserDiv
                      creationFormStatus={setCreationFormStatus}
                    />
                  </div>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default usersDatabase;
