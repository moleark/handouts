import * as React from 'react';
import { VPage, Page, Image } from 'tonva';
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
        return <LMR right={right} left={<Image className="w-3c h-3c mr-3 img-thumbnail" src={documentName.image} />} className="px-3 py-2">
            <div onClick={() => onDocumentNameSelected(documentName)}>

                <div className="flex-grow-1 small">
                    <b>{tv(documentName, v => <>{v.name}</>)}</b>
                </div>
                <div className="flex-grow-1 small">
                    {tv(documentName, v => <>{v.code}</>)}
                </div>
                <div className="text-muted small">
                    {tv(documentName.domain, v => <>{v.description}</>)}&nbsp;<i className="fa fa-long-arrow-right fa-1x"></i>
                    {tv(documentName.documenttype, v => <>{v.description}</>)}
                </div>
            </div>
        </LMR>
    }

    private page = () => {

        let { onNewDocumentName, documentNames } = this.controller;
        let footer =
            <div onClick={() => onNewDocumentName()} >
                <span className="fa-stack">
                    <i className="fa fa-square fa-stack-2x text-primary"></i>
                    <i className="fa fa-plus fa-stack-1x"></i>
                </span>
            </div>;
        let documentNameList = <List items={documentNames} item={{ render: this.onContactRender }} none="无分类" />;
        return <Page right={footer} header="资料管理">
            {documentNameList}
        </Page>
    }
}