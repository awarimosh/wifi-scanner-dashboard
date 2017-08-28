import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props

    const pickerStyle = {
      'alignSelf': 'center'
    };
    return (
      <div style={pickerStyle}>
        <label>Select Sensor </label>
        <select onChange={e => onChange(e.target.value)} value={value}>
          {options.map(option => (
            <option value={option.ID} key={option.ID}>
              {option.Name}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onChange: PropTypes.func.isRequired
}