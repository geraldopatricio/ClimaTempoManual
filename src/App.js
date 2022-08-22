import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=pt_br&appid=0720188f76903c6fe50931b602a81073`
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Informe a Cidade, Estado ou País'
          type="text" />
      </div>
      <div className="container">
      {data.name !== undefined &&
        <div className="titulo">
          <div className="local">
            {data.main ? <p className='bold'>{data.name}</p> : null}
            <p class="text_desc">Local</p>
          </div>
          <div className="pais">
            {data.main ? <p className='bold'>{data.sys.country}</p> : null}
            <p class="text_desc">País</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
        }

      {data.name !== undefined &&
        <div className="titulo">
          <div className="local">
            {data.main ? <p className='bold'>{data.coord.lat}</p> : null}
            <p class="text_desc">Latitude</p>
          </div>
          <div className="pais">
            {data.main ? <p className='bold'>{data.coord.lon}</p> : null}
            <p class="text_desc">Longitude</p>
          </div>
        </div>
        }

        {data.name !== undefined &&
          <div className="rodape">
            <div className="temp_maximo">
              {data.main ? <p className='bold'>{data.main.temp_min.toFixed()}°</p> : null}
              <p class="text_desc">Mínima</p>
            </div>
            <div className="temp_maximo">
              {data.main ? <p className='bold'>{data.main.temp_max.toFixed()}°</p> : null}
              <p class="text_desc">Máxima</p>
            </div>
            <div className="humidade">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p class="text_desc">Humidade</p>
            </div>
            <div className="vento">
              {data.wind ? <p className='bold'>{Math.round(data.wind.speed.toFixed() * 1.60934 )} Km/h</p> : null}
              <p class="text_desc">Velocidade do Vento</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
