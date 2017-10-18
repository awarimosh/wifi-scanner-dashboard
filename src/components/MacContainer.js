import React, { Component } from 'react'
import MacFilterForm from './MacFilterForm'

class MacContainer extends Component {
  componentDidMount() {
    var validated = localStorage.getItem("validated");
    if  (validated === undefined || validated === null || validated === false)
      this.props.history.push('login');
    else {
      // console.log('validated',validated);
    }
  }
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