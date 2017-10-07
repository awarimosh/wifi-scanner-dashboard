import React, { Component } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import VisitorColumn from './VisitorColumn'

export default class VisitorRow extends Component {
    render() {
        const divStyle1 = {
            display: 'inline-block', width: '65px', marginLeft: 'auto', marginRight: 'auto', whiteSpace: 'normal', textAlign: 'center'
        }
        const { isFetching, visitors } = this.props
        const thisweek = isFetching === true ? [] : visitors.thisweek;
        const lastweek = isFetching === true ? [] : visitors.lastweek;
        const nextweek = isFetching === true ? [] : visitors.nextweek;
        const rows = thisweek.map((_, i) => (
            <TableRow key={i} style={{
            }}>
                <TableColumn >{thisweek[i].sensorID}</TableColumn>
                <div style={{borderLeft: 'medium #C54B03 solid', marginRight: '50px',height: '100px'}} />
                <TableColumn>
                    {thisweek[i].visitors}
                </TableColumn>
                <TableColumn>
                    <VisitorColumn current={thisweek[i].visitors} noncurrent={lastweek[i].visitors} />                    
                </TableColumn>
                <TableColumn>
                    <VisitorColumn current={thisweek[i].visitors} noncurrent={nextweek[i].visitors} />                    
                </TableColumn>
            </TableRow>
        ));

        function getAverage(data) {
            if (data.length > 0) {
                var sum = 0, count = 0;
                data.forEach(function (element) {
                    count += element.visitors
                    sum += 1;
                }, this);
                return Math.round(count / sum);
            }
            return 0;
        }
        return (
            <div>
                <DataTable plain style={{
                    width: '65%'
                }}>
                    <TableHeader>
                        <TableRow>
                            <TableColumn><span style={divStyle1}>Average (per sensor)</span></TableColumn>
                            <div style={{borderLeft: 'medium #C54B03 solid', marginRight: '50px',height: '70px'}} />
                            <TableColumn >{getAverage(thisweek)}</TableColumn>
                            <TableColumn style={{paddingLeft: '50px'}}>{getAverage(lastweek)}</TableColumn>
                            <TableColumn style={{paddingLeft: '50px'}}>{getAverage(nextweek)}</TableColumn>
                        </TableRow>
                    </TableHeader>
                    <div style={{
                        fontSize: 'large',
                        marginTop: '10px'
                    }}>
                        Per sensor
                </div>
                    <TableBody>
                        {rows}
                    </TableBody>
                </DataTable>
            </div>
        );
    }
}