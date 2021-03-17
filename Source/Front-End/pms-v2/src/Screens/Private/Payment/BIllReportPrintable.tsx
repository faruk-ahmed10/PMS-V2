import React from 'react';
import BillReport from './BillReport';

class BillReportPrintable extends React.Component<any, any> {
    componentDidMount() {
        // window.print();
    }
    render(): any {
        return (
            <BillReport />
        )
    }
}

export default BillReportPrintable;