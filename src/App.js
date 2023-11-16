
import React, {useState} from 'react';
import './App.css';

//for google maps display features
import 
{GoogleMap,
withScriptjs,
withGoogleMap,
Marker,
InfoWindow, 
} from 'react-google-maps'; ///google maps javascript api

//for address input and distance calculation features
import PlaceAutocomplete ,{
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'; ///react places autocomplete

//useFetch is used to make GET requests to our backend url
import useFetch from './useFetch';
//all these are other components of the website that we need to import
import Card from './components/Card';
import micIcon from './images/mic_icon.png';
import searchBar from './images/search_bar.png';
import Header from './components/Header'; 
import AboutUs from './components/AboutUs';
import Preloader from './components/Preloader';


function App() {
  //defining all the states that we are going to use for our website

  //state for the day on which the user wants to perform
  const [comparisonday,setComparisonday]= useState("");
  //state for the mic that the user has clicked on 
  const [selectedMic, setSelectedMic] = useState(null);
  //state for the address user has selected from given suggestions
  const [address,setAddress]=useState("");
  //state for the user coordinates that will be used for distance and eta calculation
  const [userCoordinates,setUserCoordinates]=useState({lat:"null",lng:"null"});
  var result1=0;  //stores calculated travel time from user location to selected open mic
  var result2=0;  //stores calculated travel distance from the user location to selected open mic

  const { data, loading, error } = useFetch('https://micsdata.onrender.com/Mics');
  if(loading) 
  return <Preloader/>; //displays the preloader while the page is laoding 
  if(error) console.log(error);  //displays the error in the console if there is any
  
  //our fundamental and most basic map component that we want to render
  function Map(){ 
    
      return(
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{lat:28.59120859050926, lng:77.19249522689171}} //lat lng of NEW DELHI
         > 

        {/* the following code block is for displaying only those open mics on the maps
            which are open on the day inputed by the user */}
        {data.map( micItem =>(
          //if the current open mic is open on the user input day, only then we will display it
        (micItem.day.indexOf(`${comparisonday}`) !==-1) &&  
          //component to display the mic
        <Marker
          key={micItem.id}
          position={{
            lat:micItem.latitude,
            lng:micItem.longitude
          }}
          onClick={ () => {
            setSelectedMic(micItem); //whenever we click a given icon, that particulat micItem is set as selectedMic
          }}
          icon={{
            url: micIcon,
            scaledSize:new window.google.maps.Size(30,30)
            }}
        />
        ))}


     {/* The following code block is for displaying the information window of the open mic 
          that the user has clicked on */}       
     {selectedMic !=null && (
      //if user clicks a particular mic, selectedMic value becomes non NULL and we display that mic's INFO WINDOW
          <InfoWindow
          position={{
            lat:selectedMic.latitude,
            lng:selectedMic.longitude
          }}
          onCloseClick ={()=> {
            setSelectedMic(null);
          }}
          >
          
          <div className="mic_card_container">
          <Card 
            key={selectedMic.id}
            name={selectedMic.name}
            image={selectedMic.image.formats.small.url}
            time={selectedMic.time}
            price={selectedMic.price}
            type={selectedMic.type}
            duration={selectedMic.duration}
            instagram={selectedMic.instagram}
            whatsapp={selectedMic.whatsapp}
            TravelTime={selectedMic.TravelTime}
            Distance={selectedMic.Distance}
            location={selectedMic.location}
          />
          </div>
    
          </InfoWindow>
        )}


        {/* the following block of code is for calculating the travel distance
            and travel time for each micItem for a given userlocation */}      
        {data.map( micItem =>{   
          //creating a new variable named destination using the 'window.google.maps.LatLng' constructor function
          //this constructor function is used to create a new LatLng object, representing a geographical point on the map
          //destination stores the LatLng object corresponding to the micItem
          var destination=new window.google.maps.LatLng(micItem.latitude,micItem.longitude);
          //creating a new instance of 'window.google.maps.DistanceMatrixService'
          var service = new window.google.maps.DistanceMatrixService();
          //this service will allow us to find distance and travel time between two locations on the map

          service.getDistanceMatrix(  //calling the 'getDistanceMatrix' function with the following parameters
            {
              origins: [userCoordinates],
              destinations: [destination],
              travelMode: 'DRIVING',
              unitSystem: window.google.maps.UnitSystem.METRIC,
              avoidHighways: false,
              avoidTolls: true,
            }, callback);

          //the 'callback' function is defined to handle the response fron the 'getDistanceMatrix' function
          //takes two parameters response and status
          function callback(response,status){
            //if any error occurs while calling the API
            if (status !== "OK") {
                  console.log("Error with distance matrix");
                  return;
                }   
              result1=response.rows[0].elements[0].duration.text;  //travel time value
              result2=response.rows[0].elements[0].distance.text; //travel distance value
              //adding these two key-value pairs in our micItem element
              micItem["TravelTime"]="Travel Time from location: "+result1; 
              micItem["Distance"]="Distance from location: "+result2;

          }
         })
        }
  
     
         </GoogleMap>
      );
    } //our fundamental map component code is finished here

    //handles the clicking of the magnifying icon on the website that is used for searching
    function handleSearch(){
      //gets the current value of an HTML input element with id='day'
      const title= document.getElementById('day').value;
      //updating the state of comparisonDay 
      setComparisonday(title);
    }

    //handles the selection of a location from the autocomplete suggestion list
    const handleSelect=async (value)=>{
      //await keyword is used to pause the execution of the function until the geocoding process is completed
      const results= await geocodeByAddress(value); //converts the text value into geographical location
      const latlng=await getLatLng(results[0]);  //uses the results[0] information to get coordinates
      //updating Address value
      setAddress(value);
      //updating the userCoordinates value
      setUserCoordinates(latlng);
    }
    
    /* withScriptjs and withGoogleMap are higher-order components (HOCs) provided by the react-google-maps.
    these HOCs are used to enhance the custom component(Map) with additional features related to Google Maps */

    /* 'withGoogleMap': connects your custom 'Map' component to Google Maps JavaScript API, this enables it
    to access Google Maps-related functionalities */ 

    /* 'withScriptjs': wraps the output of the 'withGoogleMap' HOC with the necessary script laoding logic to
    load the Google Maps API script  */
    const WrappedMap = withScriptjs(withGoogleMap(Map));

    //WrappedMap finally stores our custom Map component with all additional features required 

  return (
    <div className="h-screen">

      <Header />

      <AboutUs />
      
      
      <div className=" sm:flex flex-row  justify-center gap-4 mt-10  ">

      {/* PlaceAutocomplete component is provided by the 'react-places-autocomplete library'
          It is used to render an autocomplete input,allowing users to search and select an address
          from suggestions. */}

      {/* This component uses the 'RENDER PROPS PATTERN', where is expects a function as it's child
          The function provided as the child is passed as an argument to <PlaceAutocomplete>
          This function takes an object as argument,whose properties are destructured */}

      {/* getInputProps: function provided by <PlaceAutocomple>,contains props to be attached to the input 
          element for handling user user interaction and managing autocomplete behaviour
          
          suggestions:an array of suggested locations returned by the autocomplete feature
          based on user input
          
          getSuggestionItemProps: function provided by <PlaceAutocomplete>,contains props to be attatched to
          each suggestion item for handling interactions with suggestion list

          loading:boolein value provided by <PlaceAutocomplete>,indicates whether the suggestions are currently
          bring loaded or not */}        
      <PlaceAutocomplete value={address} onChange={setAddress} onSelect={handleSelect} >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading })=> 
        <div>
          {/* <input> element is rendered with certain props using the spread operator */}
        <input {...getInputProps({placeholder:"Enter your address"})} 
        className="h-11 w-96 border-solid border-gray-400 border-2 p-2 "/>
          {/* this <div> is used to hold the suggestions list below the input field */}
        <div>
          {loading? <div>....Loading</div>:null}
          {/* Iterating over the suggestions array, styling our suggestiong depending on 
              whether we have our cursor on that suggestion item or not */}
          {suggestions.map((suggestion)=>{
            const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
          {/* styling div according to our computation,suggestion.description represents the
              description of suggested location */}
            return <div {...getSuggestionItemProps(suggestion, {style})}>{suggestion.description}</div>
          })}
        </div>
        </div>
      }
      </PlaceAutocomplete>

      {/* Code for inputing the day on which the user wants to perform */}
      <div>
      <input
          type="text"
          placeholder="Enter the day on which you want to perform"
          id="day"
          autoComplete="off"
          className=" w-96 h-11 border-solid border-gray-400 border-2 p-2 m-auto "
        />
        <button onClick={handleSearch} >   {/* calls the handleSearch function when we click the icon */}
          <img src={searchBar} className="searchButton h-7 w-7 relative " />
        </button>
      </div>
      </div>

      {/* used to render the google map in our website */}
      <div className=" relative h-full  w-5/6 mx-auto mt-10 mb-16 border-solid border-gray-900 border-2 rounded-3xl overflow-hidden">
      <WrappedMap 
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${'AIzaSyCzX1-NJvQvcQ8PcIfEL2b_IVejyVyKi10'}`}
      loadingElement={<div style={{height: '100%'}} />}
      containerElement={<div style={{height: '100%'}} />}
      mapElement={<div style={{height: '100%'}} />}
      />
      </div>
    
      
    </div>
  );
}


export default App;