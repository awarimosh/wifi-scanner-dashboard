import React, { Component } from 'react';
import Paper from 'react-md/lib/Papers';
import {
    postSensor
} from '../actions'

const style1 = {
    marginLeft: 20,
    marginBottom: 5,
    width: '80%'

};
const style = {
    marginLeft: 20,
    margintop: 5,
    marginRight: 20,
};

const style2 = {
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
};

const paperStyle = {
    paddingLeft: 15,
    paddingRight: 15,
};

class SensorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceID: '', deviceName: '', zoneID: '', deviceDescription: '',
            deviceLocation: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        var values = {
            deviceID: this.state.deviceID,
            deviceName: this.state.deviceName,
            zoneID: this.state.zoneID,
            deviceDescription: this.state.deviceDescription,
            deviceLocation: this.state.deviceLocation,
        }
        alert('A Sensor was submitted: ');
        postSensor(values);
        event.preventDefault();
    } render() {
        return (
            <div className="md-cell--12" style={style2}>
                <Paper zDepth={2} style={paperStyle}>
                    <h3 style={style} className="md-cell--middle">Create Sensor</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label style={style1}>Device ID </label>
                        <input
                            name="deviceID"
                            style={style}
                            placeholder="Device ID"
                            size={10}
                            className="md-cell--10 md-cell--bottom"
                            value={this.state.deviceID}
                            onChange={this.handleInputChange}
                        /><br />
                        <label style={style1}>Device Name </label>

                        <input
                            style={style}
                            name="deviceName"
                            value={this.state.deviceName}
                            onChange={this.handleInputChange}
                            placeholder="Name"
                            className="md-cell--10 md-cell--bottom" /><br />
                        <label style={style1}>Zone ID </label>

                        <input
                            style={style}
                            name="zoneID"
                            value={this.state.zoneID}
                            onChange={this.handleInputChange}
                            placeholder="Zone"
                            className="md-cell--10 md-cell--bottom" /><br />
                        <label style={style1}>Device Description </label>

                        <input
                            name="deviceDescription"
                            placeholder="Description"
                            rows={2}
                            style={style}
                            className="md-cell--10 md-cell--bottom"
                            value={this.state.deviceDescription}
                            onChange={this.handleInputChange}
                        /><br />
                        <label style={style1}>Device Location </label>

                        <input
                            style={style}
                            name="deviceLocation"
                            value={this.state.deviceLocation}
                            onChange={this.handleInputChange}
                            placeholder="Location"
                            className="md-cell--10 md-cell--bottom" />
                        <br />
                        <input className="md-cell md-cell--center md-cell--middle" type='submit' value='Save' />

                    </form>
                </Paper>
            </div>
        );
    }
}

export default SensorForm;