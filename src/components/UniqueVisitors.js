import React, { Component } from 'react';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import {
    fetchUniqueVisitorsIfNeeded,
    fetchSensorsIfNeeded,
    invalidateSuburl
} from '../actions'
import WeekPicker from './WeekPicker'
import VisitorRow from './VisitorRow'

import moment from 'moment';
const now = moment();
const format = 'YYYY-Wo';

class UniqueVisitors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensorIDs: "",
            week: parseInt(now && (now.format(format)).substr(5, 6), 10),
            year: parseInt(now && (now.format(format)).substr(0, 4), 10),
            dateChanged: true
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchSensorsIfNeeded('sensors'));
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
            dispatch(fetchUniqueVisitorsIfNeeded('uniqueVisitors', values));
        }
    }

    componentDidUpdate(nextProps) {
        const { dispatch } = this.props;
        var values;
        if (this.props.sensors !== nextProps && this.props.sensors.length > 0 && this.props.uniqueVisitors.length === 0 && nextProps.sensors.length === 0 && this.state.dateChanged) {
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
                dateChanged: false
            });
            dispatch(fetchUniqueVisitorsIfNeeded('uniqueVisitors', values));
        }
        else if (this.state.dateChanged && this.props.sensors.length > 0) {
            values = {
                sensors: this.state.sensorIDs,
                week: this.state.week,
                year: this.state.year
            }
            this.setState({
                dateChanged: false
            });
            dispatch(invalidateSuburl('uniqueVisitors'));
            dispatch(fetchUniqueVisitorsIfNeeded('uniqueVisitors', values));
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
        dispatch(fetchUniqueVisitorsIfNeeded('uniqueVisitors', values))
    }

    render() {
        const { isFetching, uniqueVisitors } = this.props
        const style1 = {
            padding: '20px',
            alignSelf: 'center',
            textAlign: 'center'
        }
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
                        {this.state.week - 1}
                    </div>
                    <div className="md-cell--2" style={style1}>
                        next week
                    <br />
                        <br />
                        {this.state.week + 1}
                    </div>
                </div>
                <div style={{
                    fontSize: 'large',
                    padding: '10px'
                }}>
                    Visitors
                </div>

                <div style={{
                    margin: '10px'
                }}>

                    {isFetching && uniqueVisitors.length === 0 && <h2>Loading...</h2>}
                    {!isFetching &&
                        <VisitorRow visitors={uniqueVisitors} isFetching={isFetching} />}
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
        items: uniqueVisitors
        } = postsBySuburl['uniqueVisitors'] || {
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
        uniqueVisitors,
        sensors,
    }
}

export default connect(mapStateToProps)(UniqueVisitors)