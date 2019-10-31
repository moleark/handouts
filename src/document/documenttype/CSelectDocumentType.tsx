import { BoxId } from 'tonva';
//import { Controller, Context, nav } from 'tonva';
//import { CPaperDocMgtApp } from 'CPaperDocMgtApp';
import { CUqBase } from 'CBase';
import { VDocumentTypeList } from './VDocumentTypeList';
import { VDocumentType } from './VDocumentType';

export abstract class CSelectDocumentType extends CUqBase {

    fromOrderCreation: boolean;
    id: number;
    description: string;

    documentTypes: any[] = [];
    documentTypeolds: any[] = [];

    async internalStart(fromOrderCreation: boolean) {

        this.fromOrderCreation = fromOrderCreation;
        this.documentTypes = await this.uqs.宣传资料管理.DocumentType.search("",0,100);
        this.openVPage(VDocumentTypeList);
        if (!this.documentTypes || this.documentTypes.length === 0) {
            this.onNewDocumentType();
        }
    }

        /**
     * 打开新建界面
     */
    onNewDocumentType = async () => {
        this.openVPage(VDocumentType, { description: undefined });
    }

    onDocumentTypeSelected = (documentType: BoxId) => {
        if (this.fromOrderCreation) {
            this.backPage();
            this.returnCall(documentType);
        }
    }

    protected abstract async getIsDefault(userSetting: any, userContactId: number): Promise<boolean>;

    /**
     * 打开编辑界面
     */
    onEditDocumentType = async (documentType: any) => {
        //let documentTypeId = documentType.id;
        //let documentTypeView = await this.uqs.宣传资料管理.DocumentType.load(documentTypeId);
        //let documentTypeData: any = { description: documentTypeView };
        this.openVPage(VDocumentType, documentType);
    }

    saveDomainType = async (document: any) => {
        if (document.id === undefined) {
            let newDocumentType = await this.uqs.宣传资料管理.DocumentType.save(undefined, document);
            let { id: newDocumentTypeId } = newDocumentType;
            //let documentBox = {
                //documentType: this.uqs.宣传资料管理.DocumentType.boxId(newDocumentTypeId),
            //}
        }else{
            this.documentTypeolds  = await this.uqs.宣传资料管理.DocumentType.load(document.id);
            await this.uqs.宣传资料管理.DocumentType.save(document.id, document);
        }

        let cDocumentTypeList = this.newC(CSelectShippingDocumentType);
        await cDocumentTypeList.start();
    }

    delContact = async (domainType: any) => {
        // 真正的调用数据库操作
    }
}

export class CSelectShippingDocumentType extends CSelectDocumentType {
    protected async getIsDefault(userSetting: any, userContactId: number): Promise<boolean> {
        let { shippingDocumentType } = userSetting;
        return shippingDocumentType && shippingDocumentType.id === userContactId;
    }

}