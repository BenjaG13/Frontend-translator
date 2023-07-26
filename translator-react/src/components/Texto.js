import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Error from './Error';
import Sentence from './Sentence';
import ButtonPostIndice from './ButtonPostIndice';
import ButtonGoIndice from './ButtonGoIndice';
import { Pagination } from 'react-bootstrap';
import SentenceTranslated from './SentenceTranslated';


function Texto() {
    const [texto, setTexto] = useState([])
    const [errorstack, setErrorstack] = useState("")
    const [errormessage, setErrormessage] = useState("")
    const [errorname, setErrorname] = useState("")
    const [errorcode, setErrorcode] = useState("")
    const [errorconfig, setErrorconfig] = useState("")
    const [errorrequest, setErrorrequest] = useState("")

    const [y, setY] = useState(0)
    const [indice, setIndice] = useState(0)
    const [url, setUrl] = useState(process.env.REACT_APP_API_URL)
    const [savedIndice, setSavedIndice] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(1000);

    const [showTranslatedText, setShowTranslatedText] = useState(false);
    const [translatedText, setTranslatedText] = useState('');
    

    useEffect(() => {
         getIndice();
        getTexto();
    }, [])

    console.log("PSAPSAPSPA"+indice)

    const getIndice = async () => {
            const params = {
                id: 1,
            };
    
            const headers = {
                "ngrok-skip-browser-warning": "69420",
            };
        try {
            const response = await axios.get(`${url}/api/indice`, { params, headers });
    
            console.log('respuesta de la APIIIII', response.data.book_Y,' y ', response.data.book_Y );

            setY(response.data.book_Y);
            setIndice(response.data.book_indice)
            console.log(response.data);
            
        } catch (error) {
    
            console.error(error);
        }
        
    };
    
    const getTexto = async () => {
        try {
            const params = {
                id: 1,
            };
    
            const headers = {
                "ngrok-skip-browser-warning": "69420",
            };
    
            const response = await axios.get(`${url}/api/text`, { params, headers });
    
         //   console.log('respuesta de la API', response.data);
            setTexto(response.data);
          //  console.log(response.data);
        } catch (error) {
            setErrorstack(error.stack);
            setErrormessage(error.message);
            setErrorname(error.name);
            setErrorcode(error.code);
            setErrorconfig(error.config.headers);
            // setErrorconfig(error.config);
    
            setErrorrequest(error.request);
    
            console.error(error);
        }
    };

    // Obtener índice del último item en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    // Obtener índice del primer item en la página actual
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Obtener los items para la página actual
    const currentItems = texto.slice(indexOfFirstItem, indexOfLastItem);

    // Cambiar de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    
    return (
        <div>
            <ButtonPostIndice currentPage={currentPage}/>
            {errorstack && <Error msg={errorstack} />  }
            {errormessage && <Error msg={errormessage} />  }
            {errorname && <Error msg={errorname} />  }
            {errorcode && <Error msg={errorcode} />  }
            {errorconfig && <Error msg={errorconfig} />  }
            {/* {errorrequest && <Error msg={errorrequest} />  } */}

            <Pagination>
                {Array.from({ length: Math.ceil(texto.length / itemsPerPage) }, (_, i) => (
                <Pagination.Item key={i+1} active={i+1 === currentPage} onClick={() => handlePageChange(i+1)}>
                    {i+1}
                </Pagination.Item>
                ))}
            </Pagination>

            <div className="table-container">
                {currentItems.map((element, index) => (
                    <table className="table table-striped" key={index}>
                        {index === showTranslatedText  && <SentenceTranslated text={translatedText}/>}
                        <Sentence text={element} index={index} settingShow={setShowTranslatedText} settingTranslatedText={setTranslatedText}/>
                    </table>
                ))}
            </div>
         
            {savedIndice && <ButtonGoIndice setearIndice={setSavedIndice} y={y} indice={indice}/>}
        </div>
      );
}

export default Texto

