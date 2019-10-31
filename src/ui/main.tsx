import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CPaperDocMgtApp } from '../CPaperDocMgtApp';

//const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VHome extends VPage<CPaperDocMgtApp> {
    async open(param?: any) {
        this.openPage(this.page);
    }
    private page = () => {

        let { CDocumentList} = this.controller;
        return <Page header={false}>
            {CDocumentList.renderDocumentList()}
        </Page>
    }
    // render = (param?: any): JSX.Element => {
    //     let { CDocumentList } = this.controller;
    //     let faceTabs = [
    //         /*{ name: 'home', label: '库存', icon: 'home', content: cHome.tab},*/
    //         { name: 'doc', label: '', icon: '', content: CDocumentList.tab}
    //     ].map(v => {
    //         let { name, label, icon, content } = v;
    //         return {
    //             name: name,
    //             caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
    //             content: content,
    //         }
    //     });

    //     return <Page header={false}>
    //         {<Tabs tabs={faceTabs} />}
    //     </Page>;
    // }
}
