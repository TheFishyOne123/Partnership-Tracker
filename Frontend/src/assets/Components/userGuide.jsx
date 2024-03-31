import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import video1 from '../images/Search_Video.mp4'
import video2 from '../images/Create_Request.mp4'
import video3 from '../images/Signout.mp4'
import video4 from '../images/Open_Guide.mp4'
import PropTypes from 'prop-types'

function UserGuide({ isOpen, onClose }) {
  const modalClasses = isOpen
    ? 'fixed inset-0 flex items-center justify-center backdrop-blur-xs z-index 0'
    : 'hidden'
  const contentClasses = isOpen
    ? 'bg-[#383d41f0] text-gray-50 p-6 rounded-lg w-9/12'
    : 'hidden'

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        <div className='flex flex-col content-center'>
          <div className='flex justify-end items-center gap-11'>
            <button className='cursor-pointer' onClick={onClose}>
              <IoCloseSharp size='2em' />
            </button>
          </div>
          <h1 className='flex text-2xl justify-center py-9'>
            Guide To Using Partnership Tracker For Users
          </h1>
          <Carousel
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            showArrows={true}
            infiniteLoop={true}
          >
            <div>
              <p>
                How To Search For A Partner, Time, Owner, Company Position,
                Pathway
              </p>
              <video autoPlay loop muted className=' w-9/12 m-auto'>
                <source src={video1} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <p>How To Create A New Partner Request</p>
              <video autoPlay loop muted className=' w-9/12 m-auto'>
                <source src={video2} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <p>How To Properly Signout Of User Account</p>
              <video autoPlay loop muted className=' w-9/12 m-auto'>
                <source src={video3} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <p>How To Return To This Guide</p>
              <video autoPlay loop muted className=' w-9/12 m-auto'>
                <source src={video4} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

UserGuide.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
}

export default UserGuide
