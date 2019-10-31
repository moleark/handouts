import * as React from 'react';
import { VPage, Page,Image } from 'tonva';
import { CSelectDocumentName } from './CSelectDocumentName';
import { List, LMR, FA } from 'tonva';
import { tv } from 'tonva';

export class VDocumentNameList extends VPage<CSelectDocumentName> {

    async open() {

        this.openPage(this.page);
    }

    private onContactRender = (documentName: any) => {

        let { onEditDocumentName, onDocumentNameSelected } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info" onClick={() => onEditDocumentName(documentName)}>
            <FA name="edit" />
        </div>
        return <LMR right={right} left={<Image className="w-3c h-3c mr-3" src={documentName.image} />} className="px-3 py-2">
            <div onClick={() => onDocumentNameSelected(documentName)}>

                <div className="flex-grow-1 small">
                名称与代码：
                <b>
                    {tv(documentName, v => <>{v.name}</>)}
                </b>
                &nbsp; {tv(documentName, v => <>{v.code}</>)} 
                </div>
                <div className="small">
                所属分类：
                &nbsp;&nbsp;&nbsp;
                {tv(documentName.domain, v => <>{v.description}</>)}&nbsp;
                &nbsp; {tv(documentName.documenttype, v => <>{v.description}</>)}
                </div>
            </div>
        </LMR>
    }

    private page = () => {

        let { onNewDocumentName, documentNames } = this.controller;
        let footer = <button type="button" className="btn btn-primary w-100" onClick={() => onNewDocumentName()} >添加</button>;
        let documentNameList = <List items={documentNames} item={{ render: this.onContactRender }} none="无分类" />;
        return <Page right={footer} header="资料管理">
            {documentNameList}
        </Page>
    }
}