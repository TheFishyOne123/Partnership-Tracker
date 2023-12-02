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
    <div className='bg-[#383d41f0] w-9/12 mx-auto mt-20 flex justify-center p-3'>
      <table className=' border-separate border-spacing-y-1 border-spacing-x-6 md:border-spacing-x-3 text-center font-mono table-auto shadow-md  border-spacing-1 rounded'>
        <thead>
          <tr className='bg-gray-500'>
            <th className='p-2'>Company Name</th>
            <th className='p-2'>Position</th>
            <th className='p-2'>Owner</th>
            <th className='p-2'>Email</th>
            <th className='p-2'>Phone</th>
            <th className='p-2'>Pathway</th>
            <th className='p-2'>Time Of Day</th>
            <th className='p-2'>First Day Available</th>
            <th className='p-2'>Last Day Available</th>
          </tr>
        </thead>
        <tbody>
          {partnersList.map((info) => (
            <tr className='bg-gray-500' key={info._id}>
              <td className='p-2'>{info.companyName}</td>
              <td className='p-2'>{info.position}</td>
              <td className='p-2'>{info.owner}</td>
              <td className='p-2'>{info.email}</td>
              <td className='p-2'>{info.phone}</td>
              <td className='p-2'>{info.pathway}</td>
              <td className='p-2'>{info.timeOfDay}</td>
              <td className='p-2'>{info.firstDayAvailable}</td>
              <td className='p-2'>{info.lastDayAvailable}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Database;
