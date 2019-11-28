import { BoxId } from 'tonva';
import { Context } from 'tonva';
import { nav } from 'tonva';
import { VInStock } from './VInStock';
import { CStockList } from './CStockList';
import { CUqBase } from '../CBase';

export class CInStock extends CUqBase {

    fromOrderCreation: boolean;
    id: number;
    description: string;

    documentNames: any[] = [];
    documentNameolds: any[] = [];

    async internalStart(fromOrderCreation: boolean) {

        this.fromOrderCreation = fromOrderCreation;
        this.documentNames = await this.uqs.宣传资料管理.Document.search("", 0, 100);
        this.openVPage(VInStock);
        if (!this.documentNames || this.documentNames.length === 0) {
            this.onNewInstock(undefined);
        }
    }

    /**
 * 打开入库界面
 */
    onNewInstock = async (document: any) => {
        this.openVPage(VInStock, document);
    }

    onDocumentNameSelected = (documentName: BoxId) => {
        if (this.fromOrderCreation) {
            this.backPage();
            this.returnCall(documentName);
        }
    }

    saveInStock = async (documentNameData: any, stockLocation: any) => {
        //完结任务--后台数据
        let { id } = documentNameData;
        let param = {
            documentid: id,
            stockLocationid: stockLocation.stockLocation.id,
            quantity: stockLocation.quantity,
            oitype: 1
        };

        await this.uqs.宣传资料管理.DocumentInStock.submit(param);
        nav.popTo(this.cApp.topKey);
    }

    pickDocumentInStock = async (context: Context, name: string, value: number): Promise<number> => {
        let cDocument = this.newC(CStockList);
        return await cDocument.call<number>();
    }
}
