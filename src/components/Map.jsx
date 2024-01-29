
import {
       // useSearchParams, 
       useNavigate } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext'
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react'
import { useGeolocation } from '../hooks/UseGeolocation';
import {useUrlPosition} from "../hooks/UseUrlPosition"
import Button from "./Button";

const Map = () => {
       const {cities} = useCities()
       const [mapPosition, setMapPosition] = useState([40,0])
       const {isLoading: isLoadingPosition,
                position: geolocationPosition, 
               getPosition,
              } = useGeolocation()
               const [lat,lng] = useUrlPosition()
              //  const [maplat,maplng] = useUrlLocation()
//   const navigate = useNavigate()
   
//    const mapPosition = ([40,0])
  
//    const [searchParams, setSearchParams] = useSearchParams();
//    const [searchParams] = useSearchParams();
//   const lat = searchParams.get("lat");
//   const lng = searchParams.get("lng")

  useEffect (
       function(){
              if(lat && lng)
  setMapPosition([lat,lng])
},
[lat,lng]
  );

  useEffect(function(){
       if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
  },[geolocationPosition])

  return (
    <div className= {styles.mapContainer} 
//     onClick={()=>navigate('form')}
    >
       {!geolocationPosition&&
       <Button type="position" onClick = {getPosition}>
              {isLoadingPosition? "Loading...":"Use your position"}
       </Button>
}
<MapContainer 
 center={mapPosition} 
zoom={6} 
scrollWheelZoom={true} 
className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map((city)=>(
       <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
      <Popup>
       <span>{city.emoji}</span> <span>{city.cityName}</span>
      </Popup>
    </Marker>))}
    <ChangeCenter position={mapPosition}/>
    <DetectClick/>
  </MapContainer>
       <h1> Map</h1>
       <h1>
        Position : {lat}, {lng}
       </h1>
       <button onClick={()=> {
// setSearchParams({lat:23, lng:50})
       }}>
Change Position
       </button>      
        </div>
  )
}

function ChangeCenter({position}){
       const map = useMap()
       map.setView(position)
       return null
}
function DetectClick(){
       const navigate = useNavigate()
       useMapEvents({
            click: (e)=> {
              console.log(e)
              navigate(`form? uplat=${e.latlng.lat}&uplng=${e.latlng.lng}`)
            } 
            
       //      click: (e)=>  navigate(`form`)
       })
}

Map.propTypes = {
         lat: PropTypes.number.isRequired,
         lng: PropTypes.number.isRequired,
       //  position: PropTypes.number.isRequired,
     };

     ChangeCenter.propTypes = {
       position: PropTypes.arrayOf(PropTypes.number).isRequired,
     };
     
     
   

export default Map