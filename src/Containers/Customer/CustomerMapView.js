// import React,{useState} from 'react'
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// function CustomerMapView() {
//     const [places, setPlaces] = useState(Array.from({ length: 1 }, (_, placeIndex) => ({
//         address: '',
//         country: '',
//         state: '',
//         city: '',
//         pinCode: '',
//         street: '',
//         latitude: 0,
//         longitude: 0,
//         numberOfCars: 1,
//         loadingDate:"",
//         loadingHours:"",
//         // loadingDate:"",
//         sequenceNo: placeIndex + 1, // Ensure sequenceNo starts from 1
//         carList: [{ bodyType: '', makes: [], make: '', models: [], model: '', vin: '', drivable: "", }]
//       })));
//     const [mapCenters, setMapCenters] = useState(Array.from({ length: 1 }, () => ({ lat: 52.3676, lng: 4.9041 })));
//     const mapContainerStyle = {
//         width: '26rem',
//         height: '10rem',
//         // marginBottom: '20px',
//         marginTop:"-30px"
//       };
//   return (
//     <div>
//         <div className="map-and-address-container" >
//     <div className="chosen-address">
// {/* {place.address1?place.address1:"Amsterdam,Netherlands"} */}
// </div>
// <div className="map-container">

// <GoogleMap
// mapContainerStyle={mapContainerStyle}
// //center={props.places[placeIndex].latLng || props.mapCenters[placeIndex]}
// // center={mapCenters[placeIndex] || { lat: 52.3676, lng:4.9041 }}
// zoom={15}
// >
// {/* {places[placeIndex].latitude && places[placeIndex].longitude && (
// <Marker position={{ lat: places[placeIndex].latitude, lng: places[placeIndex].longitude }} />
// )} */}
// {/* {props.places[placeIndex].latLng && (
// <Marker position={props.places[placeIndex].latLng} />
// )} */}
// </GoogleMap>
// </div>
// </div></div>
//   )
// }

// export default CustomerMapView

