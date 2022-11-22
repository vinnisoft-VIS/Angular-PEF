export interface AdeguataVerifica {
    anagList?: AnagData[];
    note?: string;
    isVisibleForzatura?: boolean;
    forzaturaRevUfficio?: string;
}

export interface AnagData {
    anagId?: string;
    anagName?: string;
    questionarioAdeguata?: string;
    questionarioAdeguataDate?: string;
}