import { useState, useEffect } from 'react';
import { getAllCountriesInfo, countrysSearchName, getOneCountry } from '../services/CountriesService';
import Countrie from './Countrie';
import Regions from './Regions';
import ContryModal from './ContryModal';

const Main = () => {
    
    const [countries, setCountries] = useState([]);
    const [filteredCountrys, setFilteredCountrys] = useState([]);
    const [oneCountry, setOneCountry] = useState([]);
    const [spiner, setSpiner] = useState('border');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getData = () => {
        
        getAllCountriesInfo()
            .then(response => {
                if (response !== undefined) {
                    setCountries(response);
                    setFilteredCountrys(response);
                    setSpiner('true');
                }
            })
    }

    console.log(getAllCountriesInfo);

   
    const getCountryName = (searchWord) => {
        countrysSearchName(searchWord)
            .then(response => {
                if (response !== undefined) {
                    setFilteredCountrys(response);
                }
            })
    }

    
    const getOneCountryInfo = (country) => {
        getOneCountry(country).then(response => {
            if (response !== undefined) {
                // console.log(country, response);
                setOneCountry(response);
                handleShow();
            }
        })
    }

    
    const uniqueRegions = [...new Set(countries.map((oneRegion) => oneRegion.region)), "All"];
    console.log(uniqueRegions);

   
    const filterData = (region) => {
        console.log(region);
        
        if (region !== 'All') {
            
            const filtered = countries.filter((items) => items.region.includes(region));
            setFilteredCountrys(filtered);
        } else {
            
            setFilteredCountrys(countries);
        }
        console.log(filteredCountrys);
    }

   
    useEffect(() => {
        getData();
    }, [])

    return (
        <div className=''>
            <Regions
                uniqueRegions={uniqueRegions}
                filterData={filterData}
                getCountryName={getCountryName}
            />
            <Countrie
                filteredCountrys={filteredCountrys}
                getOneCountryInfo={getOneCountryInfo}
                spiner={spiner}
            />
            <ContryModal
                oneCountry={oneCountry}
                handleClose={handleClose}
                show={show}
            />
        </div>
    )
}

export default Main