import * as React from 'react';
import { VPage, Page, UiSchema, UiInputItem, UiImageItem, UiIdItem, Form, Context } from 'tonva';
import { Schema } from 'tonva';
import _ from 'lodash';
import { tv } from 'tonva';
import { CSelectDocumentName } from './CSelectDocumentName';

const schema: Schema = [
    { name: 'id', type: 'id', required: false },
    { name: 'domain', type: 'id', required: true },
    { name: 'documenttype', type: 'id', required: true },
    { name: 'name', type: 'string', required: true },
    { name: 'code', type: 'string', required: false },
    { name: 'image', type: 'string', required: false },
];

export class VDocumentName extends VPage<CSelectDocumentName> {

    private form: Form;
    private documentNameData: any;

    private uiSchema: UiSchema = {
        items: {
            id: { visible: false },
            domain: {
                widget: 'id', label: '领域分类', placeholder: '领域分类',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickDomainType(context, name, value),
                Templet: (item: any) => {
                    let { obj } = item;
                    if (!obj) return <small className="text-muted">请选择领域分类</small>;
                    return <>
                        {tv(obj, v => <>{v.description}</>)}
                    </>;
                }
            } as UiIdItem,
            documenttype: {
                widget: 'id', label: '资料类型', placeholder: '资料类型',
                pickId: async (context: Context, name: string, value: number) => await this.controller.pickDocumentType(context, name, value),
                Templet: (item: any) => {
                    let { obj } = item;
                    if (!obj) return <small className="text-muted">请选择资源类型</small>;
                    return <>
                        {tv(obj, v => <>{v.description}</>)}
                    </>;
                }
            } as UiIdItem,
            name: { widget: 'text', label: '资料名称', placeholder: '必填' } as UiInputItem,
            code: { widget: 'text', label: '资料代码' } as UiInputItem,
            image: { widget: 'image', label: '资料封面图片' } as UiImageItem,
            submit: { widget: 'button', label: '提交' },
        }
    }

    async open(documentNameData: any) {
        this.documentNameData = documentNameData;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: string, context: Context) => {
        await this.controller.saveDomainName(context.form.data);
    }

    private onSaveDocumentName = async () => {
        if (!this.form) return;
        await this.form.buttonClick("submit");
    }

    private onDelDocumentName = async () => {
        let { documentNameData } = this.documentNameData;
        if (await this.vCall(VConfirmDeleteContact, documentNameData) === true) {
            await this.controller.delContact(documentNameData);
            this.closePage();
        };
    }

    private page = () => {
        let descriptionData = _.clone(this.documentNameData);

        //let buttonDel: any;
        let footer: any;
        //buttonDel = <button className="btn btn-sm btn-info" onClick={this.onDelDocumentType}>删除</button>;
        footer = <button type="button"
            className="btn btn-primary w-100"
            onClick={this.onSaveDocumentName}>保存</button>;

        return <Page header="资料信息" footer={footer}>
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

class VConfirmDeleteContact extends VPage<CSelectDocumentName> {
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