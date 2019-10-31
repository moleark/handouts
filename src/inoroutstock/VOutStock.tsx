import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem,UiIdItem, Form, Context } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { tv } from 'tonva';
import { COutStock } from './COutStock';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'stockLocation', type: 'id', required: true },
    { name: 'quantity', type: 'number', required: true },
];

export class VOutStock extends VPage<COutStock> {

    private form: Form;
    private documentNameData: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            stockLocation: { widget: 'id', label: '库存地点', placeholder: '库存地点',
            pickId: async (context: Context, name: string, value: number) => await this.controller.pickDocumentInStock(context, name, value),
            Templet: (item: any) => {
                let { obj } = item;
                if (!obj) return <small className="text-muted">请选择库存地点</small>;
                return <>
                    {tv(obj, v => <>{v.description}</>)}
                </>;
            }
        } as UiIdItem,         
            quantity: { widget: 'text', label: '出库数量', placeholder: '必填' } as UiInputItem,
            submit: { widget: 'button', label: '提交' },
        }
    }

    async open(documentNameData:any) {
        this.documentNameData = documentNameData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveOutStock(this.documentNameData,context.form.data);
        this.closePage(2);
    }

    private onSaveDocumentName = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private page = () => {
        let descriptionData = _.clone(this.documentNameData);

        let footer : any;
        footer = <button type="button"
            className="btn btn-primary w-100"
            onClick={this.onSaveDocumentName}>出库</button>;

        return <Page header="资料出库" right={footer}>
                <div className="m-3">文档名称：{descriptionData.name}</div>       
                <div className="p-3 bg-white">
                    <Form ref={v => this.form = v}  className="m-3"
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
