import React, { Component } from 'react'
import './home.css';
import DayChart from './DayChart'
import Chart from './Chart'

export default class Dashbaord extends Component {
    render() {
        return (
            <div className="home">
                <div className="md-grid">
                    <div className="md-cell--5">
                        <Chart />
                    </div>
                    <div className="md-cell--5">
                        <DayChart />
                    </div>
                </div>
            </div>
        )
    }
}