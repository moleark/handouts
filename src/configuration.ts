import { AppConfig } from "tonva";
//import { CPaperDocMgtApp } from './CPaperDocMgtApp';
import { tvs } from "./tvs";

export const appConfig: AppConfig = {
    appName: '百灵威系统工程部/handouts',
    version: '1.0.1',
    tvs: tvs,
    oem: '百灵威'
};
/*
// 生产配置
export const GLOABLE = {
    CHINA: 44,
    CHINESE: 196,
    SALESREGION_CN: 1,
    ROOTCATEGORY: {
        47: {
            src: OrganicChemistry,
            labelColor: 'text-info',
        },
        470: {
            src: AnalyticalChemistry,
            labelColor: 'text-success',
        },
        1013: {
            src: LifeScience,
            labelColor: 'text-danger',
        },
        1219: {
            src: MaterialScience,
            labelColor: 'text-warning',
        },
        1545: {
            src: LabSupplies,
            labelColor: 'text-primary',
        },
    } as any,
    TIPDISPLAYTIME: 2000
}*/

/*
// 测试环境配置
export const GLOABLE = {
    CHINA: 43,
    CHINESE: 197,
    SALESREGION_CN: 4,
    ROOTCATEGORY: {
        7: {
            src: OrganicChemistry,
            labelColor: 'text-info',
        },
        430: {
            src: AnalyticalChemistry,
            labelColor: 'text-success',
        },
        986: {
            src: LifeScience,
            labelColor: 'text-danger',
        },
        1214: {
            src: MaterialScience,
            labelColor: 'text-warning',
        },
        1545: {
            src: LabSupplies,
            labelColor: 'text-primary',
        },
    } as any,
    TIPDISPLAYTIME: 2000
}
*/