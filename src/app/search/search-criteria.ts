export class SearchCriteria {

    searchCriteriaId: number;
    fieldName: string;
    fieldFilter: string;
    fieldValue: string;
    logicalCdn: string;
    hidden = false;

    fieldType = 'string';

    constructor(private fName?: string, private fType?: string, private fFilter?: string,
        private fValue?: string, lCdn?: string, hidd?: boolean) {
        this.fieldName = fName;
        this.fieldType = fType;
        this.fieldFilter = fFilter;
        this.fieldValue = fValue;
        this.logicalCdn = lCdn;
        this.hidden = hidd;
    }
}
