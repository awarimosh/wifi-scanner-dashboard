import React, { Component } from 'react';
import FontIcon from 'react-md/lib/FontIcons';

export default class DataColumn extends Component {
    render() {
        const { current, noncurrent } = this.props
        const divStyle1 = {
            display: 'inline-block', width: '65px', marginLeft: 'auto', marginRight: 'auto', whiteSpace: 'normal', textAlign: 'center'
        }
        const downStyle = {
            color: '#FF0000', // $md-pink-300
        };
        const upStyle = {
            color: '#00FF00', // $md-pink-300
        };
        function getPercert(a, b) {
            var dif = b - a;
            if (b === 0)
                return 0
            return Math.round((dif / a) * 100)
        }
        return (
            <div className="md-grid">
                <span className="md-cell--5" style={divStyle1}>
                    {getPercert(current, noncurrent)} %
                    <br />
                    {noncurrent}
                </span>
                {
                    getPercert(current, noncurrent) > 0 &&
                    <FontIcon className="md-cell--5" style={upStyle}>
                        arrow_upward
                    </FontIcon>
                }
                {
                    getPercert(current, noncurrent) < 0 &&
                    <FontIcon className="md-cell--5" style={downStyle}>
                        arrow_downward
                    </FontIcon>
                }
                {
                    getPercert(current, noncurrent) === 0 && <span className="md-cell--5">=</span>
                }

            </div>
        );
    }
}