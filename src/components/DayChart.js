import React, { Component } from 'react';
import { connect } from 'react-redux'
import Lottie from 'react-lottie';
import {
    fetchChartDayDataIfNeeded,
    fetchSensorsIfNeeded,
    invalidateSuburl
} from '../actions'
import * as animationData from '../animations/loader-success-failed.json'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { DateRange } from 'react-date-range';
import { Button, Collapse } from 'react-md';
import createHistory from 'history/createBrowserHistory'

const history = createHistory();

class DayChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            sensorIDs: "",
            startDate: new Date().toLocaleDateString(),
            endDate: new Date().toLocaleDateString(),
            dateChanged: true,
            ready: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(invalidateSuburl('sensors'));
        dispatch(fetchSensorsIfNeeded('sensors'));
        if (localStorage.getItem("validated") === undefined || localStorage.getItem("validated") === null) {
            history.push('/login');
            window.location.reload();
        }
        if (this.props.sensors.length > 0 && this.state.week !== undefined && this.state.year !== undefined) {
            var sensorIDs = this.props.sensors.map((sensor) => {
                return sensor.ID
            }).toString();
            this.setState({
                sensorIDs: sensorIDs
            });
            var values = {
                sensors: sensorIDs,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
            }
            dispatch(fetchChartDayDataIfNeeded('chartDayData', values));
        }
    }

    componentDidUpdate(nextProps) {
        const { dispatch } = this.props
        var values, sensorIDs;
        if (this.props.sensors !== nextProps && this.props.sensors.length > 0 && this.props.chartDayData.length === 0 && nextProps.sensors.length === 0 && this.state.dateChanged) {
            sensorIDs = this.props.sensors.map((sensor) => {
                return sensor.ID
            }).toString();
            values = {
                sensors: sensorIDs,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
            }
            this.setState({
                sensorIDs: sensorIDs,
                dateChanged: false,
                ready: true
            });
            dispatch(fetchChartDayDataIfNeeded('chartDayData', values));
        }
        else if (this.state.dateChanged && this.props.sensors.length > 0) {
            sensorIDs = this.props.sensors.map((sensor) => {
                return sensor.ID
            }).toString();
            values = {
                sensors: sensorIDs,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
            }
            this.setState({
                dateChanged: false,
                ready: false
            });
            dispatch(invalidateSuburl('chartDayData'));
            dispatch(fetchChartDayDataIfNeeded('chartDayData', values));
        }
        else if (this.props.chartDayData !== nextProps.chartDayData) {
            this.setState({
                ready: true
            });
        }
    }

    handleChange(date) {
        this.setState({
            startDate: date.startDate.format('MM/DD/YYYY'),
            endDate: date.endDate.format('MM/DD/YYYY'),
            dateChanged: true
        });
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    render() {
        const { isFetching, chartDayData, didInvalidate, sensors } = this.props;
        const { collapsed } = this.state;
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
                    <div className="md-cell--10" style={{ marginBottom: '70px' }}>
                        <Button flat primary iconBefore={false} iconChildren="date_range" onClick={this.toggle}>Select Date Range</Button>
                        <Collapse collapsed={collapsed}>
                            <DateRange
                                onInit={this.handleChange}
                                onChange={this.handleChange}
                                calendars={1}
                            />
                        </Collapse>
                    </div>
                </div>

                {isFetching && chartDayData.length === 0 &&
                    <Lottie options={defaultOptions} height={400} width={400} />}
                {!isFetching && !didInvalidate && !this.state.ready &&
                    <Lottie options={defaultOptions} height={400} width={400} />}
                {!isFetching && !didInvalidate && this.state.ready &&
                    <div>
                        <h3 style={{ marginLeft: '40px' }}>Customer Daily Chart</h3>
                        <LineChart width={500} height={300} data={chartDayData}
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
        items: chartDayData
        } = postsBySuburl['chartDayData'] || {
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
        chartDayData,
        sensors,
    }
}

export default connect(mapStateToProps)(DayChart)