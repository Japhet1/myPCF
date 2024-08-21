import { Panel, PanelType } from '@fluentui/react/lib/Panel'
import * as React from 'react'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { List } from '@fluentui/react/lib/List'
import { StackItem, Stack } from '@fluentui/react/lib/Stack'
import { Text } from '@fluentui/react/lib/Text'
import { mergeStyleSets } from '@fluentui/react'
import { format } from 'date-fns'
import { useBoolean } from 'pcf-components'
import {  ContextMenuRenderer, IContexMenuCommandExecuteParameters } from 'pcf-components/lib/fieldrenderers'
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu'
import { DeleteEvent } from '../deleteEvent'
import { EditEvent } from '../EditEvent/editEventDialog'
import { Event } from '../../Context/eventContext'
import { EventRecord } from '../../model'


const classNames = mergeStyleSets({
    backColor: {
        backgroundColor: "lightBlue",
    },
    header: {
        fontWeight: "bold"
    },
    detail: {
        color: "gray"
    },
    list: {
        padding: 10
    }
})

interface EventListProp {
    onhide: () => void
    panelHeader: string
    addevent: () => void
    listevent: EventRecord[]
    onadd: () => void
    onEdit: (event: EventRecord) => void
}


export const EventList: React.FC<EventListProp> = (props) => {

    const [deleteDlg, {setTrue: showDeleteDlg, setFalse: hideDeleteDlg}] = useBoolean(false)
    const [editDlg, {setTrue: showEditDlg, setFalse: hideEditDlg}] = useBoolean(false)

    const [editItem, setEditItem] = React.useState<Event>()

    const [menuVisible, setMenuVisible] = React.useState(false);
    const [target, setTarget] = React.useState(null);
  
    const menuItems = React.useMemo(() =>[
      {
        key: 'edit',
        text: 'Edit',
        iconProps: { iconName: 'Edit' },
        // onClick: () => showEditDlg()
      },
      {
        key: 'delete',
        text: 'Delete',
        iconProps: { iconName: 'Delete' },
        // onClick: () => showDeleteDlg()
      }
    ], [])
  
    const onClick = (event) => {
      setTarget(event.currentTarget);
      setMenuVisible(!menuVisible);
      
    };
    
    const selectedItem = React.useRef<EventRecord>(null)

    const onContextMenuItemExecute = (event: IContexMenuCommandExecuteParameters<EventRecord>) => {
        selectedItem.current = event.item;
        switch (event.key) {
            case 'edit':
                props.onEdit(selectedItem.current)
                // showEditDlg();
                break;
            case 'delete':
                showDeleteDlg()
                break;
        }
    };

    const footerContent = React.useCallback(() => (
        <div>
            <PrimaryButton onClick={props.onadd}>Add event</PrimaryButton>
        </div>

    ), [props.onadd])

    // console.log(props.listevent.reverse())
    // console.log(itemId)
    // console.log(editItem)

    const onRenderCell = (item: EventRecord, index?: number) => {
        return (
            <div key={item.Id}>
                <Stack horizontal horizontalAlign='space-between' className={classNames.list}>
                    <Stack>
                        <StackItem>
                            <Text className={classNames.header}>{item.new_eventtype.text}</Text>
                        </StackItem>
                        <StackItem>
                            <Text>{format(new Date(item.new_date), "MMMM d, yyyy")}</Text>
                        </StackItem>
                        <StackItem>
                            <Text className={classNames.detail}>{item.new_detail}</Text>
                        </StackItem>
                    </Stack>
                    <StackItem>
                        <ContextMenuRenderer className='MoreVertical' menuItems={menuItems} onExecute={onContextMenuItemExecute} item={item} key={item?.Id}  /> 
                    </StackItem>
                </Stack>
            </div>
        )
    }
    // console.log(props.listevent)

    return(
        <Panel
        isOpen={true}
        onDismiss={() => props.onhide()}
        type={PanelType.smallFixedFar}
        closeButtonAriaLabel="Close"
        isFooterAtBottom={true}
        headerText={props.panelHeader}
        onRenderFooterContent={footerContent}
        >
            <>
                {props.listevent.length > 0 ? 
                    <List items={props.listevent.reverse()} onRenderCell={onRenderCell} />
                    :
                    <Stack verticalAlign='center' tokens={{childrenGap: 15}}>
                        <StackItem><Text>Add life event to this category</Text></StackItem>
                        <Stack>{footerContent()}</Stack>
                    </Stack>
                }
                {deleteDlg && <DeleteEvent eventcancel={hideDeleteDlg} eventid={selectedItem.current} />}
                {editDlg && <EditEvent oneditcancel={hideEditDlg}  editItem={editItem} />}
                {menuVisible && (
                    <ContextualMenu
                        items={menuItems}
                        target={target}
                        onDismiss={() => setMenuVisible(false)}
                    />
                )}
            </>
        </Panel>
    )
}