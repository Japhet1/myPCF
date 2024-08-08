import * as React from 'react'
import { Dialog, DialogFooter, DialogType } from '@fluentui/react/lib/Dialog'
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button'
import { deleteData } from '../Api/api'



interface DeleteEventProp {
    eventcancel: () => void
    // eventid: React.MutableRefObject<string>
    eventid: string
}


export const DeleteEvent: React.FC<DeleteEventProp> = (props) => {

    const dialogContentProps = {
        type: DialogType.normal,
        title: 'Delete?',
        subText: 'Performing this action will delete the selected item',
    };

    const onEventDelete = async () => {
        if(props.eventid) {
            await deleteData(props.eventid)
        }
    }

    return (
        <>
            <Dialog
                hidden={false}
                onDismiss={props.eventcancel}
                dialogContentProps={dialogContentProps}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 700}},
                }}
            >
                <DialogFooter>
                    <PrimaryButton onClick={onEventDelete} text="Ok" />
                    <DefaultButton onClick={props.eventcancel} text="Cancel" />
                </DialogFooter>
            </Dialog>
        </>
    )
}