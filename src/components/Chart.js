import React, { Component } from 'react';
import { connect } from 'react-redux'
import Lottie from 'react-lottie';
import {
    fetchChartDataIfNeeded,
    fetchSensorsIfNeeded,
    invalidateSuburl
} from '../actions'
import { DatePicker } from 'react-md';
import * as animationData from '../animations/loader-success-failed.json'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensorIDs: "",
            date: new Date().toLocaleDateString(),
            dateChanged: true,
            ready: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(invalidateSuburl('sensors'));
        dispatch(fetchSensorsIfNeeded('sensors'));
        if (localStorage.getItem("validated") === undefined || localStorage.getItem("validated") === null)
            this.props.history.push('login');
        if (this.props.sensors.length > 0 && this.state.week !== undefined && this.state.year !== undefined) {
            var sensorIDs = this.props.sensors.map((sensor) => {
                return sensor.ID
            }).toString();
            this.setState({
                sensorIDs: sensorIDs
            });
            var values = {
                sensors: sensorIDs,
                date: this.state.date,
            }
            dispatch(fetchChartDataIfNeeded('chartData', values));
        }
    }

    componentDidUpdate(nextProps) {
        const { dispatch } = this.props
        var values, sensorIDs;
        if (this.props.sensors !== nextProps && this.props.sensors.length > 0 && this.props.chartData.length === 0 && nextProps.sensors.length === 0 && this.state.dateChanged) {
            sensorIDs = this.props.sensors.map((sensor) => {
                return sensor.ID
            }).toString();
            values = {
                sensors: sensorIDs,
                date: this.state.date
            }
            this.setState({
                sensorIDs: sensorIDs,
                dateChanged: false,
                ready: true
            });
            dispatch(fetchChartDataIfNeeded('chartData', values));
        }
        else if (this.state.dateChanged && this.props.sensors.length > 0) {
            sensorIDs = this.props.sensors.map((sensor) => {
                return sensor.ID
            }).toString();
            values = {
                sensors: sensorIDs,
                date: this.state.date
            }
            this.setState({
                dateChanged: false,
                ready: false
            });
            dispatch(invalidateSuburl('chartData'));
            dispatch(fetchChartDataIfNeeded('chartData', values));
        }
        else if (this.props.chartData !== nextProps.chartData) {
            this.setState({
                ready: true
            });
        }
    }

    handleChange(date) {
        this.setState({
            date: date,
            dateChanged: true
        });
    }

    render() {
        const { isFetching, chartData, didInvalidate, sensors } = this.props;
        const DEFAULT_DATE = new Date().toLocaleDateString();
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
        return (
            <div>
                <div className="md-grid">
                    <div className="md-cell--5">
                        <DatePicker
                            id="appointment-date-portrait"
                            label="Select a Date"
                            className="md-cell"
                            defaultValue={DEFAULT_DATE}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                {isFetching && chartData.length === 0 &&
                    <Lottie options={defaultOptions} height={400} width={400} />}
                {!isFetching && !didInvalidate && !this.state.ready &&
                    <Lottie options={defaultOptions} height={400} width={400} />}
                {!isFetching && !didInvalidate && this.state.ready &&
                    <div>
                        <h3 style={{marginLeft:'40px'}}>Customer Daily Chart</h3>
                        <LineChart width={600} height={300} data={chartData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            {sensors.some(sensor => sensor.ID.toString() === "2843") &&
                                <Line type="monotone" dataKey="2843" stroke="#8884d8" />}
                            {sensors.some(sensor => sensor.ID.toString() === "2844") &&
                                <Line type="monotone" dataKey="2844" stroke="#82ca9d" />}
                            {sensors.some(sensor => sensor.ID.toString() === "2845") &&
                                <Line type="monotone" dataKey="2845" stroke="#8479d4" />}
                        </LineChart>
                    </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { selectedSuburl, postsBySuburl } = state;

    const {
        didInvalidate,
        isFetching,
        items: chartData
        } = postsBySuburl['chartData'] || {
            isFetching: true,
            items: []
        };

    const {
        items: sensors
    } = postsBySuburl['sensors'] || {
            items: []
        }
    return {
        didInvalidate,
        isFetching,
        selectedSuburl,
        chartData,
        sensors,
    }
}

export default connect(mapStateToProps)(Chart)