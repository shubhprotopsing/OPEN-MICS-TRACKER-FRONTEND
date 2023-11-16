import React, { useState } from 'react';
import { CopyToClipboard} from "react-copy-to-clipboard";
import  './card.css';
import whatsapp_icon from '../images/whatsapp_icon.png';
import instagram_icon from '../images/instagram_icon.png';
function Card(props){
const [click,setClick]=useState("Get Location")

function handleClick(){
    setClick("Copied to Clipboard!");
}

    return(
        <div className=" mic_card h-96 w-64 flex flex-col justify-start items-center rounded-2xl">
            <img src={props.image} className="h-64 w-64 rounded-lg" alt="openmic_pic" />
            <div className="mic_name font-bold text-3xl">{props.name}</div>
            <div className="w-5/6 pt-5 text-sm">
                <div className="mic_timing">{props.time}</div>
                <div className="mic_cost">{props.price}</div>
                <div className="mic_type">{props.type}</div>
                <div className="mic_spot_time">{props.duration}</div>
                <div class="distance_travelled">{props.Distance}</div>
                <div class="travel_time">{props.TravelTime}</div>
                <div className="mic_icons flex gap-4 justify-start pt-4">
                  <div className=" hover:scale-125 transform transition-transform delay-100"><a href={props.whatsapp} target="_blank"><img src={whatsapp_icon} className="h-7 w-7" /></a></div>
                  <div className="hover:scale-125 transform transition-transform delay-100 "><a href={props.instagram} target="_blank"><img src={instagram_icon} className="h-7 w-7" /></a></div>
                </div>
                <div className=" flex justify-center">
                <CopyToClipboard text={props.location}><button onClick={handleClick} className="mt-6 h-10 w-28 bg-green-600 hover:bg-green-500  hover:scale-110 hover:-translate-y-1.5 transform transition-transform delay-100 text-white rounded-xl font-bold" >{click}</button></CopyToClipboard>
                </div>


                <div className="flex justify-center"><a href='https://forms.gle/6E8c6aRW7jProy5S6' target="_blank">
    <button  className="mt-3 h-10 w-28 bg-blue-600 hover:bg-blue-500 hover:scale-110 hover:-translate-y-1.5 transform transition-transform delay-100 text-white rounded-xl font-bold">
        Buy Now
    </button></a>
</div>




            </div>
        </div>
    );
 
}

export default Card;