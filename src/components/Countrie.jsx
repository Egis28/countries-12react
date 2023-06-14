import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

const Countrie = ({ filteredCountrys, getOneCountryInfo, spiner }) => {

    
    console.log(filteredCountrys);

    return (
        <div className='d-inline-flex flex-wrap justify-content-center w-100'>
            {}
            {filteredCountrys !== undefined && filteredCountrys.length !== 0 ?
                
                filteredCountrys.map((country, index) => (
                    <Card className='cards m-3 border-secondary text-bg-secondary ' style={{ width: '18rem' }} key={index}>
                        <Card.Img className='border-bottom border-secondary' variant="top" src={country.flags.png} alt={country.flags.alt} />
                        <Card.Body className='d-inline-flex flex-column justify-content-around'>
                            <Card.Title>{country.name.common}</Card.Title>
                            <Card.Text>Capital: {country.capital}</Card.Text>
                            <Card.Text>Region: {country.region} ({country.subregion})</Card.Text>
                            <Button
                                variant="outline-info"
                                onClick={() => getOneCountryInfo(country.name.common)}
                            >Read more about - {country.name.common}</Button>
                        </Card.Body>
                    </Card>
                ))
                
                : <Spinner className='m-5' animation={spiner} variant="info" />
            }
        </div>
    )
}

export default Countrie