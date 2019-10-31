import { BoxId } from 'tonva';
//import { Controller, Context, nav } from 'tonva';
import { CUqBase } from 'CBase';
//import { CPaperDocMgtApp } from 'CPaperDocMgtApp';
import { VStockLocationList } from './VStockLocationList';
import { VStockLocation } from './VStockLocation';

export abstract class CSelectStockLocation extends CUqBase {

    fromOrderCreation: boolean;
    id: number;
    description: string;

    StockLocations: any[] = [];
    StockLocationolds: any[] = [];

    async internalStart(fromOrderCreation: boolean) {
        this.fromOrderCreation = fromOrderCreation;
        this.StockLocations = await this.uqs.宣传资料管理.StockLocation.search("",0,100);
        this.openVPage(VStockLocationList);
        if (!this.StockLocations || this.StockLocations.length === 0) {
            this.onNewStockLocation();
        }
    }

        /**
     * 打开新建界面
     */
    onNewStockLocation = async () => {
        this.openVPage(VStockLocation, { description: undefined });
    }

    onStockLocationSelected = (stockLocation: BoxId) => {
        if (this.fromOrderCreation) {
            this.backPage();
            this.returnCall(stockLocation);
        }
    }

    protected abstract async getIsDefault(userSetting: any, userContactId: number): Promise<boolean>;

    /**
     * 打开编辑界面
     */
    onEditStockLocation = async (stockLocation: any) => {
        //let StockLocationId = stockLocation.id;
        //let StockLocationView = await this.uqs.宣传资料管理.StockLocation.load(StockLocationId);
        //let StockLocationData: any = { description: StockLocationView };
        this.openVPage(VStockLocation, stockLocation);
    }

    saveDomainType = async (stockLocation: any) => {
        if (stockLocation.id === undefined) {
            let newStockLocation = await this.uqs.宣传资料管理.StockLocation.save(undefined, stockLocation);
            let { id: newStockLocationId } = newStockLocation;
            let documentBox = {
                StockLocation: this.uqs.宣传资料管理.StockLocation.boxId(newStockLocationId),
            }
        }else{
            this.StockLocationolds  = await this.uqs.宣传资料管理.StockLocation.load(stockLocation.id);
            await this.uqs.宣传资料管理.StockLocation.save(stockLocation.id, stockLocation);
        }

        let cStockLocationList = this.newC(CSelectShippingStockLocation);
        await cStockLocationList.start();
    }

    delContact = async (stockLocation: any) => {
        // 真正的调用数据库操作
    }
}

export class CSelectShippingStockLocation extends CSelectStockLocation {
    protected async getIsDefault(userSetting: any, userContactId: number): Promise<boolean> {
        let { shippingStockLocation } = userSetting;
        return shippingStockLocation && shippingStockLocation.id === userContactId;
    }

}