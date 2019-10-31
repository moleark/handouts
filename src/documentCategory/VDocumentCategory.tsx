import * as React from 'react';
import { View } from 'tonva';
import { CDocumentCategory } from './CDocumentCategory';
import { FA } from 'tonva';

export const titleTitle: React.CSSProperties = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}

export const subStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}

export class VDocumentCategory extends View<CDocumentCategory> {

    private categoryClick = async (categoryWapper: any, parent: any) => {
        await this.controller.openMainPage(categoryWapper, parent);
    }
    private renderRootCategory = (item: any, parent: any) => {
        let { description} = item;
        // return <div className="bg-white mb-3" key={description}>
        //     <div className="py-2 px-3 cursor-pointer" onClick={() => this.categoryClick(item, undefined)}>
        //         <b>{description}</b>
        //     </div>
        //     <div className=""
        //         style={{ paddingRight: '1px' }}
        //     >
        //         <div className="row no-gutters">
        //             {children.map(v => this.renderSubCategory(v, item))}
        //         </div>
        //     </div>
        // </div>
         return <div className="bg-white mb-3" key={description}>
            <div className="py-2 px-3 cursor-pointer" onClick={() => this.categoryClick(item, undefined)}>
                <span className="ml-1 align-middle">
                        <FA name="chevron-circle-right" className="text-info" />
                        &nbsp; {description}
                </span>
            </div>
        </div>
    }

    private renderSubCategory = (item: any, parent: any) => {
        let { description, subsub } = item;
        return <div key={description}
            className="col-6 col-md-4 col-lg-3 cursor-pointer"
            onClick={() => this.categoryClick(item, parent)}>
            <div className="py-3 px-2"
                style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
            >
                <div style={titleTitle}>
                    <span className="ml-1 align-middle">
                        <FA name="chevron-circle-right" className="text-info" />
                        &nbsp; {description}
                    </span>
                </div> 
                {renderThirdCategory(subsub) }

            </div>
        </div>;
        // <img src={consts.appIcon} alt="structure" style={imgStyle} />
    }

    render(param: any): JSX.Element {
        let { domainTypes } = this.controller;
        return <>{domainTypes.map(v => this.renderRootCategory(v, undefined))}</>;
    }
}

export function renderThirdCategory(total: number) {

    return <div className="py-2 px-1 text-muted small" style={subStyle}>
        {<>该类文档数量: {total > 1000 ? '>1000' : total}</>}
    </div>
}