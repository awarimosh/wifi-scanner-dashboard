import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={13}
                initialCenter={{
                    lat: 3.111944,
                    lng: 101.638917
                }}>

                {this.props.sensors.map(function (marker, i) {
                    var ref = 'marker_' + i;
                    return (
                        <Marker key={ref} ref={ref}
                            title={marker.Name}
                            position={{ lat: marker.Latitude, lng: marker.Longitude }}>
                            {marker.showInfo ? this._renderInfoWindow(ref, marker) : null}
                        </Marker>
                    );
                }.bind(this))}
            </Map >
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCQrvlv3FvXnmcXntPywrIsQoNILHpc2gI"
})(MapContainer)