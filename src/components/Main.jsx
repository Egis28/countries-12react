import { useState, useEffect } from 'react';
import { getAllCountriesInfo, countrysSearchName, getOneCountry } from '../services/CountriesService';
import Countrie from './Countrie';
import Regions from './Regions';
import ContryModal from './ContryModal';
import Modal from 'react-modal';

const Main = () => {
    // state visada top level - virsuje
    const [countries, setCountries] = useState([]);
    const [filteredCountrys, setFilteredCountrys] = useState([]);

    const [oneCountry, setOneCountry] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue = () => {
        Modal.setAppElement("body")
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }

    // funkcija duomenu gavimui is service (https://restcountries.com/v3.1/name/{name})
    const getCountryName = (searchWord) => {
        countrysSearchName(searchWord)
            .then(response => {
                if (response !== undefined) {
                    setFilteredCountrys(response)
                }
            })
    }


    const getData = () => {
        // gauti duomenis is service aprasyto axios get metodo
        getAllCountriesInfo()
            .then(response => {
                setCountries(response)
                setFilteredCountrys(response)
            })
    }

    console.log(getAllCountriesInfo)
    // isfiltruojami unikalus regionai
    const uniqueRegions = [...new Set(countries.map((oneRegion) => oneRegion.region)), "All"];
    console.log(uniqueRegions);

    // funkcija isfiltruoja duomenis pagal regiona
    const filterData = (region) => {
        console.log(region)
        // ifas pargrazinti visus duomenis be filtracijos
        if (region !== 'All') {
            // filtruojamos salys
            const filtered = countries.filter((items) => items.region.includes(region));
            setFilteredCountrys(filtered)
        } else {
            // priskiriamos visos salys
            setFilteredCountrys(countries);
        }
        console.log(filteredCountrys);
    }

    const getOneCountryInfo = (country) => {
        getOneCountry(country).then(response => {
            console.log(country, response)
            setOneCountry(response)
        })
        setModalIsOpenToTrue()
    }

    // console.log(countries);
    // kada pakviesime daryti req - uzklausa pasako mums useEffect
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
                countries={countries}
                filteredCountrys={filteredCountrys}
                getOneCountryInfo={getOneCountryInfo}
            />
            
            <Modal 
                isOpen={modalIsOpen} 
                >
                <ContryModal
                    setModalIsOpenToFalse={setModalIsOpenToFalse}
                    oneCountry={oneCountry}
                />
            </Modal>
        </div>
        
    )
}

export default Main