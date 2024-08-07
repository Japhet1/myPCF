import * as React from "react"
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik';
import { IStackTokens, Stack, StackItem } from "@fluentui/react/lib/Stack";
import { mergeStyleSets, values } from "@fluentui/react";
import { Dropdown, IDropdownStyles, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { TextField, ITextFieldStyles } from "@fluentui/react/lib/TextField";
import { DatePicker, DayOfWeek, defaultDatePickerStrings } from "@fluentui/react";
// import { LifeEventCategoryData, LifeEventCategoryProp } from "./DummyData/categoryData";
import { FieldDropdown, FieldText, FieldDatePicker, FormikValidityObserver } from "pcf-components/lib/formikInputs";
import { EventCategory } from "./model";
import * as Yup from "yup"
import { postData, LifeEventCategoryProp } from "./Api/api";
import { IObjectHash } from "pcf-core";
  
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
    category: {key: string, text: string, type: {key: string, text: string}[]},
    type: {key: string, text: string},
    detail: string,
    date: string
}

interface CreateFormProp {
    typeOption: LifeEventCategoryProp[]
    setValid: (valid: boolean) => void
    showCategory: boolean
    event: EventCategory
    formRef: React.MutableRefObject<FormikProps<{}>>
    
}
// const newLead: Lead = new Lead

const setForm = {
    category: '',
    type: '',
    detail: '',
    date: ''
}

// const valid = newLead.validate(setForm)

// newLead.getIdColumnName(setForm)

export const CreateForm: React.FC<CreateFormProp> = (props) => {
    const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);
    const [firstTextFieldValue, setFirstTextFieldValue] = React.useState('');
    const [secondTextFieldValue, setSecondTextFieldValue] = React.useState('');
    // const [typeOption, settypeOption] = React.useState<LifeEventCategoryProp[]>(props.typeOption)

    const optionCategory = React.useRef<LifeEventCategoryProp[]>(props.typeOption)
    // const event  = props.event as EventCategory

    // event.setValues(setForm)

    // console.log(props.typeOption)

    

    const [selectedItem, setSelectedItem] = React.useState<IObjectHash>();

    // const selectedItem = React.useRef<MyFormValues>

    

    // const transformData = (data?: MyFormValues) => {

    //     const newData = {
    //         category: data?.category.text,
    //         date: new Date(`${data?.date}`).toLocaleString(),
    //         detail: data?.detail,
    //         type: data?.type.text
    //     };
        
    //     return postData(newData)
    // };
      
      // Get the transformed data
    //   const transformedData = transformData(selectedItem);
      
    // console.log(transformData);
    

    // const dataFormat = {
    //     category: d.text
    // }

    // const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    //     setSelectedItem(item);
    // };    
    


    // console.log(typeOption)
  
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

    const getOptions = React.useCallback((values: any): IDropdownOption<any>[] => {
        
        // if (values.category) {
        //     const v = values.category.key;
        //     const selectedCategory = optionCategory.current.find((e) => e.key.toString().startsWith(v));
        //     if (selectedCategory && selectedCategory.type) {
        //         // console.log(selectedCategory.type);
        //         return selectedCategory.type;
        //     }
        // }
        const selectedCategory = optionCategory.current.find(e => e.key.toString().startsWith(values.category.key));
        return selectedCategory && selectedCategory.type ? selectedCategory.type : [];

        // return [];
        
    }, [])

    // React.useEffect(() => {
    //     const transformData = async (data?: IObjectHash) => {
    //         const newData = {
    //             category: data?.category.text,
    //             date: data?.date,
    //             detail: data?.detail,
    //             type: data?.type.text
    //         };
    //         if(newData.category) {
    //             return await postData(newData)
    //         }
    //     };
    //     transformData(selectedItem)
    // }, [selectedItem])

    return (
        <div>
            <Formik
                initialValues={setForm} //event.writableFields
                validationSchema={Yup.object().shape({
                    category: Yup.object({
                        key: Yup.number().required('Required')
                    }).required('Required').nullable(),
                    type: Yup.object({
                        key: Yup.number().required('Required')
                    }).required('Required').nullable(),
                    detail: Yup.string(),
                    date: Yup.string().required('Required'),
                })} //event.validate
                validateOnMount={true}
                enableReinitialize={true}
                innerRef={props.formRef}
                onSubmit={() => {}}
                // onSubmit={(values, actions) => {
                //     // console.log( values );
                //     // selectedItem.current = values
                //     // const newData = {
                //     //     category: values.category.text,
                //     //     date: values.date,
                //     //     detail: values.detail,
                //     //     type: values.type.text
                //     // };
                //     // await postData(newData)
                //     actions.resetForm()
                //     // console.log(transformData(values))
                //     setSelectedItem(values as MyFormValues)
                //     // console.log(JSON.stringify(values, null, 2));
                //     actions.setSubmitting(true);
                // }}
            
                component={({values, touched, errors, ...formprops}) => (
                    <Form>
                        <Stack tokens={stackGap}>
                            <Stack horizontal tokens={stackgap}>
                                <StackItem>
                                    <FieldDropdown
                                        name="category"
                                        placeholder=""
                                        label="Select category"
                                        options={optionCategory.current as IDropdownOption<any>[]}
                                        styles={dropdownStyles}  
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

                                    />
                                </StackItem>
                            </Stack>
                            <StackItem>
                                <FieldText
                                    name="detail"
                                    label="Details"
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
                        <FormikValidityObserver callback={props.setValid} />
                        {/* <button type="submit">Submit</button> */}
                    </Form>
                )}
            />
        </div>
    );
}