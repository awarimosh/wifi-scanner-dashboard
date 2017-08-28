import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectSuburl,
  fetchMacsIfNeeded
} from '../actions'
import MacFilterForm from './MacFilterForm'
import Mac from './Macs'

class MacContainer extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSuburl } = this.props
    dispatch(fetchMacsIfNeeded(selectedSuburl, this.props.params))
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSuburl !== prevProps.selectedSuburl) {
      const { dispatch, selectedSuburl } = this.props
      dispatch(fetchMacsIfNeeded(selectedSuburl, this.props.params))
    }
  }

  handleChange(nextSuburl) {
    this.props.dispatch(selectSuburl(nextSuburl))
    this.props.dispatch(fetchMacsIfNeeded(nextSuburl, this.props.params))
  }


  render() {
    const { macs } = this.props
    const divStyle = {
      width: '100%'
    };
    return (
      <div className="md-grid">
        <MacFilterForm style={divStyle} />
        <Mac macs={macs}/>
      </div>
    )
  }
}

MacContainer.propTypes = {
  selectedSuburl: PropTypes.string.isRequired,
  macs: PropTypes.array.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedSuburl, postsBySuburl } = state
  const {
    lastUpdated,
    items: macs
  } = postsBySuburl['macs'] || {
      items: []
    }

  return {
    selectedSuburl,
    macs,
    lastUpdated
  }
}

export default connect(mapStateToProps)(MacContainer)