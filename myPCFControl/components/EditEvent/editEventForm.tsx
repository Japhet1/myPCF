import * as React from 'react'
import * as Yup from 'yup'
import { Formik, Form, FormikProps } from 'formik';
import { IStackTokens, Stack, StackItem } from "@fluentui/react/lib/Stack";
import { FieldDropdown, FormikValidityObserver, FieldText, FieldDatePicker } from 'pcf-components/lib/formikInputs';
import { IDropdownStyles, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { ITextFieldStyles } from "@fluentui/react/lib/TextField";
import { DayOfWeek, defaultDatePickerStrings } from "@fluentui/react";
import { LifeEventCategoryProp } from '../../Api/api';
import { Item } from '../../lifeEventTile';


const stackGap: IStackTokens = { childrenGap: 20 }

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 418 } };
const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 418 } };

const days: IDropdownOption[] = [
    { text: 'Sunday', key: DayOfWeek.Sunday },
    { text: 'Monday', key: DayOfWeek.Monday },
    { text: 'Tuesday', key: DayOfWeek.Tuesday },
    { text: 'Wednesday', key: DayOfWeek.Wednesday },
    { text: 'Thursday', key: DayOfWeek.Thursday },
    { text: 'Friday', key: DayOfWeek.Friday },
    { text: 'Saturday', key: DayOfWeek.Saturday },
]

interface EditEventFormProp {
    editformdata: LifeEventCategoryProp,
    edititem: Item,
    editformref: React.MutableRefObject<FormikProps<{}>>
}

export const EditEventForm: React.FC<EditEventFormProp> = (props) => {
    const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);

    const setEditEventForm = {
        id: props.edititem.id,
        category: props.editformdata.text,
        type: props.edititem.type,
        detail: props.edititem.detail,
        date: props.edititem.date
    }

    // console.log(props.editformdata)

    return (
        <>
            <Formik
                initialValues={setEditEventForm} //event.writableFields
                validationSchema={Yup.object().shape({
                    category: Yup.string().required('Required').nullable(),
                    type: Yup.object({
                        text: Yup.string().required('required')
                    }).required('Required').nullable(),
                    detail: Yup.string(),
                    date: Yup.string().required('Required'),
                })} //event.validate
                validateOnMount={true}
                enableReinitialize={true}
                innerRef={props.editformref}
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
                                <StackItem>
                                    <FieldDropdown
                                        name="type"
                                        placeholder={props.edititem.type}
                                        label="Select event type"
                                        options={props.editformdata.type}
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
                        {/* <FormikValidityObserver callback={props.setValid} /> */}
                        {/* <button type="submit">Submit</button> */}
                    </Form>
                )}
            />
        </>
    )
}