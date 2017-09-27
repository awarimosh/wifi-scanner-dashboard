import React, { Component } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

export default class VisitorRow extends Component {
    render() {
        const { isFetching, visitors } = this.props
        const thisweek = isFetching === true ? [] : visitors.thisweek;
        const lastweek = isFetching === true ? [] : visitors.lastweek;
        const nextweek = isFetching === true ? [] : visitors.nextweek;
        const rows = thisweek.map((_, i) => (
            <TableRow key={i} style={{
            }}>
                <TableColumn>{thisweek[i].sensorID}</TableColumn>
                <TableColumn>{thisweek[i].visitors}</TableColumn>
                <TableColumn>{lastweek[i].visitors}</TableColumn>
                <TableColumn>{nextweek[i].visitors}</TableColumn>
            </TableRow>
        ));

        const divStyle1 = {
            display: 'inline-block', width: '65px', marginLeft: 'auto', marginRight: 'auto', whiteSpace: 'normal', textAlign: 'center'
        }

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
                            <TableColumn>{getAverage(thisweek)}</TableColumn>
                            <TableColumn>{getAverage(lastweek)}</TableColumn>
                            <TableColumn>{getAverage(nextweek)}</TableColumn>
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