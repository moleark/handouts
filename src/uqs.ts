import { Tuid, Query, Action } from "tonva";

export interface UqHandouts {
    DomainType: Tuid;
    DocumentType: Tuid;
    StockLocation: Tuid;
    Document: Tuid;
    DocumentHistory: History;
    DocumentInStock: Action;
    DocumentOutStock: Action;
    SearchDocumentHistory: Query;
    SearchPaperDoc: Query;
    SearchPaperDocByKey: Query;
    GetDocumentBook: Query;
}

export interface UQs {
    宣传资料管理: UqHandouts;
}
