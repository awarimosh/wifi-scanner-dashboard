import React, { Component } from 'react';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import {
    fetchVisitorsIfNeeded,
    fetchSensorsIfNeeded
} from '../actions'
import WeekPicker from './WeekPicker'
import VisitorRow from './VisitorRow'

import moment from 'moment';
const now = moment();
const format = 'YYYY-Wo';

class Visitors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensorIDs: "",
            week: parseInt(now && (now.format(format)).substr(5, 6), 10),
            year: parseInt(now && (now.format(format)).substr(0, 4), 10)
        };
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchSensorsIfNeeded('sensors'));
    }

    componentWillUnmount() {

    }

    componentDidUpdate(nextProps) {
        if (this.props.sensors !== nextProps && this.props.sensors.length > 0 && this.props.visitors.length === 0 && nextProps.sensors.length === 0) {
            const { dispatch } = this.props
            var sensorIDs = this.props.sensors.map((sensor) => {
                return sensor.ID
            }).toString();
            var values = {
                sensors: sensorIDs,
                week: this.state.week,
                year: this.state.year
            }
            this.setState({
                sensorIDs: sensorIDs
            });
            dispatch(fetchVisitorsIfNeeded('visitors', values));
        }
    }

    getWeekPickerData = (data) => {
        this.setState({
            week: data.week,
            year: data.year
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
        const { isFetching, visitors } = this.props
        const style1 = {
            padding: '20px',
            alignSelf: 'center',
            textAlign: 'center'
        }
        return (
            <div>
                <div className="md-grid">
                    <div className="md-cell--4">
                        <WeekPicker sendWeekPickerData={this.getWeekPickerData} />
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
                    <VisitorRow visitors={visitors} isFetching={isFetching}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { selectedSuburl, postsBySuburl } = state
    const {
        didInvalidate,
        isFetching,
        items: visitors
  } = postsBySuburl['visitors'] || {
            isFetching: true,
            items: []
        }
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