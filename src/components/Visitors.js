import React, { Component } from 'react';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import {
    invalidateSuburl,
    fetchVisitorsIfNeeded,
    fetchSensorsIfNeeded
} from '../actions'
import WeekPicker from "./WeekPicker"

import moment from 'moment';
const now = moment();
const format = 'YYYY-Wo';

class Visitors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensors: 2845,
            week: parseInt(now && (now.format(format)).substr(5, 6), 10),
            year: parseInt(now && (now.format(format)).substr(0, 4), 10)
        };
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props
        var values = {
            sensors: 2845,
            week: this.state.week,
            year: this.state.year
        }
        dispatch(fetchVisitorsIfNeeded('visitors', values))
        dispatch(fetchSensorsIfNeeded('sensors'))
    }

    componentWillUnmount() {

    }

    handleRefreshClick(e) {
        e.preventDefault()
        const { dispatch, selectedSuburl } = this.props
        dispatch(invalidateSuburl(selectedSuburl))
        dispatch(fetchVisitorsIfNeeded(selectedSuburl, this.props))
    }

    getWeekPickerData = (data) => {
        this.setState({
            week: data.week,
            year: data.year
        });
        const { dispatch } = this.props
        var values = {
            sensors: '2845,2844',
            week: this.state.week,
            year: this.state.year
        }
        dispatch(fetchVisitorsIfNeeded('visitors', values))
    }

    render() {

        const { isFetching, lastUpdated, visitors } = this.props
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
                <div className="md-grid" style={{
                    background: '#FF7043',
                    margin: '10px'
                }}>
                    <div className="md-cell--2" style={{
                        padding: '20px',
                        alignSelf: 'center',
                        textAlign: 'center'
                    }}>
                        average
                        <br />
                        (per sensor)
                    </div>
                    <div className="md-cell--2" style={style1}>
                        {!isFetching &&
                            <div>
                                {visitors.thisweek[0].visitors}
                            </div>}
                    </div>
                    <div className="md-cell--1" style={style1}>

                    </div>
                    <div className="md-cell--2" style={style1}>
                        {!isFetching &&
                            <div>
                                {visitors.lastweek[0].visitors}
                            </div>}
                    </div>
                    <div className="md-cell--2" style={style1}>
                        {!isFetching &&
                            <div>
                                {visitors.nextweek[0].visitors}
                            </div>}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { selectedSuburl, postsBySuburl } = state
    const {
    isFetching,
        lastUpdated,
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
        selectedSuburl,
        visitors,
        isFetching,
        lastUpdated,
        sensors,
    }
}

export default connect(mapStateToProps)(Visitors)