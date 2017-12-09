import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  selectSuburl,
  fetchSensorsIfNeeded,
  invalidateSuburl
} from '../actions'
import Sensors from './Sensors'
import SensorForm from './SensorForm'
import MapContainer from './MapContainer'
import createHistory from 'history/createBrowserHistory'

const history = createHistory();

class SensorsList extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSuburl } = this.props;
    dispatch(fetchSensorsIfNeeded(selectedSuburl));
    if (localStorage.getItem("validated") === undefined || localStorage.getItem("validated") === null) {
        history.push('/login');
        window.location.reload();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSuburl !== prevProps.selectedSuburl) {
      const { dispatch, selectedSuburl } = this.props
      dispatch(fetchSensorsIfNeeded(selectedSuburl))
    }
  }

  handleChange(nextSuburl) {
    this.props.dispatch(selectSuburl(nextSuburl))
    this.props.dispatch(fetchSensorsIfNeeded(nextSuburl))
  }

  handleRefreshClick(e) {
    e.preventDefault()
    const { dispatch, selectedSuburl } = this.props
    dispatch(invalidateSuburl(selectedSuburl))
    dispatch(fetchSensorsIfNeeded(selectedSuburl))
  }

  render() {
    const { isFetching, lastUpdated, sensors } = this.props
    const mapstyle = {
      height: '100%',
      width: '100%',
      position: 'relative'
    }
    return (
      <div className="md-grid">
        <div className="md-cell--3">
          <SensorForm />
        </div>
        <div className="md-cell--9">
          <div className="md-grid" style={mapstyle}>
            <MapContainer sensors={sensors} />
          </div>
          <div className="md-grid">
            <div className="md-cell--12">
              {isFetching && sensors.length === 0 && <h2>Loading....</h2>}
              {!isFetching && sensors.length === 0 && <h2>Empty.</h2>}
              {sensors.length > 0 &&
                <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                  <p className="md-cell">
                    {lastUpdated &&
                      <span>
                        Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
                      </span>}
                    {!isFetching &&
                      <a onClick={this.handleRefreshClick}>
                        Refresh
            </a>}
                  </p>
                  <Sensors sensors={sensors} />
                </div>}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedSuburl, postsBySuburl } = state
  const {
    isFetching,
    lastUpdated,
    items: sensors
  } = postsBySuburl['sensors'] || {
      isFetching: true,
      items: []
    }

  return {
    selectedSuburl,
    sensors,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(SensorsList)