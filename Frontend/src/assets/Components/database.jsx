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
    <div className='bg-[#383d41f0] w-10/12 mx-auto mt-20 flex justify-center p-3'>
      <table className='border-separate border-spacing-y-3 border-spacing-x-6 lg:border-spacing-3 md:border-spacing-x-3 sm:border-spacing-x-1 text-center font-mono shadow-md  border-spacing-1 md:text-xs sm:text-[6px] md:'>
        <thead>
          <tr className='bg-gray-500'>
            <th className='p-2 sm:p-0'>Company Name</th>
            <th className='p-2 sm:p-0'>Position</th>
            <th className='p-2 sm:p-0'>Owner</th>
            <th className='p-2 lg:hidden  sm:p-0'>Email</th>
            <th className='p-2 sm:p-0'>Phone</th>
            <th className='p-2 sm:p-0'>Pathway</th>
            <th className='p-2 sm:p-0'>Time Of Day</th>
            <th className='p-2 sm:p-0'>First Day Available</th>
            <th className='p-2 sm:p-0'>Last Day Available</th>
          </tr>
        </thead>
        <tbody>
          {partnersList.map((info) => (
            <tr className='bg-gray-500' key={info._id}>
              <td className='p-2 sm:p-0'>{info.companyName}</td>
              <td className='p-2 sm:p-0'>{info.position}</td>
              <td className='p-2 sm:p-0'>{info.owner}</td>
              <td className='p-2 lg:hidden sm:p-0'>{info.email}</td>
              <td className='p-2 sm:p-0'>{info.phone}</td>
              <td className='p-2 sm:p-0'>{info.pathway}</td>
              <td className='p-2 sm:p-0'>{info.timeOfDay}</td>
              <td className='p-2 sm:p-0'>{info.firstDayAvailable}</td>
              <td className='p-2 sm:p-0'>{info.lastDayAvailable}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Database;
