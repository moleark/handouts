import * as React from 'react';
import { Prop, Page,VPage, IconText, PropGrid } from 'tonva';
import { CHome } from './CHome';

export class VHome extends VPage<CHome> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    private openDomainTypeList = async () => {
        this.controller.openDomainTypeList();
    }

    private openDocumentTypeList = async () => {
        this.controller.openDocumentTypeList();
    }

    private openStockLocationList = async () => {
        this.controller.openStockLocationList();
    }

    private openDocumentList = async () => {
        this.controller.openDocumentList();
    }

    private page = () => {

        let rows: Prop[];

        rows = [
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="flask" text="领域分类" />,
                onClick: this.openDomainTypeList
            },
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="navicon" text="资料类型" />,
                onClick: this.openDocumentTypeList
            },
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="institution" text="库存地点" />,
                onClick: this.openStockLocationList
            },
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="sticky-note" text="资料管理" />,
                onClick: this.openDocumentList
            },
        ]
        let header = this.controller.renderSearchHeader();
        let none = <div className="my-3 mx-2 text-warning">抱歉，未找到相关文档，请重新搜索！</div>
        let right = 
                <div onClick={() => this.controller.start()}>
                    <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x text-primary"></i>
                        <i className="fa fa-cog fa-stack-1x text-white"></i>
                    </span>
                </div>;
        return <Page header={header} right={right}>
             <PropGrid rows={rows} values={{}} />
        </Page>
    }
}

