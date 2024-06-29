import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RequestNewPartnersDiv from './requestNewPartnersDiv'
import Dropdown from 'react-bootstrap/Dropdown'
import exportFromJSON from 'export-from-json'
import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types'

function Database({ search }) {
  const [partnersList, setPartnersList] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [creationFormStatus, setCreationFormStatus] = useState(false)
  const [sortOrder, setSortOrder] = useState(1)

  useEffect(() => {
    axios
      .get('http://localhost:27017/partners/all')
      .then((response) => {
        setPartnersList(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching partners:', error)
        toast.error('Error Fetching Partners. Check Console For More Info.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      })
  }, [creationFormStatus])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:27017/partners/search',
          { params: { search } }
        )
        setSearchResults(response.data)
      } catch (error) {
        console.error('Error With Search:', error)
        toast.error('Error With Search. Check Console For More Info.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      }
    }

    if (search) {
      fetchData()
    } else {
      setSearchResults([])
    }
  }, [search])

  const exportAsCsv = () => {
    if (!search) {
      const csvData = partnersList.map(({ _id, __v, ...csvData }) => csvData)
      exportFromJSON({
        data: csvData,
        fileName: 'AllPartnersReport',
        exportType: 'csv'
      })
    } else {
      if (searchResults.length <= 0) {
        toast.warn('No Search Results To Convert To CSV', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      } else {
        const csvData = searchResults.map(({ _id, __v, ...csvData }) => csvData)
        exportFromJSON({
          data: csvData,
          fileName: 'SearchReport',
          exportType: 'csv'
        })
      }
    }
  }

  const exportAsXls = () => {
    if (!search) {
      const xlsData = partnersList.map(({ _id, __v, ...xlsData }) => xlsData)
      exportFromJSON({
        data: xlsData,
        fileName: 'AllPartnersReport',
        exportType: 'xls'
      })
    } else {
      if (searchResults.length <= 0) {
        toast.warn('No Search Results To Convert To XLS', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      } else {
        const xlsData = searchResults.map(({ _id, __v, ...xlsData }) => xlsData)
        exportFromJSON({
          data: xlsData,
          fileName: 'SearchReport',
          exportType: 'xls'
        })
      }
    }
  }

  const exportAsPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    if (!search) {
      const documentDefinition = {
        headerRows: 1,
        layout: 'lightHorizontalLines',
        pageOrientation: 'landscape',
        pageMargins: [10, 10, 10, 10],
        content: [
          { text: 'Partnership Tracker Partners', style: 'header' },
          {
            table: {
              widths: [
                'auto',
                'auto',
                'auto',
                'auto',
                160,
                'auto',
                'auto',
                'auto',
                'auto'
              ],
              heights: 60,
              body: [
                [
                  { text: 'Company Name', style: 'tableHeader' },
                  { text: 'Position', style: 'tableHeader' },
                  { text: 'Owner', style: 'tableHeader' },
                  { text: 'Email', style: 'tableHeader' },
                  { text: 'Phone', style: 'tableHeader' },
                  { text: 'Pathway', style: 'tableHeader' },
                  { text: 'Availability', style: 'tableHeader' },
                  { text: 'Start Date', style: 'tableHeader' },
                  { text: 'End Date', style: 'tableHeader' }
                ],
                ...partnersList.map((partner) => [
                  { text: partner.companyName, style: 'tableCell' },
                  { text: partner.position, style: 'tableCell' },
                  { text: partner.owner, style: 'tableCell' },
                  { text: partner.email, style: 'tableCell' },
                  { text: partner.phone, style: 'tableCell' },
                  { text: partner.pathway, style: 'tableCell' },
                  { text: partner.timeOfDay, style: 'tableCell' },
                  { text: partner.firstDayAvailable, style: 'tableCell' },
                  { text: partner.lastDayAvailable, style: 'tableCell' }
                ])
              ]
            }
          }
        ],
        pageSize: 'A1',
        styles: {
          header: {
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 20],
            fontSize: 36
          },
          tableHeader: {
            bold: true,
            alignment: 'center',
            fontSize: 26
          },
          tableCell: {
            fontSize: 23,
            alignment: 'center',
            margin: 5
          }
        }
      }

      pdfMake.createPdf(documentDefinition).download('All_Partners_List.pdf')
    }
    if (search) {
      if (searchResults.length <= 0) {
        toast.warn('No Search Results To Convert To PDF', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      } else {
        const documentDefinition = {
          headerRows: 1,
          layout: 'lightHorizontalLines',
          pageOrientation: 'landscape',
          pageMargins: [10, 10, 10, 10],
          content: [
            { text: 'Partnership Tracker Partners', style: 'header' },
            {
              table: {
                widths: [
                  'auto',
                  'auto',
                  'auto',
                  'auto',
                  160,
                  'auto',
                  'auto',
                  'auto',
                  'auto'
                ],
                heights: 60,
                body: [
                  [
                    { text: 'Company Name', style: 'tableHeader' },
                    { text: 'Position', style: 'tableHeader' },
                    { text: 'Owner', style: 'tableHeader' },
                    { text: 'Email', style: 'tableHeader' },
                    { text: 'Phone', style: 'tableHeader' },
                    { text: 'Pathway', style: 'tableHeader' },
                    { text: 'Availability', style: 'tableHeader' },
                    { text: 'Start Date', style: 'tableHeader' },
                    { text: 'End Date', style: 'tableHeader' }
                  ],
                  ...searchResults.map((result) => [
                    { text: result.companyName, style: 'tableCell' },
                    { text: result.position, style: 'tableCell' },
                    { text: result.owner, style: 'tableCell' },
                    { text: result.email, style: 'tableCell' },
                    { text: result.phone, style: 'tableCell' },
                    { text: result.pathway, style: 'tableCell' },
                    { text: result.timeOfDay, style: 'tableCell' },
                    { text: result.firstDayAvailable, style: 'tableCell' },
                    { text: result.lastDayAvailable, style: 'tableCell' }
                  ])
                ]
              }
            }
          ],
          pageSize: 'A1',
          styles: {
            header: {
              bold: true,
              alignment: 'center',
              margin: [0, 0, 0, 20],
              fontSize: 36
            },
            tableHeader: {
              bold: true,
              alignment: 'center',
              fontSize: 26
            },
            tableCell: {
              fontSize: 23,
              alignment: 'center',
              margin: 5
            }
          }
        }

        pdfMake.createPdf(documentDefinition).download('Search_Results.pdf')
      }
    }
  }

  const sortBy = async (header, type) => {
    try {
      const response = await axios.get('http://localhost:27017/partners/sort', {
        params: {
          header,
          type
        }
      })

      setPartnersList(response.data.data)
    } catch (error) {
      console.error('Error With Sort:', error)
      toast.error('Error With Sort. Check Console For More Info.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    }
  }

  const handleSort = async (header) => {
    const newSortOrder = sortOrder === 1 ? -1 : 1
    await sortBy(header, newSortOrder)
    setSortOrder(newSortOrder)
  }

  return (
    <div className='bg-[#336b87f9] rounded-xl text-white w-11/12 mx-auto flex-grow flex-col p-6 mt-28'>
      <div className='flex justify-end'>
        <Dropdown
          drop='down-centered'
          className='d-inlin'
          title='Click To Export As A Document Or Sheet'
        >
          <Dropdown.Toggle
            variant='secondary'
            className='text-lg '
            id='dropdown-autoclose-outside'
          >
            Export
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={exportAsCsv}
              title='Comma Seperated Values File'
            >
              Export As CSV
            </Dropdown.Item>
            <Dropdown.Item onClick={exportAsPDF} title='Adobe PDF'>
              Export As PDF
            </Dropdown.Item>
            <Dropdown.Item onClick={exportAsXls} title='Excel Spreadsheet File'>
              Export As XLS
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='w-full overflow-scroll'>
        <table className=' m-auto max-w-full table-auto border-separate border-spacing-y-4 border-spacing-x-3 lg:border-spacing-3 md:border-spacing-x-3 sm:border-spacing-x-1 text-center font-mono shadow-md border-spacing-1 md:text-sm bt:text-[15px]'>
          <thead>
            <tr className='text-lg tst:text-sm' key='Head'>
              <th className='px-1 py-2 sm:p-0' title='Name Of Company'>
                <button onClick={() => handleSort(1)}>Company Name</button>
              </th>
              <th className='px-1 py-2 sm:p-0' title='Postion Available'>
                <button onClick={() => handleSort(2)}>Position</button>
              </th>
              <th className='px-1 py-2 sm:p-0' title="Company's Owners Name">
                <button onClick={() => handleSort(3)}>Owner</button>
              </th>
              <th
                className='px-1 py-2 bt:hidden sm:p-0'
                title='Email Of Internship Manager Or Owner '
              >
                <button onClick={() => handleSort(4)}>Email</button>
              </th>
              <th
                className='px-1 py-2 sm:p-0'
                title='Phone Number Of Partnership Manager Or Owner'
              >
                <button onClick={() => handleSort(5)}>Phone</button>
              </th>
              <th
                className='px-1 py-2 sm:p-0'
                title='Pathway This Partner Fits Into'
              >
                <button onClick={() => handleSort(6)}>Pathway</button>
              </th>
              <th
                className='px-1 py-2 sm:p-0'
                title='Time Of Day Interns Are Able To Work'
              >
                <button onClick={() => handleSort(7)}>Availability</button>
              </th>
              <th
                className='px-1 py-2 sm:p-0 whitespace-nowrap'
                title='First Day Interns Are Able To Work For Partner'
              >
                <button onClick={() => handleSort(8)}>Start Date</button>
              </th>
              <th
                className='px-1 py-2 sm:p-0 whitespace-nowrap'
                title='Last Day Interns Are Able To Work For Partner'
              >
                <button onClick={() => handleSort(9)}>End Date</button>
              </th>
            </tr>
          </thead>
          <tbody className='w-11/12 m-auto'>
            {partnersList.length === 0 ? (
              <tr key='Empty'>
                <td colSpan='10'>
                  <h1>Empty</h1>
                </td>
              </tr>
            ) : (
              <>
                {!search ? (
                  <>
                    {partnersList.map((partner) => (
                      <tr className='bg-[#1f3f49] bt:text-sm' key={partner._id}>
                        <td
                          title={partner.companyName}
                          className='py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[8rem] lg:max-w-[20rem] overflow-hidden'
                        >
                          {partner.companyName}
                        </td>
                        <td
                          title={partner.position}
                          className='py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[8rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden '
                        >
                          {partner.position}
                        </td>
                        <td
                          className='py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap'
                          title={partner.owner}
                        >
                          {partner.owner}
                        </td>
                        <td
                          title={partner.email}
                          className=' bt:hidden py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[14rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden '
                        >
                          {partner.email}
                        </td>
                        <td
                          className='py-0.5 px-1  bt:px-.5  sm:p-0 whitespace-nowrap'
                          title={partner.phone}
                        >
                          {partner.phone}
                        </td>
                        <td
                          title={partner.pathway}
                          className='py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[10rem] bt:max-w-[6rem] sm:max-w-[10rem] lg:max-w-[20rem] overflow-hidden '
                        >
                          {partner.pathway}
                        </td>
                        <td className='p-1.5 sm:p-0' title={partner.timeOfDay}>
                          {partner.timeOfDay}
                        </td>
                        <td
                          className='p-.5 sm:p-0'
                          title={partner.firstDayAvailable}
                        >
                          {partner.firstDayAvailable}
                        </td>
                        <td
                          className='p-.5 sm:p-0'
                          title={partner.lastDayAvailable}
                        >
                          {partner.lastDayAvailable}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={10}>
                        <div className='inline-block p-2'>
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
                      <tr className='bg-[#1f3f49]' key={result._id}>
                        <td
                          className='py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[11rem] laptop:max-w-[10rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden '
                          title={result.companyName}
                        >
                          {result.companyName}
                        </td>
                        <td
                          className='py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[5rem] laptop:max-w-[10rm] sm:max-w-[10rem] lg:max-w-[20rem] overflow-hidden '
                          title={result.position}
                        >
                          {result.position}
                        </td>
                        <td className='py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap'>
                          {result.owner}
                        </td>
                        <td
                          className='bt:hidden py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[14rem] laptop:max-w-[10rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden  '
                          title={result.email}
                        >
                          {result.email}
                        </td>
                        <td
                          className='py-0.5 px-1  bt:px-.5  sm:p-0 whitespace-nowrap'
                          title={result.phone}
                        >
                          {result.phone}
                        </td>
                        <td
                          className='py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[15rem] bt:max-w-[10rem] sm:max-w-[10rem] lg:max-w-[20rem] overflow-hidden '
                          title={result.pathway}
                        >
                          {result.pathway}
                        </td>
                        <td className='p-2 sm:p-0' title={result.timeOfDay}>
                          {result.timeOfDay}
                        </td>
                        <td
                          className='p-2 sm:p-0'
                          title={result.firstDayAvailable}
                        >
                          {result.firstDayAvailable}
                        </td>
                        <td
                          className='p-2 sm:p-0'
                          title={result.lastDayAvailable}
                        >
                          {result.lastDayAvailable}
                        </td>
                      </tr>
                    ))}
                    <tr key='Form'>
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
  )
}

Database.propTypes = {
  search: PropTypes.string
}

export default Database
