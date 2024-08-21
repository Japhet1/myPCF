import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton } from '@fluentui/react'
import { title } from 'process'
import * as React from 'react'
import { EditEventForm } from './editEventForm'
import { editData, LifeEventCategoryProp } from '../../Api/api'
import { Item } from '../../lifeEventTile'
import { FormikProps } from 'formik';
import { IObjectHash } from 'pcf-core';
import { editEvent } from '../../Context/eventContext'
import { eventUseContext } from '../../Context/eventUseContext'
import { Event } from '../../Context/eventContext'


export interface EditEventProp {
    oneditcancel: () => void
    // editData: LifeEventCategoryProp
    editItem: Event
}


export const EditEvent: React.FC<EditEventProp> = (props) => {

    const editFormRef = React.useRef<FormikProps<IObjectHash>>()

    const dialogContentProps = {
        type: DialogType.normal,
        // title: props.editData.text,

    }

    const {dispatch} = eventUseContext()

    // console.log(props.editData)
    // editFormData={props.editData}

    const onEditSave = async () => {
        if(editFormRef.current) {
            const newEditSave = {
                Id: editFormRef.current.values.id,
                new_category: editFormRef.current.values.category,
                new_date: editFormRef.current.values.date,
                new_detail: editFormRef.current.values.detail,
                new_eventtype: editFormRef.current.values.type.text
            }
            // dispatch(editEvent(newEditSave))
            // await editData(newEditSave)
            props.oneditcancel()
        }
    }

    return (
        <>
            <Dialog
                hidden={false}
                onDismiss={props.oneditcancel}
                dialogContentProps={dialogContentProps}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 700}}
                }}
                maxWidth={493}
                minWidth={288}
            >
                <EditEventForm editformref={editFormRef}  edititem={props.editItem}/>
                <DialogFooter>
                    <PrimaryButton onClick={onEditSave} text='Save'/>
                    <DefaultButton onClick={props.oneditcancel} text='Cancel' />
                </DialogFooter>
            </Dialog>
        </>
    )
}
