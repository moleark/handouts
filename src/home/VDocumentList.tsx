import * as React from 'react';
import { Page, View } from 'tonva';
import { observer } from 'mobx-react';
import { CDocumentList } from './CDocumentList';
//import { observable } from 'mobx';

export class VDocumentList extends View<CDocumentList> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    render(param: any): JSX.Element {
        return <this.content />
    }

    private page = observer(() => {
        return <Page header={false}>
            <this.content />
        </Page>;
    })

    private content = observer(() => {
        let siteHeader = this.controller.renderSiteHeader();
        return <>
            {siteHeader}
            {this.controller.renderCategoryRootList()}
        </>
    });
}