import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CSelectStockLocation } from './CSelectStockLocation';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'description', type: 'string', required: true },
];

export class VStockLocation extends VPage<CSelectStockLocation> {

    private form: Form;
    private stockLocationData: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            description: { widget: 'text', label: '库存地点名称', placeholder: '必填' } as UiInputItem,
            submit: { widget: 'button', label: '提交' },
        }
    }

    async open(stockLocationData: any) {
        this.stockLocationData = stockLocationData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveDomainType(context.form.data);
    }

    private onSaveStockLocation = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onDelStockLocation = async () => {
        let { StockLocationData } = this.stockLocationData;
        if (await this.vCall(VConfirmDeleteContact, StockLocationData) === true) {
            await this.controller.delContact(StockLocationData);
            this.closePage();
        };
    }

    private page = () => {
        let descriptionData = _.clone(this.stockLocationData);

        //let buttonDel: any;
        let footer: any;
        //buttonDel = <button className="btn btn-sm btn-info" onClick={this.onDelStockLocation}>删除</button>;
        footer = <button type="button"
            className="btn btn-primary w-100"
            onClick={this.onSaveStockLocation}>保存</button>;

        return <Page header="库存地点" footer={footer}>
            <div className="p-3 bg-white">
                <Form ref={v => this.form = v} className="m-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    formData={descriptionData}
                    onButtonClick={this.onFormButtonClick}
                    fieldLabelSize={3}
                />
            </div>
        </Page>
    }
}

class VConfirmDeleteContact extends VPage<CSelectStockLocation> {
    async open(contact: any) {
        this.openPage(this.page, contact);
    }

    private onConfirm = async () => {
        await this.returnCall(true);
        this.closePage();
    }

    private page = (contact: any) => {
        return <Page header="确认" back="close">
            <div className="w-50 mx-auto border border-primary rounded my-3 p-3 bg-white">
                <div className="p-4 text-center position-relative">
                    <i className="fa fa-question-circle position-absolute fa-2x text-warning" style={{ left: 0, top: 0 }} />
                    <b className="">{contact.name}</b>
                </div>
                <button className="btn btn-danger w-50 mx-auto d-block mt-3" onClick={this.onConfirm}>确认删除</button>
            </div>
        </Page>;
    }
}