import * as React from 'react';
import { CDocumentCategory } from './CDocumentCategory';
import { VPage, Page } from 'tonva';
import { FA } from 'tonva';
import { tv } from 'tonva';
import { titleTitle, renderThirdCategory} from './VDocumentCategory';

export class VCategory extends VPage<CDocumentCategory> {

    async open(categoryWaper: any) {

        this.openPage(this.page, categoryWaper);
    }

    private renderChild = (childWapper: any) => {

        return <div className="py-2"><FA name="hand-o-right mr-2"></FA>{childWapper.name}</div>
    }

    private categoryClick = async (childWapper: any, parent: any) => {
        await this.controller.openMainPage(childWapper, parent);
    }

    private breadCrumb = (item: any, parent: any) => {
        return <nav arial-babel="breadcrumb">
            <ol className="breadcrumb">
                {tv(item, this.breadCrumbItem)}
            </ol>
        </nav>

    }

    private breadCrumbItem = (values: any, parent: any) => {
        if (values === undefined || values.productCategory === undefined)
            return <></>;
        return <>
            {tv(values.productCategory.parent, this.breadCrumbItem)}
            <li className="breadcrumb-item" onClick={() => this.categoryClick(values, undefined)}>{values.name}</li>
        </>
    }

    private renderRootCategory = (item: any, parent: any) => {
        let { description, children } = item;
        return <div className="bg-white mb-3" key={description}>
            <div className="py-2 px-3 cursor-pointer" onClick={() => this.categoryClick(item, parent)}>
                <b>{description}</b>
            </div>
            <div className=""
                style={{ paddingRight: '1px' }}
            >
                <div className="row no-gutters">
                    {children.map((v: any)  => this.renderSubCategory(v, item))}
                </div>
            </div>
        </div>
    }

    private renderSubCategory = (item: any, parent: any) => {
        let { description, subsub } = item;
        return <div key={description}
            className="col-6 col-md-4 col-lg-3 cursor-pointer"
            //style={{borderRight:'1px solid gray', borderBottom:'1px solid gray'}}
            onClick={() => this.categoryClick(item, parent)}>
            <div className="pt-1 pb-1 px-2"
                style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
            >
                <div style={titleTitle}>
                    <span className="ml-1 align-middle">
                        <FA name="chevron-right" className="text-info small" />
                        &nbsp; {description}
                    </span>
                </div>
                {renderThirdCategory(subsub)}
            </div>
        </div>;
        // <img src={consts.appIcon} alt="structure" style={imgStyle} />
    }

    private page = (categoryWaper: any) => {

        let { cHome } = this.controller.cApp;
        let header = cHome.renderSearchHeader();
        let right = 
                <div onClick={() => cHome.start()}>
                    <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x text-primary"></i>
                        <i className="fa fa-cog fa-stack-1x text-white"></i>
                    </span>
                </div>;
        let { categoryWaper: item, parent } = categoryWaper;

        return <Page header={header} right={right}>
            {this.renderRootCategory(item, parent)}
        </Page>
    }
}