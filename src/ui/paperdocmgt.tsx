import * as React from 'react';
import { TuidUI, tv, UqUI } from 'tonva';

export const handoutUI: TuidUI = {
    content: (values: any) => {
        let { description } = values;
        return <>
            {tv(description)}
        </>
    }
}

const uqUI: UqUI = {
    tuid: {
        宣传资料管理: handoutUI,
    },
}

export default uqUI;