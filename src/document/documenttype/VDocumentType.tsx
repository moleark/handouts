import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, Form, Context } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { CSelectDocumentType } from './CSelectDocumentType';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'description', type: 'string', required: true },
];

export class VDocumentType extends VPage<CSelectDocumentType> {

    private form: Form;
    private documentTypeData: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            description: { widget: 'text', label: '资料分类名称', placeholder: '必填' } as UiInputItem,
            submit: { widget: 'button', label: '提交' },
        }
    }

    async open(documentTypeData:any) {
        this.documentTypeData = documentTypeData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveDomainType(context.form.data);
    }

    private onSaveDocumentType = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onDelDocumentType = async () => {
        let { documentTypeData } = this.documentTypeData;
        if (await this.vCall(VConfirmDeleteContact, documentTypeData) === true) {
            await this.controller.delContact(documentTypeData);
            this.closePage();
        };
    }

    private page = () => {
        let descriptionData = _.clone(this.documentTypeData);

        //let buttonDel: any;
        let right : any;
        //buttonDel = <button className="btn btn-sm btn-info" onClick={this.onDelDocumentType}>删除</button>;
        right = <button type="button"
            className="btn btn-primary w-100"
            onClick={this.onSaveDocumentType}>保存</button>;

        return <Page header="资料类型" right={right}>
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

class VConfirmDeleteContact extends VPage<CSelectDocumentType> {
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