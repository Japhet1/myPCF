import { EntityRecord, Property, IChoice, ChoiceProperty } from "pcf-core";
import * as Yup from "yup"

export class EventCategory extends EntityRecord {
  
    @ChoiceProperty()
    public category: IChoice = undefined;
    @ChoiceProperty()
    public type: IChoice = undefined;
    @Property()
    public detail: string = undefined;
    @Property()
    public date: string = undefined;
  
    getIdColumnName(): string {
        return "id" 
    }
  
    validate(data?: any) {
       return  Yup.object().shape({
            category: Yup.object({
                key: Yup.number().required('Required')
            }).required('Required').nullable(),
            type: Yup.object({
                key: Yup.number().required('Required')
            }).required('Required').nullable(),
            detail: Yup.string(),
            date: Yup.string().required('Required'),
        })
    }
}