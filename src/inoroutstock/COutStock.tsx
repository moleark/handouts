import { BoxId } from 'tonva';
import { Context } from 'tonva';
//import { CPaperDocMgtApp } from 'CPaperDocMgtApp';
import { VOutStock } from './VOutStock';
import { CStockList } from './CStockList';
import { CUqBase } from '../CBase';

export class COutStock extends CUqBase {

    fromOrderCreation: boolean;
    id: number;
    description: string;

    documentNames: any[] = [];
    documentNameolds: any[] = [];

    async internalStart(fromOrderCreation: boolean) {

        this.fromOrderCreation = fromOrderCreation;
        this.documentNames = await this.uqs.宣传资料管理.Document.search("",0,100);
        this.openVPage(VOutStock);
        if (!this.documentNames || this.documentNames.length === 0) {
            this.onNewOutstock(undefined);
        }
    }

        /**
     * 打开出库界面
     */
    onNewOutstock = async (document:any) => {
        this.openVPage(VOutStock, document);
    }

    onDocumentNameSelected = (documentName: BoxId) => {
        if (this.fromOrderCreation) {
            this.backPage();
            this.returnCall(documentName);
        }
    }

    async saveOutStock(documentNameData: any,instockData: any) {
        //完结任务--后台数据
        let { id } = documentNameData;
        let param = {
            documentid: id,
            stockLocationid:instockData.stockLocation.id,
            quantity: instockData.quantity,
            oitype: 0
        };

        await this.uqs.宣传资料管理.DocumentOutStock.submit(param);
        //this.closePage(3);
    }

    pickDocumentInStock = async (context: Context, name: string, value: number): Promise<number> => {
        let cDocument = this.newC(CStockList);
        return await cDocument.call<number>();
    }
}
