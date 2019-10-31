import { CAppBase, IConstructor, User, nav } from "tonva";
import { UQs } from "./uqs";
import { CUqBase } from "./CBase";
import { CDomainType } from './document/domaintype/CDomainType';
import { CSelectShippingDomainType } from './document/domaintype/CSelectDomainType';
import { CSelectShippingDocumentType } from './document/documenttype/CSelectDocumentType';
import { CSelectShippingStockLocation } from './document/stockLocation/CSelectStockLocation';
import { CHome } from './home/CHome';
import { CDocumentList } from './home/CDocumentList';
import { CDocumentCategory } from './documentCategory/CDocumentCategory';
import { CDocumentStock } from './documentStock/CDocumentStock';
import { CInStock } from './inoroutstock/CInStock';
import { COutStock } from './inoroutstock/COutStock';
import { VHome } from './ui/main';

export class CPaperDocMgtApp extends CAppBase {
    get uqs(): UQs { return this._uqs as UQs };
    topKey: any;

    currentSalesRegion: any;
    currentLanguage: any;

    cDomainType: CDomainType;
    CSelectShippingDomainType: CSelectShippingDomainType;
    CSelectShippingDocumentType: CSelectShippingDocumentType;
    CSelectShippingStockLocation: CSelectShippingStockLocation;
    cHome: CHome;
    CDocumentList: CDocumentList;
    cDocumentCategory: CDocumentCategory;
    cDocumentStock: CDocumentStock;
    cInStock: CInStock;
    cOutStock: COutStock;

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {

        this.cDomainType = this.newC(CDomainType); 
        this.CSelectShippingDomainType = this.newC(CSelectShippingDomainType);
        this.CSelectShippingDocumentType = this.newC(CSelectShippingDocumentType);
        this.CSelectShippingStockLocation =this.newC(CSelectShippingStockLocation);
        this.cHome = this.newC(CHome);
        this.CDocumentList = this.newC(CDocumentList);
        this.cDocumentCategory = this.newC(CDocumentCategory);
        this.cDocumentStock = this.newC(CDocumentStock);
        this.cInStock = this.newC(CInStock);
        this.cOutStock = this.newC(COutStock);

        let promises: PromiseLike<void>[] = [];
        promises.push(this.cDocumentCategory.start());
        await Promise.all(promises);
        this.showMain();
        this.topKey = nav.topKey();
    }

    showMain(initTabName?: string) {
        this.openVPage(VHome, initTabName);
    }
}