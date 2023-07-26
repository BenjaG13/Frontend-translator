import axios from "axios";
import { useState } from "react";

const ButtonPostIndice = ({currentPage}) => {
    const [url, setUrl] = useState(process.env.REACT_APP_API_URL)


    const postIndice = async () => {

           let y = window.scrollY
            console.log(y)
        try {
           

            const data = {
                id: 1,
                y: y,
                indice: currentPage
            };
            console.log("INDICEEEE" + currentPage)
            
            const headers = {
                "ngrok-skip-browser-warning": "69420",
            };
    
            const response = await axios.post(`${url}/api/indice`, { data, headers });
    
            console.log(response.data);
        } catch (error) {
    
            console.error(error);
        }
    }; 

    return (
      <button className="btn button-indice" onClick={postIndice}>Save</button>
    );
  }
  
  export default ButtonPostIndice;