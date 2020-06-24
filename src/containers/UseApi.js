import React,{useEffect,useState} from 'react';
import axios from 'axios';

const UseApi = endpoint => {

const [data,setData] = useState([]);
    useEffect(() => {
        getData();
});

const getData = async () => {
  const response = await axios.get(endpoint)  // endpoint refers to the API
    setData(response.data)
}

return data

}

export default UseApi;