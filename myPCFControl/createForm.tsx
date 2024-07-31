import * as React from "react"
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik';
import { IStackTokens, Stack, StackItem } from "@fluentui/react/lib/Stack";
import { mergeStyleSets } from "@fluentui/react";
import { Dropdown, IDropdownStyles, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { TextField, ITextFieldStyles } from "@fluentui/react/lib/TextField";
import { DatePicker, DayOfWeek, defaultDatePickerStrings } from "@fluentui/react";
  
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
    firstName: string;
}

export const CreateForm: React.FC = () => {
    const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);
    const [firstTextFieldValue, setFirstTextFieldValue] = React.useState('');
    const [secondTextFieldValue, setSecondTextFieldValue] = React.useState('');

    const initialValues: MyFormValues = { firstName: '' };
    
    const options = [
        { key: 'option1', text: 'Option 1' },
        { key: 'option2', text: 'Option 2' },
        { key: 'option3', text: 'Option 3' },
        // add more options as needed
    ];
  
    const onChangeFirstTextFieldValue = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setFirstTextFieldValue(newValue || '');
        },
        [],
    );
    const onChangeSecondTextFieldValue = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue || newValue.length <= 5) {
            setSecondTextFieldValue(newValue || '');
        }
        },
        [],
    )

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
            >
                <Form>
                    <Stack tokens={stackGap}>
                        <Stack horizontal tokens={stackgap}>
                            <StackItem>
                                {/* <label htmlFor="category">Select category and event type</label>
                                <Field id="category" name="category" placeholder="" /> */}
                                    <Dropdown
                                        placeholder=""
                                        label="Select category"
                                        options={options}
                                        styles={dropdownStyles}
                                        // Add your onChange handler here
                                        // onChange={this.handleChange}
                                        
                                    />

                            </StackItem>
                            <StackItem>
                                {/* <label htmlFor="type"></label>
                                <Field id="type" name="type" placeholder="" /> */}
                                <Dropdown
                                        placeholder=""
                                        label="Select event type"
                                        options={options}
                                        styles={dropdownStyles}
                                        // Add your onChange handler here
                                        // onChange={this.handleChange}
                                    />
                            </StackItem>
                        </Stack>
                        <StackItem>
                            {/* <label htmlFor="detail">Details</label>
                            <Field id="detail" name="detail" placeholder="" /> */}
                            <TextField
                                label="Details"
                                value={firstTextFieldValue}
                                onChange={onChangeFirstTextFieldValue}
                                styles={textFieldStyles}
                            />
                        </StackItem>
                        <StackItem>
                            {/* <label htmlFor="date">Date</label>
                            <Field id="date" name="date" placeholder="" /> */}
                            <DatePicker
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
                </Form>
            </Formik>
        </div>
    );
}