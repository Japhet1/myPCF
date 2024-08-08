import * as React from 'react'
import { Dialog, DialogFooter, DialogType } from '@fluentui/react/lib/Dialog'
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button'



interface DeleteEventProp {
    eventcancel: () => void
}


export const DeleteEvent: React.FC<DeleteEventProp> = (props) => {

    const dialogContentProps = {
        type: DialogType.normal,
        title: 'Delete?',
        subText: 'Do you want to send this message without a subject?',
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
                    <PrimaryButton onClick={props.eventcancel} text="Send" />
                    <DefaultButton onClick={props.eventcancel} text="Don't send" />
                </DialogFooter>
            </Dialog>
        </>
    )
}