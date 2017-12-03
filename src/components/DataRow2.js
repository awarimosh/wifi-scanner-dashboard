import React, { Component } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import DataColumn from './DataColumn'

export default class DataRow2 extends Component {
    render() {
        const divStyle1 = {
            display: 'inline-block', width: '100%', marginLeft: 'auto', marginRight: 'auto', whiteSpace: 'normal'
        }
        const { isFetching, data } = this.props
        const thisweek = isFetching === true ? [] : data.thisweek;
        const lastweek = isFetching === true ? [] : data.lastweek;
        const nextweek = isFetching === true ? [] : data.nextweek;
        const rows = thisweek.map((_, i) => (
            <TableRow key={i} style={{
            }}>
                <TableColumn style={{width : '100%'}} >{thisweek[i].sensorID}</TableColumn>
                <TableColumn >
                    {thisweek[i].data}
                </TableColumn>
                <div style={{borderLeft: 'medium #C54B03 solid', marginRight: '50px',height: '100px'}} />
                <TableColumn>
                    <DataColumn current={thisweek[i].data} noncurrent={lastweek[i].data} />                    
                </TableColumn>
                <TableColumn>
                    <DataColumn current={thisweek[i].data} noncurrent={nextweek[i].data} />                    
                </TableColumn>
            </TableRow>
        ));

        function getAverage(data) {
            if (data.length > 0) {
                var sum = 0, count = 0;
                data.forEach(function (element) {
                    count += element.data
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
                            <TableColumn >{getAverage(thisweek)}</TableColumn>
                            <div style={{borderLeft: 'medium #C54B03 solid', marginRight: '50px',height: '70px'}} />
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