import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import video1 from "../images/Search_Video.mp4";
import video2 from "../images/Create_Request.mp4";
import video3 from "../images/Navigating_Pages.mp4";
import video4 from "../images/User_Functions.mp4";
import video5 from "../images/Request_Functions.mp4";
import video6 from "../images/Admin_Partner_Functions.mp4";
import video7 from "../images/Signout.mp4";
import video8 from "../images/Open_Guide.mp4";

function UserGuide({ isOpen, onClose }) {
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center backdrop-blur-xs"
    : "hidden";
  const contentClasses = isOpen
    ? "bg-[#383d41f0] text-gray-50 p-6 rounded-lg w-9/12"
    : "hidden";

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        <div className="flex flex-col content-center">
          <div className="flex justify-end items-center gap-11">
            <button className="cursor-pointer" onClick={onClose}>
              <IoCloseSharp size="2em" />
            </button>
          </div>
          <h1 className="flex text-2xl justify-center py-9">
            Guide To Using Partnership Tracker For Admins
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
              <video autoPlay loop muted className=" w-9/12 m-auto">
                <source src={video1} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <p>How To Create A New Partner Request</p>
              <video autoPlay loop muted className=" w-9/12 m-auto">
                <source src={video2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <p>How To Properly Navigate Pages</p>
              <video autoPlay loop muted className=" w-9/12 m-auto">
                <source src={video3} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <p>How To Use The User Functions On User Admin Page</p>
              <video autoPlay loop muted className=" w-9/12 m-auto">
                <source src={video4} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <p>How To Use The Request Functions On Request Admin Page</p>
              <video autoPlay loop muted className=" w-9/12 m-auto">
                <source src={video5} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <p>How To Use Admin Functions For Partners Page</p>
              <video autoPlay loop muted className=" w-9/12 m-auto">
                <source src={video6} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <p>How To Properly Signout Of User Account</p>
              <video autoPlay loop muted className=" w-9/12 m-auto">
                <source src={video7} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <p>How To Return To This Guide</p>
              <video autoPlay loop muted className=" w-9/12 m-auto">
                <source src={video8} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default UserGuide;
