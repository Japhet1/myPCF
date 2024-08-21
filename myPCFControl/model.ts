import { EntityRecord, Property, IChoice, ChoiceProperty, Table } from "pcf-core";
import * as Yup from "yup"

export class EventRecord extends EntityRecord {

    @Property()
    public new_name: string = undefined
    @ChoiceProperty()
    public new_category: IChoice = undefined;
    @ChoiceProperty()
    public new_eventtype: IChoice = undefined;
    @Property()
    public new_detail: string = undefined;
    @Property()
    public new_date: string = undefined;
  
    getIdColumnName(): string {
        return "new_lifeeventid" 
    }
  
    validate(data?: any) {
        return  Yup.object().shape({
            new_category: Yup.object({
                key: Yup.number().required('Required')
            }).required('Required').nullable(),
            new_eventtype: Yup.object({
                key: Yup.number().required('Required')
            }).required('Required').nullable(),
            new_date: Yup.string().required('Required'),
        })
    }
}

export class EventTable extends Table<EventRecord> {
    constructor() {
        super("Life Event", "new_lifeevent", "new_lifeeventid", EventRecord)
    }
}