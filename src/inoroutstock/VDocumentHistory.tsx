import * as React from 'react';
import { VPage, Page, LMR } from 'tonva';
//import { observer } from 'mobx-react';
import { List, EasyDate } from 'tonva';
import { CDocumentStock } from 'documentStock/CDocumentStock';
import { tv } from 'tonva';
//import _ from 'lodash';

export class VDocumentHistory extends VPage<CDocumentStock> {

    private documents: any;
    async open(documents: any) {
        this.documents = documents;
        this.openPage(this.page);
    }

    private renderHistory = (documenthistory: any, index: number) => {
        let { stockLocation, date, oitype, quantity, document } = documenthistory;
        let left = <div className="mx-3"><EasyDate date={date} /></div>;
        let right = <div>{oitype === 0 ? '-' : '+'} {quantity}</div>;
        return <LMR left={left} right={right} className="p-2 text-muted small">
            {tv(document, (v) => v.name)}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tv(stockLocation, (v) => v.description)}
        </LMR>;

        // <div className="d-block p-3">
        //     <small className="text-muted"><span className="ml-1 align-middle" style={{ paddingRight: '10px' }} >{<EasyDate date={date} />}</span>
        //         <span className="ml-1 align-middle" style={{ paddingRight: '20px' }} >{tv(document, (v) => v.name)}</span>
        //         <span className="ml-1 align-middle" style={{ paddingRight: '10px' }} >{tv(stockLocation, (v) => v.description)} </span>
        //         <span className="ml-1 align-right" style={{ paddingRight: '10px' }} >{oitype === 0 ? '-' : '+'} {quantity}</span>
        //     </small>
        // </div>;
    }

    private page = () => {
        let none = <div className="m-3 text-muted small">目前还没有出入库记录！</div>;
        return <Page header="出入库记录" >
            <List before={''} none={none} items={this.documents} item={{ render: this.renderHistory }} />
        </Page>
    }
}