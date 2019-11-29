import * as React from 'react';
import { VPage, Page } from 'tonva';
import { CSelectDomainType } from './CSelectDomainType';
import { List, LMR, FA } from 'tonva';

export class VDomainTypeList extends VPage<CSelectDomainType> {

    async open() {

        this.openPage(this.page);
    }

    private onContactRender = (domainType: any) => {
        let { description } = domainType;
        let { onEditDomainType, onDomainTypeSelected } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info" onClick={() => onEditDomainType(domainType)}>
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-3 py-2">
            <div onClick={() => onDomainTypeSelected(description)}>
                {description}
            </div>
        </LMR>
    }

    private page = () => {

        let { onNewDomainType, domainTypes } = this.controller;
        let footer =
            <div onClick={() => onNewDomainType()} >
                <span className="fa-stack">
                    <i className="fa fa-square fa-stack-2x text-primary"></i>
                    <i className="fa fa-plus fa-stack-1x"></i>
                </span>
            </div>;
        let domainTypeList = <List items={domainTypes} item={{ render: this.onContactRender }} none="无分类" />;
        return <Page right={footer} header="领域分类">
            {domainTypeList}
        </Page>
    }
}