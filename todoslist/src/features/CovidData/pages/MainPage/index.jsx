import React from "react";
import PropTypes from "prop-types";
import apiCovid from "../../../../api/apiCovid";
import { useEffect } from "react";
import { useState } from "react";
import Countries from "../../components/CountrySelector";
import  Helmet  from "react-helmet";
Main.propTypes = {};

function Main(props) {
  const [listCountries, setListCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [listDateConfirmed, setListDateConfirmed] = useState([]);
  useEffect(() => {
    const fetchApiGetCountries = async () => {
      try {
        const response = await apiCovid.getCountries();
        setListCountries(response);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchApiGetCountries();
  }, []);
const x = listCountries.map(({Country, Slug})=>{
    return {
        value: Slug,
        label: Country
    }
})
    const handleChangeInput = (value)=>{
        setCountry(value.value);
    }
    useEffect(()=>{
        const fetchApiGetConfirmedCovid = async ()=>{
            console.log(country);
            const response = await apiCovid.getConfirmed(country);
            setListDateConfirmed(response);
        }
        fetchApiGetConfirmedCovid();
    },[country]);
    console.log(listDateConfirmed);
  return (
    <div>
      <Helmet>
      <link rel="shortcut icon"  href="https://img.icons8.com/emoji/100/000000/microbe.png" />

        <title>Covid Data</title>
      </Helmet>
      <Countries options={x} onChange={handleChangeInput} />
    </div>
  );
}

export default Main;
