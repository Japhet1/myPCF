import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton, CommandBarButton } from '@fluentui/react/lib/Button';
import { hiddenContentStyle, mergeStyles } from '@fluentui/react/lib/Styling';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { IIconProps, mergeStyleSets } from '@fluentui/react';
import { CreateForm } from './createForm';
import { LifeEventCategoryProp } from './DummyData/categoryData';
import { EventCategory } from './model';
import { FormikHelpers, FormikProps } from 'formik';
import { IChoice, IObjectHash } from 'pcf-core';
import { useAsync } from 'pcf-components/lib/hooks';
import { postData } from './Api/api';



const addIcon: IIconProps = { iconName: 'Add'}
const classNames = mergeStyleSets({cmdButton: {height: '100%',marginRight: 10}, container: {width: '80%'}})




// const d = EventCategory.bind({
//   category: {key: 0, text: ""},
//   type: {key: 0, text: ""},
//   detail: "",
//   date: ""
// })

const dialogContentProps = {
  type: DialogType.normal,
  title: 'Create event',
  // closeButtonAriaLabel: 'Close',
  // subText: 'Do you want to send this message without a subject?',
};

export interface AddLifeEventProp {
  lifeEventCategory: LifeEventCategoryProp[]
}

export const AddLifeEvent: React.FC<AddLifeEventProp> = (props) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');
  const [isValid, setIsValid] = React.useState(true)

  const showCategory = React.useRef(!props.lifeEventCategory)

  const lifeEvent = React.useRef<LifeEventCategoryProp[]>(props.lifeEventCategory)
  const initialEventValues = React.useRef<EventCategory>()

  const formRef = React.useRef<FormikProps<IObjectHash>>()
  
  // const setType = React.useRef<IChoice>()

  // const [execute, pending, value, error] = useAsync(async () => {
  //   const isNew = initialEventValues.current.isNew();
  //   initialEventValues.current.setValues(formRef.current.values);
  //   initialEventValues.current.mictslos_name = event.mictslos_category.text + ' (' + props.contactFullname + ')';
  //   await table.saveRecord(event, { silent: false });
  //   props.onAfterSave(event, !isNew);
  // });




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

  const callbackOnSave = React.useCallback((valid: boolean) => {
    setIsValid(valid)
  }, [])

  // console.log(props.lifeEventCategory);

  // const optionType = React.useRef<[]>()

  const onsave = async() => {
        if (formRef.current) {
          const newData = {
                category: formRef.current.values.category.text,
                date: formRef.current.values.date,
                detail: formRef.current.values.detail,
                type: formRef.current.values.type.text
            };
            await postData(newData)

            toggleHideDialog()
            
          console.log(newData)
        }
  }


  

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
        <CreateForm formRef={formRef} event={initialEventValues.current} typeOption={lifeEvent.current} setValid={callbackOnSave} showCategory={showCategory.current} />
        {/* <CreateForm event={lifeEvent.current} setValid={callbackOnSave} categoryOption={props.lifeEventCategory} /> */}
        <DialogFooter>
          <PrimaryButton onClick={onsave} text="Save" disabled={!isValid} />
          <DefaultButton onClick={toggleHideDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};