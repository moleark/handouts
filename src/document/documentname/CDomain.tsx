//import * as React from 'react';
//import { Controller } from 'tonva';
import { CUqBase } from 'CBase';
//import { CPaperDocMgtApp } from 'CPaperDocMgtApp';
//import { Query, Tuid } from 'tonva';
import { VDomain } from './VDomain';

export class CDomain extends CUqBase {

    protected async internalStart() {
        this.openVPage(VDomain);
    }

    getDomainTypes = async (): Promise<any[]> => {
        return await this.uqs.宣传资料管理.DomainType.search("",0,100);
    }
    getDomainTypeBox = async (domainTypeTuid: number): Promise<any> => {
        this.returnCall(this.uqs.宣传资料管理.DomainType.boxId(domainTypeTuid));
    }
}
