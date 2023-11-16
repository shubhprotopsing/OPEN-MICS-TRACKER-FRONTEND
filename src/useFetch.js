import {useEffect, useState} from "react";
import axios from "axios";  //used for HTTP requests

function useFetch(url) {

    const[data,setData] = useState([]);          //to store the fetched data
    const[loading,setLoading] = useState(false); //to track whether data is being fetched or ot
    const[error,setError] = useState(null);     //store errors if caught
    //this callback function defined in the useEffect hook will run
    //when the component is MOUNTED as well as whenever the 'url' changes
    useEffect( ()=>{
        setLoading(true);
        axios
        .get(url)                 //makes an HTTP get request to the specified url
        .then((response)=> {      //if request is sucessful data is stored using setData function
            setData(response.data);
        }).catch((err)=>{         //if an error occurs during the request, error is stored using setError function
            setError(err);
        }).finally(()=>{          //loading is set to false after the request,regardless of whether is was successful or failure
            setLoading(false);
        });

    },[url]);

    return{data, loading, error};

}

export default useFetch;