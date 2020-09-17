import React from "react";
import { GoogleApiWrapper } from 'google-maps-react';
import { Marker, GoogleMap, withScriptjs, withGoogleMap, InfoWindow } from 'react-google-maps';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';


const googleAPIKey = "AIzaSyA9mW7320FY-hHSVn38f00MwSex8Iqmjpc"
function Map(props) {
    const [data, setData] = React.useState(null);
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{
                lat: 33.6321847,
                lng: 73.0697192
            }}
        >
            <Marker position={{
                lat: props.latitude,
                lng: props.longtitude
            }}
                onClick={() => {
                    setData(props)
                }}
            />

            {
                data && (
                    <InfoWindow position={{
                        lat: props.latitude,
                        lng: props.longtitude
                    }}
                        onCloseClick={() => {
                            setData(null)
                        }}
                    >
                        <div>
                            <h5 style={{ margin: 0 }}>{props.placeName}</h5>
                        </div>
                    </InfoWindow>
                )
            }
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function GoogleMapComponent(props) {
    const map = new props.google.maps.Map(<div></div>);
    const [getLocation, setGetLocation] = React.useState("");
    const [placeName, setPlaceName] = React.useState("");
    const [latitude, setLatitude] = React.useState(0);
    const [longtitude, setLongtitude] = React.useState(0);
    const handleChange = address => {
        setGetLocation(address)
    };
    const handleSelect = (address) => {
        geocodeByAddress(address)
            .then(results => {
                const request = {
                    placeId: results[0].place_id
                };
                const service = new props.google.maps.places.PlacesService(map);
                service.getDetails(request, function (place, status) {
                    if (status === props.google.maps.places.PlacesServiceStatus.OK) {
                        setPlaceName(place.name)
                    }
                });
            })
            .catch(error => console.error('Error', error));

        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => { setLatitude(latLng.lat); setLongtitude(latLng.lng) })
            .catch(error => console.error('Error', error));
    };
    return (
        <div style={{ height: "300px", width: "100%" }}>
            <PlacesAutocomplete
                value={getLocation}
                onChange={handleChange}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                className: 'location-search-input',
                                placeholder: 'Street Address',
                            })}
                            style={{
                                backgroundColor: "#fff",
                                border: "1px solid transparent",
                                borderRadius: "2px",
                                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                                boxSizing: "border-box",
                                fontFamily: "Roboto",
                                fontSize: "15px",
                                fontWeight: 300,
                                height: "29px",
                                left: "270px",
                                outline: "none",
                                padding: "0 11px 0 13px",
                                position: "absolute",
                                textOverflow: "ellipsis",
                                top: "35px",
                                zIndex: "99999",
                            }}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleAPIKey}`}
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
                latitude={latitude}
                longtitude={longtitude}
                placeName={placeName}
            />
        </div>
    );
}
// const GoogleMap = (props) => {
//     const map = new props.google.maps.Map(<div></div>);
//     const [getLocation, setGetLocation] = React.useState("");
//     const handleChange = address => {
//         setGetLocation(address)
//     };

//     const handleSelect = (address) => {
//         geocodeByAddress(address)
//             .then(results => {
//                 const request = {
//                     placeId: results[0].place_id
//                 };
//                 const service = new props.google.maps.places.PlacesService(map);
//                 service.getDetails(request, function (place, status) {
//                     if (status === props.google.maps.places.PlacesServiceStatus.OK) {
//                         console.log(place, "=====");
//                     }
//                 });
//             })
//             .catch(error => console.error('Error', error));

//         geocodeByAddress(address)
//             .then(results => getLatLng(results[0]))
//             .then(latLng => console.log('Success', latLng))
//             .catch(error => console.error('Error', error));
//     };
//     // const [selectedPlace, setselectedPlace] = React.useState<any>();
//     // const [activeMarker, setactiveMarker] = React.useState({});
//     // const [showingInfoWindow, setshowingInfoWindow] = React.useState(false);
//     // const onMarkerClick = (props, marker) => {
//     //     setselectedPlace(props);
//     //     setactiveMarker(marker);
//     //     setshowingInfoWindow(true);
//     // }
//     // const onClose = () => {
//     //     if(showingInfoWindow) {
//     //         setshowingInfoWindow(false);
//     //         setactiveMarker(null);
//     //     }
//     // }
//     return (
//         <>
//             <div>
//                 <PlacesAutocomplete
//                     value={getLocation}
//                     onChange={handleChange}
//                     onSelect={handleSelect}
//                 >
//                     {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//                         <div>
//                             <input
//                                 {...getInputProps({
//                                     className: 'location-search-input',
//                                     placeholder: 'Street Address',
//                                 })}
//                                 style={{ "position": "absolute", "top": "40px", "zIndex": "99999" }}
//                             />
//                             <div className="autocomplete-dropdown-container">
//                                 {loading && <div>Loading...</div>}
//                                 {suggestions.map(suggestion => {
//                                     const className = suggestion.active
//                                         ? 'suggestion-item--active'
//                                         : 'suggestion-item';
//                                     // inline style for demonstration purpose
//                                     const style = suggestion.active
//                                         ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                                         : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                                     return (
//                                         <div
//                                             {...getSuggestionItemProps(suggestion, {
//                                                 className,
//                                                 style,
//                                             })}
//                                         >
//                                             <span>{suggestion.description}</span>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     )}
//                 </PlacesAutocomplete>

//                 <Map google={props.google} initialCenter={{
//                     lat: 33.6321847,
//                     lng: 73.0697192
//                 }}
//                 >
//                     <Marker onClick={props.onMarkerClick} />
//                     <InfoWindow
//                         // marker={activeMarker}
//                         // visible={showingInfoWindow}
//                         onClose={props.onInfoWindowClose}
//                     >
//                         {/* <div>
//                             <h4>{selectedPlace && selectedPlace.name}</h4>
//                         </div> */}
//                     </InfoWindow>
//                 </Map>
//             </div>
//         </>
//     );
// };

export default GoogleApiWrapper({
    apiKey: googleAPIKey
})(GoogleMapComponent);