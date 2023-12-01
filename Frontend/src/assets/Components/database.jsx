import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Database() {
  const [partnersList, setPartnersList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5555/partners/all')
      .then((response) => {
        setPartnersList(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching partners:', error);
      });
  }, []);

  return (
    <table className='bg-gray-500 border-separate border-spacing-y-1 border-spacing-x-6 mx-auto mt-20 md:border-spacing-x-3'>
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Position</th>
          <th>Owner</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Pathway</th>
          <th>Time Of Day</th>
          <th>First Day Available</th>
          <th>Last Day Available</th>
        </tr>
      </thead>
      <tbody>
        {partnersList.map((info) => (
          <tr key={info._id}>
            <td>{info.companyName}</td>
            <td>{info.position}</td>
            <td>{info.owner}</td>
            <td>{info.email}</td>
            <td>{info.phone}</td>
            <td>{info.pathway}</td>
            <td>{info.timeOfDay}</td>
            <td>{info.firstDayAvailable}</td>
            <td>{info.lastDayAvailable}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Database;
