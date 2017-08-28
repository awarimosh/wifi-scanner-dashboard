import React, { Component } from 'react'
import './home.css';
import logo from '../wifi-logo.svg';

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className="home-header">
                    <img src={logo} className="home-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="home-intro">
                    Content Coming soon
                </p>
            </div>
        )
    }
}