import 'rc-calendar/assets/index.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

import FontIcon from 'react-md/lib/FontIcons';

const format = 'YYYY-Wo';
const format_week = 'Wo';
const cn = window.location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
    now.locale('zh-cn').utcOffset(8);
} else {
    now.locale('en-gb').utcOffset(0);
}

class WeekPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: now,
            open: false,
            year: parseInt(now && (now.format(format)).substr(0, 4), 10),
            week: parseInt(now && (now.format(format)).substr(5, 6), 10)
        };
        this.onChange = this.onChange.bind(this)
        this.onOpenChange = this.onOpenChange.bind(this);
        this.dateRender = this.dateRender.bind(this);
        this.lastWeek = this.lastWeek.bind(this);
        this.renderSidebar = this.renderSidebar.bind(this);
        this.getWeekDate = this.getWeekDate.bind(this);
    }

    onChange(value) {
        this.setState({
            value: value,
            year: parseInt(value && (value.format(format)).substr(0, 4), 10),
            week: parseInt(value && (value.format(format)).substr(5, 6), 10)
        });
        var data = {
            year: parseInt(value && (value.format(format)).substr(0, 4), 10),
            week: parseInt(value && (value.format(format)).substr(5, 6), 10)
        }
        this.props.sendWeekPickerData(data);
    }

    onOpenChange(open) {
        this.setState({
            open,
        });
    }

    dateRender(current) {
        const selectedValue = this.state.value;
        if (selectedValue && current.year() === selectedValue.year() &&
            current.week() === selectedValue.week()) {
            return (<div className="rc-calendar-selected-day">
                <div className="rc-calendar-date">
                    {current.date()}
                </div>
            </div>);
        }
        return (
            <div className="rc-calendar-date">
                {current.date()}
            </div>);
    }

    lastWeek() {
        const value = this.state.value || now;
        value.add(-1, 'weeks');
        this.setState({
            value,
            open: false,
        });
    }

    renderSidebar() {
        return (
            <div className="week-calendar-sidebar" key="sidebar">
                <button onClick={this.lastWeek} style={{ margin: 20 }}>Last Week</button>
            </div>);
    }

    getWeekDate(value) {
        var year = parseInt((value && value.format(format)).substr(0, 4), 10);
        var weekNo = parseInt((value && value.format(format)).substr(5, 6), 10);
        var d = new Date();
        d.setFullYear(year);
        d.setMonth(0, 1);
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        var yearStart = new Date(d.getFullYear(), 0, 1);
        var weekStart = new Date(yearStart.getTime() + (weekNo - 1) * 7 * 86400000);
        var weekend = new Date(weekStart.getTime() + (86400000 * 7) - 1);
        return weekStart.toDateString() + " - " + weekend.toDateString();
    }

    render() {
        const state = this.state;
        const calendar = (
            <Calendar
                className="week-calendar"
                showWeekNumber
                // renderSidebar={this.renderSidebar}
                dateRender={this.dateRender}
                locale={cn ? zhCN : enUS}
                format={format}
                style={{ zIndex: 1000 }}
                dateInputPlaceholder="please input"
                defaultValue={now}
            // showDateInput
            />);
        return (
            <div style={{
                background: '#FF5722',
                height: '90px',
            }}>
                <div style={{
                    boxSizing: 'border-box',
                    position: 'relative',
                    display: 'block',
                    lineHeight: 1.5,
                    marginBottom: 22,
                }}
                >
                    <DatePicker
                        onOpenChange={this.onOpenChange}
                        open={this.state.open}
                        animation="slide-up"
                        calendar={calendar}
                        value={state.value}
                        onChange={this.onChange}
                    >
                        {
                            ({ value }) => {
                                return (
                                    <div style={{
                                        padding: '10px',
                                        color: 'white'
                                    }}>
                                        <div style={{
                                            fontSize: 'large',
                                            paddingBottom: '10px'
                                        }}>
                                            week : {(value && value.format(format_week)) || 'select'}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 'small'
                                            }}>
                                            {this.getWeekDate(value)}

                                            <FontIcon style={{
                                                float: 'right',
                                                paddingRight : '10px'
                                            }}>{'today'}</FontIcon>
                                        </div>

                                    </div>
                                );
                            }
                        }
                    </DatePicker>
                </div>
            </div >);
    }
}

export default WeekPicker