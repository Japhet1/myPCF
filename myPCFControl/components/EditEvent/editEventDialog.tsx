import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton } from '@fluentui/react'
import { title } from 'process'
import * as React from 'react'
import { EditEventForm } from './editEventForm'
import { editData, LifeEventCategoryProp } from '../../Api/api'
import { Item } from '../../lifeEventTile'
import { FormikProps } from 'formik';
import { IObjectHash } from 'pcf-core';


export interface EditEventProp {
    oneditcancel: () => void
    editData: LifeEventCategoryProp
    editItem: Item
}


export const EditEvent: React.FC<EditEventProp> = (props) => {

    const editFormRef = React.useRef<FormikProps<IObjectHash>>()

    const dialogContentProps = {
        type: DialogType.normal,
        title: props.editData.text,

    }

    // console.log(props.editData)
    // editFormData={props.editData}

    const onEditSave = async () => {
        if(editFormRef.current) {
            const newEditSave = {
                id: editFormRef.current.values.id,
                category: editFormRef.current.values.category,
                date: editFormRef.current.values.date,
                detail: editFormRef.current.values.detail,
                type: editFormRef.current.values.type.text
            }
            await editData(newEditSave)
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
                <EditEventForm editformref={editFormRef} editformdata={props.editData} edititem={props.editItem}/>
                <DialogFooter>
                    <PrimaryButton onClick={onEditSave} text='Save'/>
                    <DefaultButton onClick={props.oneditcancel} text='Cancel' />
                </DialogFooter>
            </Dialog>
        </>
    )
}
