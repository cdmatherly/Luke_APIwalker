import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Person(props) {
    const [person, setPerson] = useState(null)
    const [fetchError, setFetchError] = useState('')
    const [homeworld, setHomeworld] = useState('')
    const [homeworldId, setHomeworldId] = useState(1)
    const { id, getHomeworld } = props;
    const navigate = useNavigate();

    useEffect(() => {
        
        axios.get(`https://swapi.dev/api/people/${id}`)
        .then(response=>{
            // console.log(response);
            const { data } = response;
            console.log(data)
            setPerson(data)
            setFetchError('')
            //finds homeworld ID by grabbing last two characters from their homeworld URL
            setHomeworldId(data.homeworld.slice(-3).replace('/','').replace('/',''))
            console.log(`Homeworld ID >> ${data.homeworld.slice(-3).replace('/','').replace('/','')}`)
            // getHomeworld(data.homeworld.slice(-2)[0])
            //nested request for the homeworld
            axios.get(data.homeworld)
            .then(response=>{
                const { data } = response;
                console.log(data)
                // console.log(`Homeworld Name >> ${data.name}`)
                setHomeworld(data)
            })
            .catch(err => {
                console.log(err)
                // If the api responded and sent back a message in the data, use that, otherwise, use the axios error message.
                // The ?. is optional chaining, it let's you access keys that may not exist without causing an error.
                setFetchError(err?.response?.data?.message || err.message)
            })
        })
        .catch(err => {
            console.log(err)
            // If the api responded and sent back a message in the data, use that, otherwise, use the axios error message.
            // The ?. is optional chaining, it let's you access keys that may not exist without causing an error.
            setFetchError(err?.response?.data?.message || err.message)
        })
    }, [id]);
    
    const handleHomeworldLink = () => {
        getHomeworld(homeworldId)
        navigate(`/planets/${homeworldId}`)
    }

    return (
        <>
        {/* Checks if there is a person fetched from the API and there is no error message */}
        {person !== null && fetchError == '' &&
            (<>
                <p className="text-xl font-bold">{person.name}</p>
                <p><span className="font-bold">Height: </span>{person.height}</p>
                <p><span className="font-bold">Mass: </span>{person.mass}</p>
                <p className="capitalize"><span className="font-bold">Hair Color: </span>{person.hair_color}</p>
                <p className="capitalize"><span className="font-bold">Skin Color: </span>{person.skin_color}</p>
                <p className="capitalize"><span className="font-bold">Homeworld: </span><a onClick={ handleHomeworldLink } className="underline text-blue-500">{homeworld.name}</a></p>
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