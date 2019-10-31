import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CSelectStockLocation } from './CSelectStockLocation';
import { List, LMR, FA } from 'tonva';

export class VStockLocationList extends VPage<CSelectStockLocation> {

    async open() {

        this.openPage(this.page);
    }

    private onContactRender = (stockLocation: any) => {
        let { description } = stockLocation;
        let { onEditStockLocation, onStockLocationSelected } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info" onClick={() => onEditStockLocation(stockLocation)}>
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-3 py-2">
            <div onClick={() => onStockLocationSelected(description)}>
                {description}
            </div>
        </LMR>
    }

    private page = () => {

        let { onNewStockLocation, StockLocations } = this.controller;
        let footer = <button type="button" className="btn btn-primary w-100" onClick={() => onNewStockLocation()} >添加</button>;
        let StockLocationList = <List items={StockLocations} item={{ render: this.onContactRender }} none="无分类" />;
        return <Page right={footer} header="库存地点">
            {StockLocationList}
        </Page>
    }
}