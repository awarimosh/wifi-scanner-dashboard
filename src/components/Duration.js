import React, { Component } from 'react';
import { connect } from 'react-redux'
import Lottie from 'react-lottie';
// import PropTypes from 'prop-types'
import {
    fetchDurationIfNeeded,
    fetchSensorsIfNeeded,
    invalidateSuburl
} from '../actions'
import WeekPicker from './WeekPicker'
import DataRow from './DataRow'
import * as animationData from '../animations/snap_loader_black.json'

import moment from 'moment';
const now = moment();
const format = 'YYYY-Wo';

class Duration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensorIDs: "",
            week: parseInt(now && (now.format(format)).substr(5, 6), 10),
            year: parseInt(now && (now.format(format)).substr(0, 4), 10),
            dateChanged: true,
            ready: false
        };
    }

    componentDidMount() {
        const { dispatch } = this.props
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
                week: this.state.week,
                year: this.state.year
            }
            dispatch(fetchDurationIfNeeded('duration', values));
        }
    }

    componentDidUpdate(nextProps) {
        const { dispatch } = this.props
        var values;
        if (this.props.sensors !== nextProps && this.props.sensors.length > 0 && this.props.duration.length === 0 && nextProps.sensors.length === 0 && this.state.dateChanged) {
            var sensorIDs = this.props.sensors.map((sensor) => {
                return sensor.ID
            }).toString();
            values = {
                sensors: sensorIDs,
                week: this.state.week,
                year: this.state.year
            }
            this.setState({
                sensorIDs: sensorIDs,
                dateChanged: false,
                ready: true
            });
            dispatch(fetchDurationIfNeeded('duration', values));
        }
        else if (this.state.dateChanged && this.props.sensors.length > 0) {
            values = {
                sensors: this.state.sensorIDs,
                week: this.state.week,
                year: this.state.year
            }
            this.setState({
                dateChanged: false,
                ready: false
            });
            dispatch(invalidateSuburl('duration'));
            dispatch(fetchDurationIfNeeded('duration', values));
        }
        else if (this.props.duration !== nextProps.duration) {
            this.setState({
                ready: true
            });
        }
    }

    getWeekPickerData = (data) => {
        this.setState({
            week: data.week,
            year: data.year,
            dateChanged: true
        });
        const { dispatch } = this.props
        var values = {
            sensors: this.state.sensorIDs,
            week: data.week,
            year: data.year
        }
        dispatch(fetchDurationIfNeeded('duration', values))
    }

    render() {
        const { isFetching, duration, didInvalidate } = this.props
        const style1 = {
            padding: '20px',
            alignSelf: 'center',
            textAlign: 'center'
        }
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
                    <div className="md-cell--4">
                        <WeekPicker sendWeekPickerData={this.getWeekPickerData} onclick="handleChange()" />
                    </div>
                    <div className="md-cell--1" style={style1}>
                        vs
                </div>
                    <div className="md-cell--2" style={style1}>
                        previous week
                    <br />
                        <br />
                        week {this.state.week - 1}
                    </div>
                    <div className="md-cell--2" style={style1}>
                        next week
                    <br />
                        <br />
                        week {this.state.week + 1}
                    </div>
                </div>
                <div style={{
                    fontSize: 'large',
                    padding: '10px'
                }}>
                    Duration
                </div>

                <div style={{
                    margin: '10px'
                }}>
 
                    {isFetching && duration.length === 0 &&
                        <Lottie options={defaultOptions} height={400} width={400} />}
                    {!isFetching && !didInvalidate && !this.state.ready &&
                        <Lottie options={defaultOptions} height={400} width={400} />}
                    {!isFetching && !didInvalidate && this.state.ready &&
                        <DataRow data={duration} isFetching={isFetching} />}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { selectedSuburl, postsBySuburl } = state;

    const {
        didInvalidate,
        isFetching,
        items: duration
        } = postsBySuburl['duration'] || {
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
        duration,
        sensors,
    }
}

export default connect(mapStateToProps)(Duration)