



import React, { useEffect, useState } from 'react';
// import truck from "../../../../Assets/Images/trckColr.jpg";
// import truckIconUrl from "../../../../Assets/Images/Frame.jpg";
import { GoogleMap, Marker, Circle } from '@react-google-maps/api';

const CustomerGoogleMap = (props) => {
  const [center, setCenter] = useState(null);
  const defaultCoordinates = { lat: 52.3676, lng: 4.9041 };
//   useEffect(() => {
//     const newCenter = shouldUseOrigin
//       ? props.origin.location
//       : props.latLngArray[0] || defaultCoordinates;

//     setCenter(newCenter);
//   }, [props.origin, props.latLngArray]);

//   const shouldUseOrigin =
//     props.latLngArray.length === 0 && props.origin && props.origin.location;

//   const markers = shouldUseOrigin
//     ? [
//         props.origin.location && (
//           <Marker
//             key="origin-marker"
//             position={props.origin.location}
//             label="Origin"
//           />
//         ),
//       ]
//     : props.latLngArray.map((coord, index) => (
//         <Marker
//           key={index}
//           position={coord}
//           // label={(index + 1).toString()}
//           icon={{
          
//             // url: props.selectedMarker && props.selectedMarker.lat === coord.lat && props.selectedMarker.lng === coord.lng ? truck : truckIconUrl,
            
//             scaledSize: new window.google.maps.Size(25, 25),
//           }}
//           onClick={() => props.handleMarkerClick(coord)}
//         />
//       ));

  const mapOptions = {
    zoom: 10,
    center: center || defaultCoordinates, // Use center or defaultCoordinates
    draggable: true,
    zoomControl: true,
  };

//   const handleOnLoad = (map) => {
//     const bounds = new window.google.maps.LatLngBounds();
//     props.latLngArray.forEach((coord) => bounds.extend(coord));
//     map.fitBounds(bounds);
//   };
  const radius = props.emptyTruckLoad ? props.emptyTruckLoad.radius * 1000 : 0;

  
  

 

  return (
    <GoogleMap
      mapContainerStyle={{ height: '18rem', width: '44rem' }}
      options={mapOptions}
    //   onLoad={handleOnLoad}
      center={center || defaultCoordinates} // Use center or defaultCoordinates
    >
      {/* {markers} */}
      {/* {shouldUseOrigin && props.origin.location && (
        <Marker position={props.origin.location} />
      )} */}
      <Circle
        center={center || defaultCoordinates} // Use center or defaultCoordinates
        radius={radius}
        options={{
          fillColor: 'blue',
          fillOpacity: 0.2,
          strokeColor: 'blue',
          strokeOpacity: 0.8,
          strokeWeight: 2,
        }}
      />
    </GoogleMap>
  );
};

export default CustomerGoogleMap;


