import * as React from 'react'
import { Dialog, DialogFooter, DialogType } from '@fluentui/react/lib/Dialog'
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button'
import { deleteEvent } from '../Context/eventContext'
import { eventUseContext } from '../Context/eventUseContext'
import { Loading, useAsync } from 'pcf-components'
import { EventRecord, EventTable } from '../model'

interface DeleteEventProp {
    eventcancel: () => void
    eventid: EventRecord
}

export const DeleteEvent: React.FC<DeleteEventProp> = (props) => {

    const {dispatch} = eventUseContext()
    const row = new EventTable()
    const [ isLoading, setIsLoading ] = React.useState(true)

    const [onDeleteHandler, pending, error] = useAsync(async () => {
        if (props.eventid) {
            await row.deleteRecord(props.eventid);
            dispatch(deleteEvent(props.eventid.Id))
            props.eventcancel()
        }
    });

    const dialogContentProps = {
        type: DialogType.normal,
        title: 'Delete?',
        subText: 'Performing this action will delete the selected item',
    };
    
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
                    <PrimaryButton onClick={onDeleteHandler} text="Ok" />
                    <DefaultButton onClick={props.eventcancel} text="Cancel" />
                </DialogFooter>
            </Dialog>
        </>
    )
}