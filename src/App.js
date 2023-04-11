import './App.css';
import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Person from './Views/Person'
import Planet from './Views/Planet'
import Home from './Views/Home'
import Film from './Views/Film'

function App() {
  const [tempId, setTempId] = useState(0)
  const [id, setId] = useState(1)
  const [searchParam, setSearchParam] = useState('people')
  const navigate = useNavigate()

  const getHomeworld = ( newId ) => {
    setId(newId)
  }

  const sendSearch = (event) => {
    event.preventDefault();
    setId(tempId)
    navigate(`/${searchParam}/${tempId}`)
  }

  return (
    <div className="App px-40">
      <form onSubmit={sendSearch} className='mt-10 flex gap-5 justify-center items-center mb-10'>
        <div>
          <label htmlFor="search">Search for: </label>
          <select name="search" id="search" onChange={ (event) => { setSearchParam(event.target.value) }} className='bg-gray-700 bg-opacity-25 rounded-lg px-1 py-1'>
            <option value="people" className='bg-gray-200 bg-opacity-10'>people</option>
            <option value="planets" className='bg-gray-200 bg-opacity-10'>planets</option>
            <option value="films" className='bg-gray-200 bg-opacity-10'>films</option>
          </select>
        </div>
        <div>
          <label htmlFor="id">ID: </label>
          <input type="number" onChange={ (event) => { setTempId(event.target.value) } } placeholder='id' className='w-14 border'/>
        </div>
        <button type="submit" className='bg-blue-500 px-4 py-2 rounded-2xl'>Search</button>
      </form>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/people/:id' element={<Person id={id} getHomeworld={getHomeworld}/>}/>
        <Route path='/planets/:id' element={<Planet id={id} />}/>
        <Route path='/films/:id' element={<Film id={id} />}/>
      </Routes>
    </div>
  );
}

export default App;
