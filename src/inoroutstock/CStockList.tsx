//import * as React from 'react';
//import { Controller } from 'tonva';
//import { CPaperDocMgtApp } from 'CPaperDocMgtApp';
//import { Query, Tuid } from 'tonva';
import { VStockList } from './VStockList';
import { CUqBase } from '../CBase';

export class CStockList extends CUqBase {

    protected async internalStart() {
        this.openVPage(VStockList);
    }

    getStockLocations = async (): Promise<any[]> => {
        return await this.uqs.宣传资料管理.StockLocation.search("",0,100);
    }
    getStockLocationBox = async (stockLocationTuid: number): Promise<any> => {
        this.returnCall(this.uqs.宣传资料管理.StockLocation.boxId(stockLocationTuid));
    }
}
