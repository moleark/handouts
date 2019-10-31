//import * as React from 'react';
//import { Query } from 'tonva';
import _ from 'lodash';
import { CUqBase } from 'CBase';
import { observable } from 'mobx';
//import { CPaperDocMgtApp } from 'CPaperDocMgtApp';
import { VDocumentCategory } from './VDocumentCategory';
import { VCategory } from './VCategory';
//import { Controller,Tuid } from 'tonva';

export class CDocumentCategory extends CUqBase {

    @observable domainTypes: any[] = [];
    @observable documentTypes: any[] = [];
    @observable documents: any[] = [];

    async internalStart(param: any) {  
        this.domainTypes = await this.uqs.宣传资料管理.DomainType.search("",0,100);
        this.documentTypes = await this.uqs.宣传资料管理.DocumentType.search("",0,100);
        this.documents = await this.uqs.宣传资料管理.Document.search("",0,100);
        this.domainTypes.forEach(element => {
            this.buildCategories(element, this.documents,this.documentTypes);
        })
    }

    renderRootList = () => {
        return this.renderView(VDocumentCategory);
    };

    private buildCategories(categoryWapper: any, firstCategory: any, secendCategory: any) {
        //secendCategory.forEach(async element => {
            //element.children = firstCategory.filter(v => v.domain.id === categoryWapper.id && v.documenttype.id === element.id).length;
        //});  
        //categoryWapper.children = secendCategory.filter(v => v.id);

        let children:any[] = [];
        let len = firstCategory.length;
        for(let f of secendCategory){
            let dtid = f.id;
            let subsub = 0;
            for(let i=0; i<len; i++){
                let {name, domain,documenttype} = firstCategory[i];
                if (domain.id !== categoryWapper.id || documenttype.id !== dtid) continue; 
                if (name.length > 0) subsub += 1;
            }
            if (subsub > 0) f.subsub = subsub;
            children.push(f);
       }
       let ret = _.clone(categoryWapper);
       ret.children = children; 
       return ret;
    }

    async openMainPage(categoryWaper: any, parent: any) {
        if(parent===undefined){
            let rootCategory=this.buildCategories(categoryWaper, this.documents, this.documentTypes);        
            this.openVPage(VCategory, { categoryWaper: rootCategory, parent });
        }else{
            let { cDocumentStock } = this.cApp;
            cDocumentStock.searchByCategory(categoryWaper, parent);
        }
    }
}