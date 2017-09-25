import React, { Component } from 'react'
import MacFilterForm from './MacFilterForm'

class MacContainer extends Component {
  render() {
    const divStyle = {
      width: '100%'
    };
    return (
      <div className="md-grid">
        <MacFilterForm style={divStyle} />
      </div>
    )
  }
}

export default MacContainer