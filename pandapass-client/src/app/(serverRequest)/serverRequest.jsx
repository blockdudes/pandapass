import axios from "axios";


export async function getData(url) {
    const response = await axios.get(url);
    return response.data;
}


export async function setData(url, data) {
    const response = await axios.post(url,data,{
        headers:  { "Content-Type": "application/json" },
    })
    return response.data;
} 

