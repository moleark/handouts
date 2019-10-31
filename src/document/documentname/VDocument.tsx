import * as React from 'react';
import { VPage, Page } from 'tonva';
//import { tv } from 'tonva';
import { FA } from 'tonva';
import { CDocument } from './CDocument';

export class VDocument extends VPage<CDocument> {
    private backLevel = 0;

    async open(param: any) {
        let documenttypes = await this.controller.getDocumentTypes();
        this.openPage(this.page, { items: documenttypes });
    }

    private page = (documenttypes: any) => {
        this.backLevel++;
        return <Page header="选择领域分类">
            <div className="row no-gutters">
                {documenttypes.items.map((v: any) => this.renderDocumentT(v, this.onDocumenttypeClick))}
            </div>
        </Page>
    }

    private renderDocumentT = (documentt: any, onClick: any) => {
        let { id, description } = documentt;
        return <div key={id} className="col-6 col-md-4 col-lg-3 cursor-pointer" >
            <div className="pt-1 pb-1 px-2" onClick={() => onClick(documentt)}
                style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
            >
                <span className="ml-1 align-middle">
                    <FA name="chevron-right" className="text-info small" />
                    &nbsp; {description}
                </span>
            </div>
        </div>;
    }

    private onDocumenttypeClick = async (item: any) => {
        this.controller.getDocumentTypeBox(item.id);  
        this.closePage(this.backLevel);
    }
}
