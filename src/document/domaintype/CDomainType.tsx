import { CUqBase } from 'CBase';
import { VDomainType } from './VDomainType';
//import { CPaperDocMgtApp } from 'CPaperDocMgtApp';
//import { Tuid } from 'tonva';

export class CDomainType extends CUqBase {

    async internalStart() {
        this.openVPage(VDomainType, undefined);
    }

    async saveDomainType(domain: any) {
        let {domainType} = domain;
        let newDomainType = await this.uqs.宣传资料管理.DomainType.save(undefined, domainType);
        let { id: newDomainTypeId } = newDomainType;
        let domainBox = {
            domainType: this.uqs.宣传资料管理.DomainType.boxId(newDomainTypeId),
        }
        this.backPage();
        this.returnCall(domainBox);
    }
}