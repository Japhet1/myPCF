import * as React from "react"
import { Formik, FormikProps, Form } from 'formik';
import { IStackTokens, Stack, StackItem } from "@fluentui/react/lib/Stack";
import { mergeStyleSets } from "@fluentui/react";
import { IDropdownStyles, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { ITextFieldStyles } from "@fluentui/react/lib/TextField";
import { DayOfWeek, defaultDatePickerStrings } from "@fluentui/react";
import { FieldDropdown, FieldText, FieldDatePicker, FormikValidityObserver } from "pcf-components/lib/formikInputs";
import * as Yup from "yup"
import { IObjectHash } from "pcf-core";
import { LifeEventCategoryProp } from "../../Api/api";
  
const stackGap: IStackTokens = { childrenGap: 20 }

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 418 } };
const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 418 } };

// const days: IDropdownOption[] = [
//     { text: 'Sunday', key: DayOfWeek.Sunday },
//     { text: 'Monday', key: DayOfWeek.Monday },
//     { text: 'Tuesday', key: DayOfWeek.Tuesday },
//     { text: 'Wednesday', key: DayOfWeek.Wednesday },
//     { text: 'Thursday', key: DayOfWeek.Thursday },
//     { text: 'Friday', key: DayOfWeek.Friday },
//     { text: 'Saturday', key: DayOfWeek.Saturday },
// ]

// interface MyFormValues {
//     category: {key: string, text: string, type: {key: string, text: string}[]},
//     type: {key: string, text: string},
//     detail: string,
//     date: string
// }

interface AddEventFormProp {
    eventForm: LifeEventCategoryProp
    // typeOption: LifeEventCategoryProp[]
    setValid: (valid: boolean) => void
    // showCategory: boolean
    // event: EventCategory
    eventFormRef: React.MutableRefObject<FormikProps<{}>>
    
}

export const AddEventForm: React.FC<AddEventFormProp> = (props) => {
    const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);
    const [firstTextFieldValue, setFirstTextFieldValue] = React.useState('');
    const [secondTextFieldValue, setSecondTextFieldValue] = React.useState('');

    const [selectedItem, setSelectedItem] = React.useState<IObjectHash>();

    const newData = [{
        key: props.eventForm.key,
        text: props.eventForm.text
    }];

    const setEventForm = {
        category: props.eventForm.text,
        type: '',
        detail: '',
        date: ''
    }


    return (
        <div>
            <Formik
                initialValues={setEventForm} //event.writableFields
                validationSchema={Yup.object().shape({
                    category: Yup.string().required('Required').nullable(),
                    type: Yup.object({
                        key: Yup.number().required('Required')
                    }).required('Required').nullable(),
                    detail: Yup.string(),
                    date: Yup.string().required('Required'),
                })} //event.validate
                validateOnMount={true}
                enableReinitialize={true}
                innerRef={props.eventFormRef}
                onSubmit={() => {}}
                // onSubmit={(values, actions) => {
                //     console.log( values );
                //     actions.resetForm()
                //     actions.setSubmitting(true);
                // }}
            
                component={({values, touched, errors, ...formprops}) => (
                    <Form>
                        <Stack tokens={stackGap}>
                            <Stack>
                                {/* <StackItem>
                                    <FieldDropdown
                                        name="category"
                                        placeholder=""
                                        label="Select category"
                                        options={newData}
                                        styles={dropdownStyles}  
                                    />
                                </StackItem> */}
                                <StackItem>
                                    <FieldDropdown
                                        name="type"
                                        placeholder=""
                                        label="Select event type"
                                        options={props.eventForm.type}
                                        // disabled={!(values as any).category}
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