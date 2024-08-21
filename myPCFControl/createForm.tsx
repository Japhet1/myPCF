import * as React from "react"
import { Formik, FormikProps, Form } from 'formik';
import { IStackTokens, Stack, StackItem } from "@fluentui/react/lib/Stack";
import { mergeStyleSets } from "@fluentui/react";
import { IDropdownStyles, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { ITextFieldStyles } from "@fluentui/react/lib/TextField";
import { DayOfWeek, defaultDatePickerStrings } from "@fluentui/react";
import { FieldDropdown, FieldText, FieldDatePicker, FormikValidityObserver } from "pcf-components/lib/formikInputs";
import { IChoice, getOptionSet } from "pcf-core";
import { EventTable, EventRecord } from "./model";
  
const stackgap = { childrenGap: 20 }
const stackGap: IStackTokens = { childrenGap: 20 }

const classNames = mergeStyleSets({
    container: {
        width: '100%'
    },
    span: {
        width: '50%'
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

interface CreateForm {}

interface CreateFormProp {
    typeOption: IChoice[]
    setValid: (valid: boolean) => void
    showCategory: boolean
    event: EventRecord
    formRef: React.MutableRefObject<FormikProps<CreateForm>>
    setLoading: (load: boolean) => void
}


export const CreateForm: React.FC<CreateFormProp> = React.memo((props) => {
    const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);

    const optionCategory = React.useRef<IChoice[]>(props.typeOption)
    const table = new EventTable()
    const typeOptionSet = React.useRef<IChoice[]>([])
    const { event } = props

    React.useEffect(() => {
        const fn = async () => {
            const types = await getOptionSet(table.LogicalName, 'new_eventtype');
            typeOptionSet.current = types;
            // console.log(typeOptionSet.current)
            props.setLoading(false)
        };
        fn();
    }, [typeOptionSet.current]);


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getOptions = React.useCallback((values) => {
        if (values.new_category) {
            const v = values.new_category.key.toString();
            return typeOptionSet.current.filter((e) => e.key.toString().startsWith(v) || e.key == 1) as IDropdownOption<any>[];
        }
        return [];
        
    }, [])

   

    return (
        <div>
            <Formik
                initialValues={event.writableFields} //event.writableFields
                validationSchema={event.validate()} //event.validate()
                validateOnMount={true}
                enableReinitialize={true}
                innerRef={props.formRef}
                onSubmit={() => {}}
                // onSubmit={(values, actions) => {
                //     console.log( values );
                //     actions.resetForm()
                //     // console.log(JSON.stringify(values, null, 2));
                //     actions.setSubmitting(true);
                // }}
            
                component={({values, touched, errors, ...formprops}) => (
                    <Form>
                        <Stack tokens={stackGap}>
                            <Stack horizontal tokens={stackgap}>
                                {props.showCategory && (
                                    <StackItem>
                                        <FieldDropdown
                                            name="new_category"
                                            placeholder=""
                                            label="Select category"
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            options={optionCategory.current as IDropdownOption<any>[]}
                                            styles={dropdownStyles}  
                                        />
                                    </StackItem>
                                )}
                                <StackItem className={props.showCategory? classNames.span : classNames.container}>
                                    <FieldDropdown 
                                        name="new_eventtype"
                                        placeholder=""
                                        label="Select event type"
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        options={getOptions(values)}
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        disabled={!(values as any).new_category}
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
}, (prev, current) => prev.typeOption == current.typeOption)