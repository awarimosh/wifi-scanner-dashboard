import React, { Component } from 'react'
import MacFilterForm from './MacFilterForm'
import createHistory from 'history/createBrowserHistory'

const history = createHistory();

class MacContainer extends Component {
  componentDidMount() {
    if (localStorage.getItem("validated") === undefined || localStorage.getItem("validated") === null) {
        history.push('/login');
        window.location.reload();
    }
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