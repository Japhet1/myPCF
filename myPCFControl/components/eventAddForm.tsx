import * as React from 'react'
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton, CommandBarButton } from '@fluentui/react/lib/Button';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { AddEventForm } from './addEventForm';
import { LifeEventCategoryProp } from '../Api/api';


export interface Item {
    category: string,
    type: string
}
export interface EventAddFormProp {
    onFormCancel: () => void
    formData: LifeEventCategoryProp
}



export const EventAddForm: React.FC<EventAddFormProp> = (props) => {

    const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
    const labelId: string = useId('dialogLabel');
    const subTextId: string = useId('subTextLabel');
    const [isValid, setIsValid] = React.useState(true)

    const dialogContentProps = {
        type: DialogType.normal,
        title: props.formData.text,
        // closeButtonAriaLabel: 'Close',
        // subText: 'Do you want to send this message without a subject?',
      };

      
    const modalProps = React.useMemo(
        () => ({
          // titleAriaId: labelId,
          // subtitleAriaId: subTextId,
          isBlocking: false,
          styles: { main: { maxWidth: 700}},
          // dragOptions: isDraggable ? dragOptions : undefined,
        }),
        [isDraggable, labelId, subTextId],
      );

    console.log(props.formData)

    return (
        <>
            <Dialog
                hidden={false}
                onDismiss={props.onFormCancel}
                dialogContentProps={dialogContentProps}
                modalProps={modalProps}
                maxWidth={493}
                minWidth={288}
            >
                <AddEventForm eventForm={props.formData}/>
                
                <DialogFooter>
                    <PrimaryButton onClick={props.onFormCancel} text="Save" disabled={!isValid} />
                    <DefaultButton onClick={props.onFormCancel} text="Cancel" />
                </DialogFooter>
            </Dialog>
        </>
    )
}