import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CDocumentStock } from './CDocumentStock';
import { List } from 'tonva';
import { ProductImage } from 'tools/productImage';
//import { async } from 'q';
//import { cCartApp } from 'ui/CCartApp';


export class VDocumentStockList extends VPage<CDocumentStock> {
    private searchKey: string;
    async open(param: any) {
        this.searchKey = param;
        this.openPage(this.page);
    }

    private onScrollBottom = async () => {

        await this.controller.pageProducts.more();
    }

    productPropItem(caption: string, value: any) {
        if (value === null || value === undefined) return null;
        return <>
            <div className="col-4 col-sm-2 col-lg-4 text-muted pr-0 small">{caption}</div>
            <div className="col-8 col-sm-4 col-lg-8">{value}</div>
        </>;
    }

    renderProduct= (product: any, index: number)=> {
        let { name, code, image} = product; 
        //this.controller.getDocumentBook(product);
        let plus = <button type="button" style={{border: 0,background: 'none'}} onClick={() =>this.controller.onNewInstock(product)} ><span className="fa fa-plus-circle fa-lg text-danger" ></span></button>;
        let minus = <button type="button" style={{border: 0,background: 'none'}} onClick={() =>this.controller.onNewOutstock(product)}><span className="fa fa-minus-circle fa-lg text-danger-2" ></span></button>;  
        return <div className="d-block mb-4 px-2">
            <div className="py-2">
                <div className="px-1 text-muted small" ><strong>{name}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{code}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    
                {plus}
                &nbsp;&nbsp;
                {minus}
                </div>
            </div>
            <div className="row" onClick={() => this.controller.showDocumentHistory(product)}>
                <div className="col-3">
                <ProductImage chemicalId={image} className="w-100" />
                </div>
                <div className="col-9">
                    <div className="row">
                    {this.controller.renderInventory(product)}
                    </div>
                </div>
            </div>
        </div>
    }

    private page = () => {

        let {pageProducts, cApp } = this.controller;
        let header = cApp.cHome.renderSearchHeader();
        let none = <div className="my-3 mx-2 text-warning">抱歉，未找到相关文档，请重新搜索！</div>
        let right = 
                <div onClick={() => cApp.cHome.start()}>
                    <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x text-primary"></i>
                        <i className="fa fa-cog fa-stack-1x text-white"></i>
                    </span>
                </div>;

        return <Page header={header} right={right} onScrollBottom={this.onScrollBottom}>
            <div className="bg-white p-2 mb-1">搜索条件: <strong>{this.searchKey}</strong></div>           
            <List before={''} none={none} items={pageProducts} item={{ render:this.renderProduct}} />
        </Page>
    }
}