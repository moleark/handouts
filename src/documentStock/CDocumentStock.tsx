import * as React from 'react';
//import * as _ from 'lodash';
import { CUqBase } from '../CBase';
import { Query, tv, View, BoxId } from 'tonva';
import { PageItems } from 'tonva';
//import { CPaperDocMgtApp } from '../CPaperDocMgtApp';
import { VDocumentStockList } from './VDocumentStockList';
import { VDocumentHistory } from 'inoroutstock/VDocumentHistory';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

class PageProducts extends PageItems<any> {

    private searchProductQuery: Query;

    constructor(searchProductQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
        this.searchProductQuery = searchProductQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchProductQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

/**
 *
 */
export class CDocumentStock extends CUqBase {

    pageProducts: PageProducts;
    @observable inventoryContainer: { [documentid: number]: any[] } = {};

    protected async internalStart(param: any) {
        this.searchByKey(param);
    }

    searchByKey(key: string) {
        //let { cUqHandouts } = this.cApp;
        //let searchProductQuery = cUqHandouts.query("SearchPaperDocByKey");
        //this.pageProducts = new PageProducts(searchProductQuery);
        this.pageProducts = new PageProducts(this.uqs.宣传资料管理.SearchPaperDocByKey);
        this.pageProducts.first({ name: key });
        this.openVPage(VDocumentStockList, key);
    }

    searchByCategory(documenttype: any, domain: any) {
        //let { cUqHandouts } = this.cApp;
        //let searchProductQuery = cUqHandouts.query("SearchPaperDoc");
        //this.pageProducts = new PageProducts(searchProductQuery);
        this.pageProducts = new PageProducts(this.uqs.宣传资料管理.SearchPaperDoc);
        this.pageProducts.first({ domain: domain.id, documenttype: documenttype.id });
        this.openVPage(VDocumentStockList, documenttype.description);
    }

    onNewInstock(document: any) {
        let { cInStock } = this.cApp;
        cInStock.onNewInstock(document);
    }

    onNewOutstock(document: any) {
        let { cOutStock } = this.cApp;

        cOutStock.onNewOutstock(document);
    }

    //显示资料出入库记录
    showDocumentHistory = async (document: any) => {
        //let { cUqHandouts } =  this.cApp;
        //this.querySearchDocumentHistory = cUqHandouts.query("SearchDocumentHistory");
        let documents = await this.uqs.宣传资料管理.SearchDocumentHistory.table({ document: document });
        this.openVPage(VDocumentHistory, documents);
    }

    getDocumentBook = async (documentid: number) => {
        //let { cUqHandouts } = this.cApp;
        //this.querygetDocumentBook = cUqHandouts.query("GetDocumentBook");   
        //if (this.inventoryContainer[documentid] === undefined)
        this.inventoryContainer[documentid] = await this.uqs.宣传资料管理.GetDocumentBook.table({ document: documentid });
    }
    renderInventory = (product: BoxId) => {

        return this.renderView(VInventoryView, product);
    }
}


export class VInventoryView extends View<CDocumentStock> {
    render(param: any): JSX.Element {
        let { id: documentid } = param;
        let { controller } = this;
        controller.getDocumentBook(documentid);
        return <this.content documentid={documentid} />
        //return <div>{param.id}</div>
    }

    protected content = observer((param: any) => {
        let documentLocationUI;
        let LocationUI;
        let { documentid } = param;
        let { inventoryContainer } = this.controller;
        let inventory = inventoryContainer[documentid];
        let allquantity = 0;
        if (inventory && inventory.length > 0) {
            documentLocationUI = inventory.map((v, index) => {
                let { quantity, stockLocation } = v;
                allquantity += quantity;
                return <div key={index} className="text-success small">
                    {tv(stockLocation, (values: any) => <>{values.description}</>)}: {quantity}
                </div>
            });
            LocationUI =
                <div className="text-danger small">
                    总库存: {allquantity}
                    {documentLocationUI}
                </div>
        } else {
            LocationUI = <div className="text-success small">暂无库存</div>;
        }
        return LocationUI;
    })
}