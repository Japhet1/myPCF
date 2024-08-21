import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { IIconProps, mergeStyleSets } from '@fluentui/react';
import { CreateForm } from './createForm';
import { FormikProps } from 'formik';
import { IChoice, IObjectHash } from 'pcf-core';
import { useAsync } from 'pcf-components/lib/hooks';
import { addEvent } from './Context/eventContext';
import { eventUseContext } from './Context/eventUseContext';
import { EventRecord, EventTable } from './model';
import { Loading, BlockedMessageBar } from 'pcf-components';
import { MessageBarType } from '@fluentui/react/lib/MessageBar';




export interface AddLifeEventProp {
  lifeEventCategory: IChoice[]
  oncancel: () => void
  event: EventRecord
  afterSave: (event: EventRecord, updating: boolean) => void
}

export const AddLifeEvent: React.FC<AddLifeEventProp> = (props) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');
  const [isValid, setIsValid] = React.useState(true)
  const [ isLoading, setIsLoading ] = React.useState(true)

  const showCategory = React.useRef(!props.event.new_category)
  const lifeEvent = React.useRef<IChoice[]>()
  lifeEvent.current = props.lifeEventCategory
  const formRef = React.useRef<FormikProps<IObjectHash>>()
  const table = new EventTable()

  const data = React.useRef<EventRecord>(props.event)



  const dialogContentProps = {
    type: DialogType.normal,
    title: data.current.new_category ? data.current.new_category.text : 'Create event',
  };
   
  console.log(data)

  const { dispatch  } = eventUseContext()

  props.event = new EventRecord()

  const [execute, pending, value, error] = useAsync(async () => {
    const isNew = props.event.isNew();
    props.event.setValues(formRef.current.values);
    props.event.new_name = props.event.new_category.text;
    dispatch(addEvent(props.event))
    await table.saveRecord(props.event, { silent: false });
    // props.afterSave(props.event, !isNew);
  });

  const callbackOnSave = React.useCallback((valid: boolean) => {
    setIsValid(valid)
  }, [])

  const callBackOnLoading = React.useCallback((load: boolean) => {
    setIsLoading(load)
  }, [])
  // console.log(props.lifeEventCategory);

  // const optionType = React.useRef<[]>()

  const onsave = async() => {
    if (formRef.current) {
      execute()
      props.oncancel()
    }
  }

  return (
    <>
      <Dialog
        hidden={false}
        onDismiss={props.oncancel}
        dialogContentProps={dialogContentProps}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 700}},
        }}
        maxWidth={493}
        minWidth={288}
      >
        {/* <Loading text="working on" isLoading={pending || isLoading}> */}
          {error != null && <BlockedMessageBar message={error.message} messageBarType={MessageBarType.error} />}
          <CreateForm 
            formRef={formRef} 
            event={data.current} 
            typeOption={lifeEvent.current} 
            setValid={callbackOnSave} 
            showCategory={showCategory.current} 
            setLoading={callBackOnLoading}
          />
        {/* </Loading> */}
        <DialogFooter>
          <PrimaryButton onClick={onsave} text="Save" disabled={!isValid} />
          <DefaultButton onClick={props.oncancel} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};