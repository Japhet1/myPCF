import * as React from "react"
import { Formik, FormikProps, Form } from 'formik';
import { IStackTokens, Stack, StackItem } from "@fluentui/react/lib/Stack";
import { IDropdownStyles, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { ITextFieldStyles } from "@fluentui/react/lib/TextField";
import { DayOfWeek, defaultDatePickerStrings } from "@fluentui/react";
import { FieldDropdown, FieldText, FieldDatePicker, FormikValidityObserver } from "pcf-components/lib/formikInputs";
import * as Yup from "yup"
import { IChoice, getOptionSet } from "pcf-core";
import { EventTable } from "../../model"
  
const stackGap: IStackTokens = { childrenGap: 20 }

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 418 } };
const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 418 } };


interface AddForm {}

interface AddEventFormProp {
    eventForm: IChoice
    // typeOption: LifeEventCategoryProp[]
    setValid: (valid: boolean) => void
    // showCategory: boolean
    // event: EventCategory
    eventFormRef: React.MutableRefObject<FormikProps<AddForm>>
    
}

export const AddEventForm: React.FC<AddEventFormProp> = (props) => {
    const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);

    const table = new EventTable()
    const typeOptionSet = React.useRef<IChoice[]>([])


    console.log(props.eventForm)

    const setEventForm = {
        new_category: props.eventForm,
        new_eventtype: '',
        new_detail: '',
        new_date: ''
    }

    React.useEffect(() => {
        const fn = async () => {
            const types = await getOptionSet(table.LogicalName, 'new_eventtype');
            typeOptionSet.current = types;
            console.log(typeOptionSet.current)
        };
        fn();
    }, []);

    const getOptions = React.useCallback((values) => {
        if (values.new_category) {
            const v = values.new_category.key.toString();
            console.log(v)
            return typeOptionSet.current.filter((e) => e.key.toString().startsWith(v) || e.key == 1) as IDropdownOption<any>[];
        }
        return [];
        
    }, [])

    return (
        <div>
            <Formik
                initialValues={setEventForm} //event.writableFields
                validationSchema={Yup.object().shape({
                    new_category: Yup.object(),
                    new_eventtype: Yup.object({
                        key: Yup.number()
                    }),
                    new_date: Yup.string(),
                })} //event.validate
                validateOnMount={true}
                enableReinitialize={true}
                innerRef={props.eventFormRef}
                // onSubmit={() => {}}
                onSubmit={(values, actions) => {
                    console.log( values );
                    actions.resetForm()
                    actions.setSubmitting(true);
                }}
            
                component={({values, touched, errors, ...formprops}) => (
                    <Form>
                        <Stack tokens={stackGap}>
                            <Stack>
                                <StackItem>
                                    {/* <FieldDropdown
                                        name="category"
                                        placeholder=""
                                        label="Select category"
                                        options={props.eventForm} 
                                        styles={dropdownStyles}  
                                    /> */}
                                </StackItem>
                                <StackItem>
                                    <FieldDropdown
                                        name="new_eventtype"
                                        placeholder=""
                                        label="Select event type"
                                        options={getOptions(values)}
                                        // disabled={!(values as any).category}
                                        styles={dropdownStyles}
                                    />
                                </StackItem>
                            </Stack>
                            <StackItem>
                                <FieldText
                                    name="new_detail"
                                    label="Details"
                                    styles={textFieldStyles}
                                />
                            </StackItem>
                            <StackItem>
                                <FieldDatePicker
                                    name="new_date"
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