import * as React from 'react'
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton, CommandBarButton } from '@fluentui/react/lib/Button';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { AddEventForm } from './addEventForm';
import { LifeEventCategoryProp, postData } from '../../Api/api';
import { FormikProps } from 'formik';
import { IChoice, IObjectHash } from 'pcf-core';
import { eventUseContext } from '../../Context/eventUseContext';
import { addEvent } from '../../Context/eventContext';
import { EventRecord } from '../../model';


export interface Item {
    category: string,
    type: IChoice
}
export interface EventAddFormProp {
    onFormCancel: () => void
    // formData: LifeEventCategoryProp
    formData: IChoice
}



export const EventAddDialog: React.FC<EventAddFormProp> = (props) => {

    const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
    const labelId: string = useId('dialogLabel');
    const subTextId: string = useId('subTextLabel');
    const [isValid, setIsValid] = React.useState(true)

    const [ valid, setValid ] = React.useState(true)

    const {dispatch} = eventUseContext()



    const dialogContentProps = {
        type: DialogType.normal,
        title: props.formData.text,
        // closeButtonAriaLabel: 'Close',
        // subText: 'Do you want to send this message without a subject?',
    };

    const evenFormRef = React.useRef<FormikProps<IObjectHash>>()

    const callbackBtnSave = React.useCallback((valid: boolean) => {
        setValid(valid)

    }, [])
   

    const onBtnSave = async () => {
        if(evenFormRef.current) {
            const newEventSave = {
                category: evenFormRef.current.values.category,
                date: evenFormRef.current.values.date,
                detail: evenFormRef.current.values.detail,
                type: evenFormRef.current.values.type.text
            }
            // dispatch(addEvent(newEventSave))
            await postData(newEventSave)

            props.onFormCancel()
        }
    }

    return (
        <>
            <Dialog
                hidden={false}
                onDismiss={props.onFormCancel}
                dialogContentProps={dialogContentProps}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 700}},
                }}
                maxWidth={493}
                minWidth={288}
            >
                <AddEventForm eventFormRef={evenFormRef} eventForm={props.formData} setValid={callbackBtnSave}/>
                {/* <AddEventForm eventFormRef={evenFormRef} setValid={callbackBtnSave}/> */}
                <DialogFooter>
                    <PrimaryButton onClick={onBtnSave} text="Save" disabled={!valid} />
                    <DefaultButton onClick={props.onFormCancel} text="Cancel" />
                </DialogFooter>
            </Dialog>
        </>
    )
}