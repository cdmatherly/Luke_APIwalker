import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function Film(props) {
    const [film, setFilm] = useState(null)
    const [fetchError, setFetchError] = useState('')
    const { id } = props;
    useEffect(() => {
        
        axios.get(`https://swapi.dev/api/films/${id}`)
        .then(response=>{
            // console.log(response);
            const { data } = response;
            console.log(data)
            setFilm(data)
            setFetchError('')
        })
        .catch(err => {
            console.log(err)
            // If the api responded and sent back a message in the data, use that, otherwise, use the axios error message.
            // The ?. is optional chaining, it let's you access keys that may not exist without causing an error.
            setFetchError(err?.response?.data?.message || err.message)
        })
    }, [id]);
    


    return (
        <>
        {/* Checks if there is a film fetched from the API and there is no error message */}
        {film !== null && fetchError == '' &&
            (<>
                <p className="text-xl font-bold">{film.title}</p>
                <p className="capitalize"><span className="font-bold">Director: </span>{film.director}</p>
                <p className="capitalize"><span className="font-bold">Episode: </span>{film.episode_id}</p>
                <p className="capitalize"><span className="font-bold">Producers: </span>{film.producer}</p>
                <p className=""><span className="font-bold">Opening Crawl: </span><br></br>{film.opening_crawl}</p>
            </>)}
        {/* Checks if there is an error message */}
        {fetchError !== '' && 
        (<div>
            <p className="text-xl font-bold text-center mb-5">These are not the droids you are looking for.</p>
            <img className="mx-auto" src="https://lumiere-a.akamaihd.net/v1/images/image_9797b844.jpeg?region=0,125,1536,614" alt="image of Obi-Wan Kenobi" />
        </div>)}
        </>
    )
}