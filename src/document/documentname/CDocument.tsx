//import * as React from 'react';
//import { Controller } from 'tonva';
//import { CPaperDocMgtApp } from 'CPaperDocMgtApp';
//import { Query, Tuid } from 'tonva';
import { VDocument } from './VDocument';
import { CUqBase } from 'CBase';

export class CDocument extends CUqBase {

    protected async internalStart() {
        this.openVPage(VDocument);
    }

    getDocumentTypes = async (): Promise<any[]> => {
        return await this.uqs.宣传资料管理.DocumentType.search("",0,100);
    }
    getDocumentTypeBox = async (documentTypeTuid: number): Promise<any> => {
        this.returnCall(this.uqs.宣传资料管理.DocumentType.boxId(documentTypeTuid));
    }
}
