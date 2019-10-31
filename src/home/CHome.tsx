import * as React from 'react';
import { Tuid } from 'tonva';
import { CUqBase } from '../CBase';
//import { CPaperDocMgtApp } from '../CPaperDocMgtApp';
import { PageItems } from 'tonva';
import { VHome } from './VHome';
import { CSelectShippingDomainType } from '../document/domaintype/CSelectDomainType';
import { CSelectShippingDocumentType } from '../document/documenttype/CSelectDocumentType';
import { CSelectShippingStockLocation } from '../document/stockLocation/CSelectStockLocation';
import { CSelectShippingDocumentName } from '../document/documentname/CSelectDocumentName';
import { VSearchHeader } from './VSearchHeader';

class HomeSections extends PageItems<any> {

    private sectionTuid: Tuid;

    constructor(sectionTuid: Tuid) {
        super();
        this.firstSize = this.pageSize = 13;
        this.sectionTuid = sectionTuid;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.sectionTuid.search("", pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        if (item === undefined) return 0;
        return item.id;
    }
}

export class CHome extends CUqBase {

    homeSections: HomeSections;
    sectionTuid: Tuid;

    async internalStart(param: any) {
        this.openVPage(VHome);
    }

    //领域分类
    openDomainTypeList = async () => {
        let cDomainTypeList = this.newC(CSelectShippingDomainType);
        await cDomainTypeList.start();
    }

     //资料类型
    openDocumentTypeList = async () => {
        let cDocumentTypeList = this.newC(CSelectShippingDocumentType);
        await cDocumentTypeList.start();
    }   

    //库存地点
    openStockLocationList = async () => {
        let cStockLocationList = this.newC(CSelectShippingStockLocation);
        await cStockLocationList.start();
    } 

    //资料管理
    openDocumentList = async () => {
        let cDocumentList = this.newC(CSelectShippingDocumentName);
        await cDocumentList.start();
    } 

    renderHome = () => {
        return this.renderView(VHome);
    }

    tab = () => <this.renderHome />;
    
    openVHome = async () => {
        this.openVPage(VHome);
    }
    renderSearchHeader = (size?: string) => {
        return this.renderView(VSearchHeader, size);
    }
}