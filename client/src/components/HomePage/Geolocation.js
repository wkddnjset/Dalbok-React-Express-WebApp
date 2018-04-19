import React, {Component} from 'react';
//import GoogleMap from 'google-map-react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Promise from 'bluebird';
import Spinner from '../SpinnerPage/Spinner'

class Geolocation extends Component {
    constructor(props) {
        super(props);
        　
        this.state = {
            lat: null,
            lng: null,
            api_key:"AIzaSyBfYqmeQ3Udjbs9YsUfGQ1CfYX3ouDgyzc",
            zoom : 16,
        }
    }
    componentWillMount() {
        new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((p) => {
                // 아래 api 위도 경도가 조금 정확하지 않아서 html5 스펙인 geolocation 사용
                this.setState({
                    lat: p.coords.latitude,
                    lng: p.coords.longitude
                }, () => {
                    resolve(p.coords)
                })
            });
        }).then((coords) => {
            console.log("Success");
        }).catch((err) => {
            console.error(err);
        });
    }
    
    render() {
        const {lat, lng, zoom} = this.state;
        if (lat!==null){
            const MyMapComponent = compose(
                withProps({
                    googleMapURL:
                      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBfYqmeQ3Udjbs9YsUfGQ1CfYX3ouDgyzc&v=3.exp&libraries=geometry,drawing,places",
                    loadingElement: <div style={{ height: `100%` }} />,
                    containerElement: <div style={{ height: `100%` }} />,
                    mapElement: <div style={{ height: `100%` }} />
                }),
                    withScriptjs,
                    withGoogleMap
                )(props => (
                    <GoogleMap defaultZoom={zoom} defaultCenter={{ lat: lat, lng: lng }}>
                        <Marker position={{ lat: lat, lng: lng }} />
                    </GoogleMap>
                ));
            return (
                <div className="GoogleMap">
                    <MyMapComponent />
                </div>
            );
        }
        console.log("lat : ", lat);
        console.log("lng : ", lng);
        return (
            <Spinner/>
        );
    }
}
　
export default Geolocation;