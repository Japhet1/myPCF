import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton, CommandBarButton } from '@fluentui/react/lib/Button';
import { hiddenContentStyle, mergeStyles } from '@fluentui/react/lib/Styling';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { IIconProps, mergeStyleSets } from '@fluentui/react';
import { CreateForm } from './createForm';



const addIcon: IIconProps = { iconName: 'Add'}

const classNames = mergeStyleSets({
    cmdButton: {
        height: '100%',
        marginRight: 10,
        // backgroundColor: '#f4f4f4',
    },
    container: {
      width: '80%'
    }

})


const dialogStyles = { main: { maxWidth: 700 } };
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
  keepInBounds: true,
};
const screenReaderOnly = mergeStyles(hiddenContentStyle);
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Create event',
  // closeButtonAriaLabel: 'Close',
  // subText: 'Do you want to send this message without a subject?',
};

export const AddLifeEvent: React.FC = () => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');

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

  return (
    <>
      <CommandBarButton iconProps={addIcon} text='Add event' onClick={toggleHideDialog} className={classNames.cmdButton} />
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
        maxWidth={493}
        minWidth={288}
      >
        <CreateForm />
        <DialogFooter>
          <PrimaryButton onClick={toggleHideDialog} text="Save" />
          <DefaultButton onClick={toggleHideDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};