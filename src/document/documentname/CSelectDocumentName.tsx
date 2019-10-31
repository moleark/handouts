import { BoxId } from 'tonva';
import { Context } from 'tonva';
import { CUqBase } from 'CBase';
//import { CPaperDocMgtApp } from 'CPaperDocMgtApp';
import { VDocumentNameList } from './VDocumentNameList';
import { VDocumentName } from './VDocumentName';
import { CDomain } from './CDomain';
import { CDocument } from './CDocument';

export abstract class CSelectDocumentName extends CUqBase {

    fromOrderCreation: boolean;
    id: number;
    description: string;

    documentNames: any[] = [];
    documentNameolds: any[] = [];


    async internalStart(fromOrderCreation: boolean) {

        this.fromOrderCreation = fromOrderCreation;
        this.documentNames = await this.uqs.宣传资料管理.Document.search("",0,100);
        this.openVPage(VDocumentNameList);
        if (!this.documentNames || this.documentNames.length === 0) {
            this.onNewDocumentName();
        }
    }

        /**
     * 打开新建界面
     */
    onNewDocumentName = async () => {
        this.openVPage(VDocumentName, { description: undefined });
    }

    onDocumentNameSelected = (documentName: BoxId) => {
        if (this.fromOrderCreation) {
            this.backPage();
            this.returnCall(documentName);
        }
    }

    protected abstract async getIsDefault(userSetting: any, userContactId: number): Promise<boolean>;

    /**
     * 打开编辑界面
     */
    onEditDocumentName = async (documentName: any) => {
        //let documentNameId = documentName.id;
        //let documentNameView = await this.uqs.宣传资料管理.Document.load(documentNameId);
        //let documentTypeData: any = { description: documentNameView };
        this.openVPage(VDocumentName, documentName);
    }

    saveDomainName = async (documentName: any) => {
        if (documentName.id === undefined) {
            let newDocumentName = await this.uqs.宣传资料管理.Document.save(undefined, documentName);
            let { id: newDocumentNameId } = newDocumentName;
            let documentBox = {
                documentType: this.uqs.宣传资料管理.Document.boxId(newDocumentNameId),
            }
        }else{
            this.documentNameolds  = await this.uqs.宣传资料管理.Document.load(documentName.id);
            await this.uqs.宣传资料管理.Document.save(documentName.id, documentName);
        }

        let cDocumentNameList = this.newC(CSelectShippingDocumentName);
        await cDocumentNameList.start();
    }

    delContact = async (domainType: any) => {
        // 真正的调用数据库操作
    }

    pickDomainType = async (context: Context, name: string, value: number): Promise<number> => {
        let cDomain = this.newC(CDomain);
        return await cDomain.call<number>();
    }

    pickDocumentType = async (context: Context, name: string, value: number): Promise<number> => {
        let cDocument = this.newC(CDocument);
        return await cDocument.call<number>();
    }
}

export class CSelectShippingDocumentName extends CSelectDocumentName {
    protected async getIsDefault(userSetting: any, userContactId: number): Promise<boolean> {
        let { shippingDocumentName } = userSetting;
        return shippingDocumentName && shippingDocumentName.id === userContactId;
    }

}