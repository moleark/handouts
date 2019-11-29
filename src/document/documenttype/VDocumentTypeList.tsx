import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CSelectDocumentType } from './CSelectDocumentType';
import { List, LMR, FA } from 'tonva';

export class VDocumentTypeList extends VPage<CSelectDocumentType> {

    async open() {

        this.openPage(this.page);
    }

    private onContactRender = (documentType: any) => {
        let { description } = documentType;
        let { onEditDocumentType, onDocumentTypeSelected } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info" onClick={() => onEditDocumentType(documentType)}>
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-3 py-2">
            <div onClick={() => onDocumentTypeSelected(description)}>
                {description}
            </div>
        </LMR>
    }

    private page = () => {

        let { onNewDocumentType, documentTypes } = this.controller;
        let footer =
            <div onClick={() => onNewDocumentType()} >
                <span className="fa-stack">
                    <i className="fa fa-square fa-stack-2x text-primary"></i>
                    <i className="fa fa-plus fa-stack-1x"></i>
                </span>
            </div>;
        let documentTypeList = <List items={documentTypes} item={{ render: this.onContactRender }} none="无分类" />;
        return <Page right={footer} header="资料类型">
            {documentTypeList}
        </Page>
    }
}