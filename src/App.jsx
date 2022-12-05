
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ErrorFech from './components/ErrorFech'
import LocationInfor from './components/LocationInfor'
import ResidentCard from './components/ResidentCard'




function App() {



  const [location, setLocation] = useState()

  const [locationInput, setLocationInput] = useState()

  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let URL

    if (locationInput) {
      URL = `https://rickandmortyapi.com/api/location/${locationInput}`

    } else {
      const randomIdLocation = Math.floor(Math.random() * 126) + 1
      URL = `https://rickandmortyapi.com/api/location/${randomIdLocation}`

    }



    axios.get(URL)
      .then(res => {
        setLocation(res.data)
        setHasError(false)
      })
      .catch(err => {
        setHasError(true)
        console.log(err)
      })

  }, [locationInput])


  const handleSubmit = e => {
    e.preventDefault()
    setLocationInput(e.target.imputSearch.value)

  }


  return (
    <div className="App">

      <h1>Rick and Morty</h1>
      <form onSubmit={handleSubmit}>
        <input id='imputSearch' type="text" />
        <button>Search</button>
      </form>
      {
        hasError ?
          <ErrorFech />
          :
          <>

            <LocationInfor location={location} />
            <div className='residents-container'>
              {
                location?.residents.map(url => (
                  <ResidentCard key={url} url={url} />
                ))
              }

            </div>

          </>

      }



    </div>
  )
}

export default App
