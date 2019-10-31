import * as React from 'react';
import { VPage, Page } from 'tonva';
//import { tv } from 'tonva';
import { FA } from 'tonva';
import { CDomain } from './CDomain';

export class VDomain extends VPage<CDomain> {
    private backLevel = 0;

    async open(param: any) {
        let domaintypes = await this.controller.getDomainTypes();
        this.openPage(this.page, { items: domaintypes });
    }

    private page = (domaintypes: any) => {
        this.backLevel++;
        return <Page header="选择领域分类">
            <div className="row no-gutters">
                {domaintypes.items.map((v: any) => this.renderDomainT(v, this.onDomaintypeClick))}
            </div>
        </Page>
    }

    private renderDomainT = (domaint: any, onClick: any) => {
        let { id, description } = domaint;
        return <div key={id} className="col-6 col-md-4 col-lg-3 cursor-pointer" >
            <div className="pt-1 pb-1 px-2" onClick={() => onClick(domaint)}
                style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
            >
                <span className="ml-1 align-middle">
                    <FA name="chevron-right" className="text-info small" />
                    &nbsp; {description}
                </span>
            </div>
        </div>;
    }

    private onDomaintypeClick = async (item: any) => {
        this.controller.getDomainTypeBox(item.id);  
        this.closePage(this.backLevel);
    }
}
