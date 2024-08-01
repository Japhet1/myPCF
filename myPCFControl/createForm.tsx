import * as React from "react"
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik';
import { IStackTokens, Stack, StackItem } from "@fluentui/react/lib/Stack";
import { mergeStyleSets, values } from "@fluentui/react";
import { Dropdown, IDropdownStyles, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { TextField, ITextFieldStyles } from "@fluentui/react/lib/TextField";
import { DatePicker, DayOfWeek, defaultDatePickerStrings } from "@fluentui/react";
import { LifeEventCategoryData, LifeEventCategoryProp } from "./DummyData/categoryData";
import { FieldDropdown, FieldText, FieldDatePicker } from "pcf-components/lib/formikInputs";
import { EntityRecord, Property } from "pcf-core";
import * as Yup from "yup"
  
const stackgap = { childrenGap: 20 }
const stackGap: IStackTokens = { childrenGap: 20 }

const classNames = mergeStyleSets({
    container: {
        width: '100%'
    }
})

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 418 } };
const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 200 } };

const days: IDropdownOption[] = [
    { text: 'Sunday', key: DayOfWeek.Sunday },
    { text: 'Monday', key: DayOfWeek.Monday },
    { text: 'Tuesday', key: DayOfWeek.Tuesday },
    { text: 'Wednesday', key: DayOfWeek.Wednesday },
    { text: 'Thursday', key: DayOfWeek.Thursday },
    { text: 'Friday', key: DayOfWeek.Friday },
    { text: 'Saturday', key: DayOfWeek.Saturday },
]

interface MyFormValues {
    category: string,
    type: string,
    detail: string,
    date: string
}

interface CreateFormProp {
    categoryOption: LifeEventCategoryProp[]
    
}

export class Lead extends EntityRecord {
    @Property()
    public category: string | undefined = undefined;
    @Property()
    public type: string | undefined = undefined;
    @Property()
    public detail: string | undefined = undefined;
    @Property()
    public date: string | undefined = undefined;

    getIdColumnName(): string {
        return "id" 
    }

    validate(data?: any) {
       return  Yup.object().shape({
            category: Yup.string()
              .required('Required'),
            type: Yup.string()
              .required('Required'),
            detail: Yup.string(),
            //   .required('Required'),
            date: Yup.string()
            //   .required('Required'),
            // email: Yup.string().email('Invalid email').required('Required'),
        })
    }
}
const newLead: Lead = new Lead

const setForm = {
    category: "",
    type: "",
    detail: "",
    date: ""
}



const valid = newLead.validate(setForm)

// newLead.getIdColumnName(setForm)






export const CreateForm: React.FC<CreateFormProp> = (props) => {
    const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);
    const [firstTextFieldValue, setFirstTextFieldValue] = React.useState('');
    const [secondTextFieldValue, setSecondTextFieldValue] = React.useState('');
    const [categoryOption, setCategoryOption] = React.useState<LifeEventCategoryProp[]>(props.categoryOption)

    const initialValues: MyFormValues = { 
        category: '',
        type: '',
        detail: '',
        date: ''
    };
    
    const options = [
        { key: 'option1', text: 'Option 1' },
        { key: 'option2', text: 'Option 2' },
        { key: 'option3', text: 'Option 3' },
        // add more options as needed
    ];

    // setCategoryOption(props.categoryOption)

    const typeOptions = React.useRef<LifeEventCategoryProp[]>()

    console.log(categoryOption)
  
    // const onChangeFirstTextFieldValue = React.useCallback(
    //     (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    //     setFirstTextFieldValue(newValue || '');
    //     },
    //     [],
    // );
    // const onChangeSecondTextFieldValue = React.useCallback(
    //     (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    //     if (!newValue || newValue.length <= 5) {
    //         setSecondTextFieldValue(newValue || '');
    //     }
    //     },
    //     [],
    // )

    

    const getOptions = (values: any): IDropdownOption<any>[] => {
        

        if (values.category) {
            const v = values.category.key;
            const selectedCategory = categoryOption.find((e) => e.key.toString().startsWith(v));
            if (selectedCategory && selectedCategory.type) {
                console.log(selectedCategory.type);
                return selectedCategory.type;
            }
        }
        // let d: any[] = []

        // e.forEach(e => d.push(e.text))
        
        
        return [];
        
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={valid}
                enableReinitialize={true}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    console.log(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
                component={({values, touched, errors, ...formprops}) => (
                    <Form>
                        <Stack tokens={stackGap}>
                            <Stack horizontal tokens={stackgap}>
                                <StackItem>
                                    <FieldDropdown
                                        name="category"
                                        placeholder=""
                                        label="Select category"
                                        options={categoryOption as IDropdownOption <any>[]}
                                        styles={dropdownStyles}
                                        // Add your onChange handler here
                                        // onChange={this.handleChange}
                                        // onChange={(event, newValue) => {
                                        //     setFieldValue('category', newValue);
                                        //     const newOptions = getOptions(newValue, categoryOptions);
                                        //     setTypeOptions(newOptions);
                                        //     setFieldValue('type', ''); // Reset type when category changes
                                        // }}  
                                    />
                                </StackItem>
                                <StackItem>
                                    <FieldDropdown
                                        name="type"
                                        placeholder=""
                                        label="Select event type"
                                        options={getOptions(values)}
                                        disabled={!(values as any).category}
                                        styles={dropdownStyles}
                                        // Add your onChange handler here
                                        // onChange={this.handleChange}
                                    />
                                </StackItem>
                            </Stack>
                            <StackItem>
                                <FieldText
                                    name="detail"
                                    label="Details"
                                    // value={firstTextFieldValue}
                                    // onChange={onChangeFirstTextFieldValue}
                                    styles={textFieldStyles}
                                />
                            </StackItem>
                            <StackItem>
                                <FieldDatePicker
                                    name="date"
                                    label="Date"
                                    firstDayOfWeek={firstDayOfWeek}
                                    showWeekNumbers={true}
                                    firstWeekOfYear={1}
                                    showMonthPickerAsOverlay={true}
                                    placeholder="Select a date..."
                                    ariaLabel="Select a date"
                                    // DatePicker uses English strings by default. For localized apps, you must override this prop.
                                    strings={defaultDatePickerStrings}
                                />
                            </StackItem>
                        </Stack>
                        <button type="submit">Submit</button>
                    </Form>
                )}
            />
        </div>
    );
}