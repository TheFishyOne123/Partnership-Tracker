import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RequestNewPartnersDiv from './requestNewPartnersDiv'
import Dropdown from 'react-bootstrap/Dropdown'
import exportFromJSON from 'export-from-json'
import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Database({ search }) {
  const [partnersList, setPartnersList] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [creationFormStatus, setCreationFormStatus] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:5555/partners/all')
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
          'http://localhost:5555/partners/search',
          { params: { search: search } }
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
    if (search) {
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
        const exportType = exportFromJSON.types.csv
        exportFromJSON({
          data: csvData,
          fileName: 'SearchReport',
          exportType: exportType
        })
      }
    } else if (!search) {
      const csvData = partnersList.map(({ _id, __v, ...csvData }) => csvData)
      const exportType = exportFromJSON.types.csv
      exportFromJSON({
        data: csvData,
        fileName: 'AllPartnersReport',
        exportType: exportType
      })
    } else {
      console.log('Unexpected Result While Exporting As Csv')
      toast.error(
        'Unexpected Result While Exporting As CSV. Check Console For More Info.',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        }
      )
    }
  }

  const exportAsXls = () => {
    if (search) {
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
        const exportType = exportFromJSON.types.xls
        exportFromJSON({
          data: xlsData,
          fileName: 'SearchReport',
          exportType: exportType
        })
      }
    } else if (!search) {
      const xlsData = partnersList.map(({ _id, __v, ...xlsData }) => xlsData)
      const exportType = exportFromJSON.types.xls
      exportFromJSON({
        data: xlsData,
        fileName: 'AllPartnersReport',
        exportType: exportType
      })
    } else {
      console.log('Unexpected Result While Exporting As Xls')
      toast.error(
        'Unexpected Result While Exporting As XLS. Check Console For More Info.',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        }
      )
    }
  }

  const exportAsPDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs

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
    }
  }

  return (
    <div className='bg-[#383d41f0] text-white w-11/12 mx-auto flex-grow flex-col p-6 mt-28'>
      <div className='flex justify-end'>
        <Dropdown drop='down-centered' className='d-inline'>
          <Dropdown.Toggle
            variant='secondary'
            className='text-lg'
            id='dropdown-autoclose-outside'
          >
            Export
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={exportAsCsv}>Export As CSV</Dropdown.Item>
            <Dropdown.Item onClick={exportAsPDF}>Export As PDF</Dropdown.Item>
            <Dropdown.Item onClick={exportAsXls}>Export As XLS</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='overflow-hidden w-full'>
        <table className=' m-auto max-w-full table-auto border-separate border-spacing-y-4 border-spacing-x-3 lg:border-spacing-3 md:border-spacing-x-3 sm:border-spacing-x-1 text-center font-mono shadow-md border-spacing-1 md:text-sm bt:text-[15px]'>
          <thead>
            <tr className='text-lg tst:text-sm' key='Head'>
              <th className='px-1 py-2 sm:p-0'>Company Name</th>
              <th className='px-1 py-2 sm:p-0'>Position</th>
              <th className='px-1 py-2 sm:p-0'>Owner</th>
              <th className='px-1 py-2 bt:hidden sm:p-0'>Email</th>
              <th className='px-1 py-2 sm:p-0'>Phone</th>
              <th className='px-1 py-2 sm:p-0'>Pathway</th>
              <th className='px-1 py-2 sm:p-0'>Availability</th>
              <th className='px-1 py-2 sm:p-0 whitespace-nowrap'>Start Date</th>
              <th className='px-1 py-2 sm:p-0 whitespace-nowrap'>End Date</th>
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
                      <tr className='bg-gray-500 bt:text-sm' key={partner._id}>
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
                        <td className='py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap'>
                          {partner.owner}
                        </td>
                        <td
                          title={partner.email}
                          className=' bt:hidden py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[14rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden '
                        >
                          {partner.email}
                        </td>
                        <td className='py-0.5 px-1  bt:px-.5  sm:p-0 whitespace-nowrap'>
                          {partner.phone}
                        </td>
                        <td
                          title={partner.pathway}
                          className='py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[10rem] bt:max-w-[6rem] sm:max-w-[10rem] lg:max-w-[20rem] overflow-hidden '
                        >
                          {partner.pathway}
                        </td>
                        <td className='p-1.5 sm:p-0'>{partner.timeOfDay}</td>
                        <td className='p-.5 sm:p-0'>
                          {partner.firstDayAvailable}
                        </td>
                        <td className='p-.5 sm:p-0'>
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
                      <tr className='bg-gray-500' key={result._id}>
                        <td className='py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[11rem] laptop:max-w-[10rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden '>
                          {result.companyName}
                        </td>
                        <td className='py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[5rem] laptop:max-w-[10rm] sm:max-w-[10rem] lg:max-w-[20rem] overflow-hidden '>
                          {result.position}
                        </td>
                        <td className='py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap'>
                          {result.owner}
                        </td>
                        <td className='bt:hidden py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[14rem] laptop:max-w-[10rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden '>
                          {result.email}
                        </td>
                        <td className='py-0.5 px-1  bt:px-.5  sm:p-0 whitespace-nowrap'>
                          {result.phone}
                        </td>
                        <td className='py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[15rem] bt:max-w-[10rem] sm:max-w-[10rem] lg:max-w-[20rem] overflow-hidden '>
                          {result.pathway}
                        </td>
                        <td className='p-2 sm:p-0'>{result.timeOfDay}</td>
                        <td className='p-2 sm:p-0'>
                          {result.firstDayAvailable}
                        </td>
                        <td className='p-2 sm:p-0'>
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

export default Database
