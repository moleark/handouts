import * as React from 'react';
import { Tuid } from 'tonva';
import { CUqBase } from '../CBase';
import { VSiteHeader } from './VSiteHeader';
//import { CPaperDocMgtApp } from '../CPaperDocMgtApp';
import { PageItems } from 'tonva';
import { VSearchHeader } from './VSearchHeader';
import { VDocumentList } from './VDocumentList';
//import { VHome } from './VHome';

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

export class CDocumentList extends CUqBase {

    //cApp: CPaperDocMgtApp;
    homeSections: HomeSections;
    sectionTuid: Tuid;

    async internalStart(param: any) {

        let { cDocumentCategory } = this.cApp;
        await cDocumentCategory.start();
        this.openVPage(VDocumentList);
    }

    renderSiteHeader = () => {
        return this.renderView(VSiteHeader);
    }

    renderSearchHeader = (size?: string) => {
        return this.renderView(VSearchHeader, size);
    }

    renderDocumentList = () => {
        return this.renderView(VDocumentList);
    }
        //首页
    renderCategoryRootList = () => {
        let { cDocumentCategory } = this.cApp;
        return cDocumentCategory.renderRootList();
    }

    tab = () => <this.renderDocumentList />;
}