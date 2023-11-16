import React from 'react';
import openMicImage from '../images/open_mic_image.png';
import mic_icon from '../images/mic_icon.png';
import searchImage from '../images/search_icon.png';
import '../components/AboutUs.css';

function AboutUs(){
    return(
        <div>

<div className="sm:flex justify-around py-6 ">
            <div className="w-1/2 m-auto">
            <h1 className="text-5xl font-semibold text-blue-600">What do we do?</h1>
            <div className="text-xl text-gray-600 m-auto ">
                This E-Commerce website contains the information of all the comedy open mics happening in Delhi throughout the week. You can find valuable details of every open mic like the timings,spot-duration,spot-price,their social media account links, the distance of the open mic from your location and book a spot for yourself. 
            </div>

            </div>
            <div className="m-auto ">
                <img src={openMicImage} className="h-44 w-44 m-auto" />
            </div>

        </div>

        <div className="sm:flex justify-around py-6 ">
            <div className="m-auto ">
            <img src={searchImage} className="h-44 w-44 m-auto" />
            </div>
            <div className="w-1/2 m-auto">
            <h1 className="text-5xl font-semibold text-blue-600">How to use?</h1>
            <div className="text-xl text-gray-600 m-auto" >
                Enter the day of the week on which u want to perform and your address in the search bars below.The google maps will show all the mics happening on that day of the week on the map with the icon '<span><img src={mic_icon} className="h-6 w-6 inline" /></span>'.Click these icons to get  all the relevant information about that particular open mic.You can also zoom into the map to find out the nearest metro stations and other important landmarks.Write 'all' in the days search bar if you want to see all the shows happening in the week. Click on buy now option to purchase and book a slot for yourself.
            </div>

            </div>

        </div>

        </div>
        
    );
}

export default AboutUs;