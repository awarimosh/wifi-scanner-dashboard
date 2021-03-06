import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Lottie from 'react-lottie';
import {
  selectSublog,
  fetchLogsIfNeeded,
  invalidateSublog
} from '../actions'
import Logs from './Logs'
import Picker from './Picker'
import * as animationData from '../animations/loading.json'

class LogContainer extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSublog } = this.props;
    dispatch(fetchLogsIfNeeded(selectedSublog));
    if (localStorage.getItem("validated") === undefined || localStorage.getItem("validated") === null)
      this.props.history.push('login');
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSublog !== prevProps.selectedSublog) {
      const { dispatch, selectedSublog } = this.props
      dispatch(fetchLogsIfNeeded(selectedSublog))
    }
  }

  handleChange(nextSublog) {
    this.props.dispatch(selectSublog(nextSublog))
    this.props.dispatch(fetchLogsIfNeeded(nextSublog))
  }

  handleRefreshClick(e) {
    e.preventDefault()
    const { dispatch, selectedSublog } = this.props
    dispatch(invalidateSublog(selectedSublog))
    dispatch(fetchLogsIfNeeded(selectedSublog))
  }

  render() {
    const { isFetching, lastUpdated, logs } = this.props
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    return (
      <div className="md-grid">

        <p className="md-cell">
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>}
          {!isFetching &&
            <a href="refresh" onClick={this.handleRefreshClick}>
              Refresh
            </a>}
        </p>
        <Picker className="md-cell"
          onChange={this.handleChange}
          options={[{ ID: '5', Name: 'Five' }, { ID: '10', Name: 'Ten' }, { ID: '20', Name: 'Twenty' }, { ID: '50', Name: 'Fifty' }]}
        />
        {isFetching && logs.length === 0 &&
          <Lottie options={defaultOptions} height={400} width={400} />}
        {!isFetching && logs.length === 0 &&
          <Lottie options={defaultOptions} height={400} width={400} />}
        {logs.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Logs logs={logs} />
          </div>}
      </div>
    )
  }
}

LogContainer.propTypes = {
  selectedSublog: PropTypes.string.isRequired,
  logs: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedSublog, postsBySublog } = state
  const {
    isFetching,
    lastUpdated,
    items: logs
  } = postsBySublog[selectedSublog] || {
      isFetching: true,
      items: []
    }

  return {
    selectedSublog,
    logs,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(LogContainer)