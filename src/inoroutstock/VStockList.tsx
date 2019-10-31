import * as React from 'react';
import { VPage, Page } from 'tonva';
//import { tv } from 'tonva';
import { FA } from 'tonva';
import { CStockList } from './CStockList';

export class VStockList extends VPage<CStockList> {
    private backLevel = 0;

    async open(param: any) {
        let stockLocations = await this.controller.getStockLocations();
        this.openPage(this.page, { items: stockLocations });
    }

    private page = (stockLocations: any) => {
        this.backLevel++;
        return <Page header="选择库存地点">
            <div className="row no-gutters">
                {stockLocations.items.map((v: any) => this.renderStockT(v, this.onStockLocationClick))}
            </div>
        </Page>
    }

    private renderStockT = (stock: any, onClick: any) => {
        let { id, description } = stock;
        return <div key={id} className="col-6 col-md-4 col-lg-3 cursor-pointer" >
            <div className="pt-1 pb-1 px-2" onClick={() => onClick(stock)}
                style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
            >
                <span className="ml-1 align-middle">
                    <FA name="chevron-right" className="text-info small" />
                    &nbsp; {description}
                </span>
            </div>
        </div>;
    }

    private onStockLocationClick = async (item: any) => {
        this.controller.getStockLocationBox(item.id);  
        this.closePage(this.backLevel);
    }
}
