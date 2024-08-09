import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton } from '@fluentui/react'
import { title } from 'process'
import * as React from 'react'


export interface EditEventProp {
    oneditcancel: () => void
}


export const EditEvent: React.FC<EditEventProp> = (props) => {

    const dialogContentProps = {
        type: DialogType.normal,
        title: "testing",
        text: "testing"

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

            >
                <DialogFooter>
                    <PrimaryButton onClick={props.oneditcancel} text='Save'/>
                    <DefaultButton onClick={props.oneditcancel} text='Cancel' />
                </DialogFooter>
            </Dialog>
        </>
    )
}
