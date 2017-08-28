import React, { Component } from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import Subheader from 'react-md/lib/Subheaders';
import { connect } from 'react-redux'
import {
    invalidateSuburl,
    fetchMacsIfNeeded
} from '../actions'
import Picker from './Picker'

class MacFilterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensorID: '2844',
            endDate: Date.now() / 1000 + 86400 + 86400,
            startDate: new Date().setHours(0, 0, 0, 0) / 1000 - 86400
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleChange(input) {
        this.setState({
            sensorID: input
        });
        var values = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            sensorID: input
        }
        this.props.dispatch(fetchMacsIfNeeded('macs', values))
    }

    handleDateChange(input) {
        input = Date.parse(input) / 1000
        if (input > this.state.endDate) {
            alert("date must be today or less");
        }
        else {
            this.setState({ startDate: input - 86400 })
            this.setState({ endDate: input + 86400 + 86400 })
            var values = {
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                sensorID: this.state.sensorID
            }
            this.props.dispatch(fetchMacsIfNeeded('macs', values))
        }
    }

    handleRefreshClick(e) {
        e.preventDefault()
        const { dispatch, selectedSuburl } = this.props
        dispatch(invalidateSuburl(selectedSuburl))
        dispatch(fetchMacsIfNeeded(selectedSuburl, this.props))
    }

    render() {
        const divStyle = {
            width: '100%'
        };

        const headerStyle = {
            'marginLeft': '50px'
        };
        const today = new Date();
        const { macs } = this.props

        function getPrevious(input, props) {
            var prev = []
            input.forEach(function (element) {
                if (element.timestamp >= props.startDate && element.timestamp <= props.startDate + 86400) {
                    prev.push(element)
                }
            }, this);
            return prev.length;
        }
        function getNext(input, props) {
            var next = []
            input.forEach(function (element) {
                if (element.timestamp >= props.startDate + 86400 + 86400 && element.timestamp <= props.startDate + 86400 + 86400 + 86400) {
                    next.push(element)
                }
            }, this);
            return next.length;
        }
        function getCurrent(input, props) {
            var next = []
            input.forEach(function (element) {
                if (element.timestamp >= props.startDate + 86400 && element.timestamp <= props.startDate + 86400 + 86400) {
                    next.push(element)
                }
            }, this);
            return next.length;
        }
        return (
            <div style={divStyle}>
                <div className="md-grid" style={divStyle}>
                    <DatePicker
                        id="appointment"
                        label="Select a date"
                        className="md-cell md-cell-4 md-cell-left"
                        defaultValue={today}
                        onChange={this.handleDateChange}
                    />
                    <Picker className="md-cell md-cell-4 md-cell-middle"
                        onChange={this.handleChange}
                        options={[{ ID: '2844', Name: "	SureTouch 01" }, { ID: '2845', Name: "SureTouch 02" }, { ID: '2846', Name: "SureTouch 03" }]}
                    />

                </div>

                <div className="md-grid" style={divStyle}>
                    <div className="md-cell md-cell-4">
                        <Subheader primary primaryText="Visitor Per sensor (Previous)" />
                    </div>
                    <div className="md-cell md-cell-4">
                        <Subheader primary primaryText="Visitor Per sensor" />
                    </div>
                    <div className="md-cell md-cell-4">
                        <Subheader primary primaryText="Visitor Per sensor (Next)" />
                    </div>
                    <div className="md-cell md-cell-4">
                        <h3 style={headerStyle}>{getPrevious(macs, this.state)}</h3>
                    </div>
                    <div className="md-cell md-cell-4">
                        <h3 style={headerStyle}>{getCurrent(macs, this.state)}</h3>
                    </div>
                    <div className="md-cell md-cell-4">
                        <h3 style={headerStyle}>{getNext(macs, this.state)}</h3>
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
        items: macs
  } = postsBySuburl['macs'] || {
            isFetching: true,
            items: []
        }
    return {
        selectedSuburl,
        macs,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(MacFilterForm)