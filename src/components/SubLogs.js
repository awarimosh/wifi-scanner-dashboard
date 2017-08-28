import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SubLogs extends Component {
    render() {
        return (
            <ul>
                {this.props.sublogs.map((sublog, i) =>
                    <li key={i}>
                        {sublog}
                    </li>
                )}
            </ul>
        )
    }
}

SubLogs.PropTypes = {
    sublogs: PropTypes.array.isRequired
}