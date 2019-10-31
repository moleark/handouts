import { BoxId } from 'tonva';
import { CUqBase } from 'CBase';
//import { Controller, Context, nav } from 'tonva';
//import { CPaperDocMgtApp } from 'CPaperDocMgtApp';
import { VDomainTypeList } from './VDomainTypeList';
import { VDomainType } from './VDomainType';

export abstract class CSelectDomainType extends CUqBase {

    fromOrderCreation: boolean;
    id: number;
    description: string;

    domainTypes: any[] = [];
    domainTypeolds: any[] = [];

    async internalStart(fromOrderCreation: boolean) {

        this.fromOrderCreation = fromOrderCreation;
        this.domainTypes = await this.uqs.宣传资料管理.DomainType.search("",0,100);
        this.openVPage(VDomainTypeList);
        if (!this.domainTypes || this.domainTypes.length === 0) {
            this.onNewDomainType();
        }
    }

        /**
     * 打开新建界面
     */
    onNewDomainType = async () => {
        this.openVPage(VDomainType, { description: undefined });
    }

    onDomainTypeSelected = (domainType: BoxId) => {
        if (this.fromOrderCreation) {
            this.backPage();
            this.returnCall(domainType);
        }
    }

    protected abstract async getIsDefault(userSetting: any, userContactId: number): Promise<boolean>;

    /**
     * 打开编辑界面
     */
    onEditDomainType = async (domainType: any) => {
        //let domainTypeId = domainType.id;
        //let domainTypeView = await this.uqs.宣传资料管理.DomainType.load(domainTypeId);
        //let domainTypeData: any = { description: domainTypeView };
        this.openVPage(VDomainType, domainType);
    }

    saveDomainType = async (domain: any) => {

        if (domain.id === undefined) {
            let newDomainType = await this.uqs.宣传资料管理.DomainType.save(undefined, domain);
            let { id: newDomainTypeId } = newDomainType;
            let domainBox = {
                domainType: this.uqs.宣传资料管理.DomainType.boxId(newDomainTypeId),
            }
        }else{
            this.domainTypeolds  = await this.uqs.宣传资料管理.DomainType.load(domain.id);
            await this.uqs.宣传资料管理.DomainType.save(domain.id, domain);
        }

        let cDomainTypeList = this.newC(CSelectShippingDomainType);
        await cDomainTypeList.start();
    }

    delContact = async (domainType: any) => {
        // 真正的调用数据库操作
    }
}

export class CSelectShippingDomainType extends CSelectDomainType {
    protected async getIsDefault(userSetting: any, userContactId: number): Promise<boolean> {
        let { shippingDomainType } = userSetting;
        return shippingDomainType && shippingDomainType.id === userContactId;
    }

}