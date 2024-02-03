import { React, useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import CreateNewUserDiv from "./createNewUserDiv";

function usersDatabase() {
  const [usersList, setUsersList] = useState([]);
  const [creationFormStatus, setCreationFormStatus] = useState(false);
  const [deletionStatus, setDeletionStatus] = useState(false);
  const [selected, setSelected] = useState([]);

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

  const handleDelete = async () => {
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
    if (selected > 0) {
      console.log("Users To Delete " + selected.length);
      for (let userID of selected) {
        console.log(userID);
        await deleteUser(userID);
      }
      setSelected([]);
      setDeletionStatus(true);
      alert("Users Deleted Successfully");
    } else if (selected <= 0) {
      console.log("No Users Selected");
      alert("No Users Selected! Select Users To Delete!");
    } else {
      console.log("Error Deleting Users");
      alert("Error Deleting Users");
    }
  };

  const handleSelected = (rowID) => {
    if (!selected.includes(rowID)) {
      setSelected((prevList) => [...prevList, rowID]);
    } else if (selected.includes(rowID)) {
      setSelected((prevList) => prevList.filter((item) => item !== rowID));
    } else {
      console.log("Error Removing / Adding Selection!");
      alert("Error Adding / Removing Selection! See Console For More Info");
    }
  };

  return (
    <div className="bg-[#383d41f0] text-white w-11/12 mx-auto flex-grow flex-col p-6 mt-28">
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
            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <table className=" mx-auto border-separate border-spacing-y-4 border-spacing-x-3 lg:border-spacing-3 md:border-spacing-x-3 sm:border-spacing-x-1 text-center font-mono shadow-md border-spacing-1 md:text-xs bt:text-[12px]">
        <thead className=" text-lg">
          <tr>
            <th className="p-0.5">Select</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Admin</th>
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
                <tr key={user._id}>
                  <td className="py-1 px-0.5 whitespace-nowrap">
                    <input
                      type="checkbox"
                      onChange={() => handleSelected(user._id)}
                      className="form-checkbox h-5 w-5 align-middle"
                    />
                  </td>
                  <td className="py-0.5 px-2 whitespace-nowrap bg-gray-500">
                    {user.name}
                  </td>
                  <td className="py-0.5 px-2 whitespace-nowrap bg-gray-500">
                    {user.email}
                  </td>
                  <td className="py-0.5 px-2 whitespace-nowrap bg-gray-500">
                    {user.admin ? "Yes" : "No"}
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
