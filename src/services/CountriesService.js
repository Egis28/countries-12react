import axios from "axios";

const API_URL = 'https://restcountries.com/v3.1/all';


const getAllCountriesInfo = async () => {
  try {
    const res = await axios.get(API_URL);
    if (res.data !== undefined) {
      return res.data
    }
  } catch (error) {
    console.log(error);
  }
}


const countrysSearchName = async (name) => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    if (res.status !== 404) {
      const data = await res.json()
      return data
    }
  } catch (error) {
    console.log(error);
  }
}


const getOneCountry = async (oneCountry) => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${oneCountry}?fullText=true`);
    const data = await res.json()
    console.log(data, "getOneCountry service");
    return data
  } catch (error) {
    console.log(error);
  }
}

export { getAllCountriesInfo, countrysSearchName, getOneCountry };