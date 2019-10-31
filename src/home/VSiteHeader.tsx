import * as React from 'react';
import { View } from 'tonva';
import { LMR } from 'tonva';
import logo from '../images/logo.png';
import { CHome } from './CHome';

export class VSiteHeader extends View<CHome> {
    render() {
        //let currentSalesRegion = <FA name="globe" />
        let cHome = this.controller.cApp.cHome;
        let left = <img className="m-1" src={logo} alt="logo" style={{height: "3rem", width: "3rem"}} />;
        //let cart = this.controller.cApp.cCart.renderCartLabel();
        let right = 
                <div onClick={() => cHome.start()}>
                    <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x text-primary"></i>
                        <i className="fa fa-cog fa-stack-1x text-white"></i>
                    </span>
                </div>;

        return <LMR
            className="mb-3 align-items-center bg-white"
            left={left} right={right}>
            <div className="">
                {this.controller.renderSearchHeader('md')}
            </div>
        </LMR>
        //<div className="h4 px-3 mb-0">百灵威科技</div>
    }
}