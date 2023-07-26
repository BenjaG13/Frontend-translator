import axios from 'axios';
import React, { useState } from 'react';

const Sentence = ({ text, index, settingShow, settingTranslatedText}) => {
  
  
  const [url, setUrl] = useState(process.env.REACT_APP_API_URL)

  const getTranslator = async (e) => {
    e.preventDefault();

    const headers = {
      "ngrok-skip-browser-warning": "69420",
  };

    try {
      settingTranslatedText("")
      settingShow(index)
      const response = await axios.post(`${url}/api/translator`, { text, headers });
      console.log('respuesta de la api', response);
      const translatedData = response.data[0].translations[0].text;
      settingTranslatedText(translatedData);
      // window.alert(translatedData);
    } catch (error) {
      window.alert(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <tbody>
        <tr key={index}>
          <td className="col-10">{text}</td>
          <td>
            <button className="btn btn-primary " onClick={getTranslator}>
              Traducir
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default Sentence;
