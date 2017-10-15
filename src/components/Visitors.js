import React, { Component } from 'react';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import {
    fetchVisitorsIfNeeded,
    fetchSensorsIfNeeded,
    invalidateSuburl
} from '../actions'
import WeekPicker from './WeekPicker'
import DataRow from './DataRow'

import moment from 'moment';
const now = moment();
const format = 'YYYY-Wo';

class Visitors extends Component {
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
            dispatch(fetchVisitorsIfNeeded('visitors', values));
        }
    }

    componentDidUpdate(nextProps) {
        const { dispatch } = this.props
        var values;
        if (this.props.sensors !== nextProps && this.props.sensors.length > 0 && this.props.visitors.length === 0 && nextProps.sensors.length === 0 && this.state.dateChanged) {
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
            dispatch(fetchVisitorsIfNeeded('visitors', values));
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
            dispatch(invalidateSuburl('visitors'));
            dispatch(fetchVisitorsIfNeeded('visitors', values));
        }
        else if (this.props.visitors !== nextProps.visitors) {
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
        dispatch(fetchVisitorsIfNeeded('visitors', values))
    }

    render() {
        const { isFetching, visitors, didInvalidate } = this.props
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
                    Visitors
                </div>

                <div style={{
                    margin: '10px'
                }}>

                    {isFetching && visitors.length === 0 && <h2>Loading...</h2>}
                    {!isFetching && !didInvalidate && !this.state.ready && <h2>Fetching...</h2>}
                    {!isFetching && !didInvalidate && this.state.ready &&
                        <DataRow data={visitors} isFetching={isFetching} />}
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
        items: visitors
        } = postsBySuburl['visitors'] || {
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
        visitors,
        sensors,
    }
}

export default connect(mapStateToProps)(Visitors)