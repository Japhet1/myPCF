import { Panel, PanelType } from '@fluentui/react/lib/Panel'
import * as React from 'react'
import { LifeEventCategoryProp } from '../../Api/api'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { List } from '@fluentui/react/lib/List'
import { StackItem, Stack } from '@fluentui/react/lib/Stack'
import { Text } from '@fluentui/react/lib/Text'
import { EventProp } from '../../Api/api'
import { Item } from '../../lifeEventTile'
import { mergeStyleSets } from '@fluentui/react'
import { format } from 'date-fns'
import { ConfirmDialog, useBoolean } from 'pcf-components'
import {  ContextMenuRenderer, IContexMenuCommandExecuteParameters } from 'pcf-components/lib/fieldrenderers'
// import { MoreVertical} from '@fluentui/react/lib/Icon'
import { IconButton } from '@fluentui/react/lib/Button';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu'
import { DeleteEvent } from '../deleteEvent'
import { EditEvent } from '../EditEvent/editEventDialog'



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
    panelData: LifeEventCategoryProp
    addevent: () => void
    listevent: Item[]
}



export const EventList: React.FC<EventListProp> = (props) => {

    const [deleteDlg, {setTrue: showDeleteDlg, setFalse: hideDeleteDlg}] = useBoolean(false)
    const [editDlg, {setTrue: showEditDlg, setFalse: hideEditDlg}] = useBoolean(false)

    const [editItem, setEditItem] = React.useState<Item>()
    const [itemId, setItemId] = React.useState('')
    // const itemId = React.useRef<string>('')

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

    const onContextMenuItemExecute = (event: IContexMenuCommandExecuteParameters<Item>) => {
        // selectedItem.current = event.item;
        setItemId(event.item.id)
        setEditItem(event.item)
        switch (event.key) {
            case 'edit':
                showEditDlg();
                break;
            case 'delete':
                showDeleteDlg()
                break;
        }
    };


    const footerContent = React.useCallback(() => (
        <div>
            <PrimaryButton onClick={props.addevent}>Add event</PrimaryButton>
        </div>

    ), [props.addevent])

    // console.log(props.listevent.reverse())
    // console.log(itemId)
    // console.log(editItem)

    const onRenderCell = (item: Item, index?: number) => {
        // setItemId(item.id)
        // setEditItem(item)
        // itemId.current = item.id
        // console.log(item.id)
        return (
            <div key={item.id}>
                <Stack horizontal horizontalAlign='space-between' className={classNames.list}>
                    <Stack>
                        <StackItem>
                            <Text className={classNames.header}>{item.type}</Text>
                        </StackItem>
                        <StackItem>
                            <Text>{format(new Date(item.date), "MMMM d, yyyy")}</Text>
                        </StackItem>
                        <StackItem>
                            <Text className={classNames.detail}>{item.detail}</Text>
                        </StackItem>
                    </Stack>
                    <StackItem>
                        {/* <IconButton
                            iconProps={{ iconName: 'MoreVertical' }}
                            onClick={onClick}  
                        /> */}
                        <ContextMenuRenderer className='MoreVertical' menuItems={menuItems} onExecute={onContextMenuItemExecute} item={item} key={item?.id}  /> 
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
        headerText={props.panelData.text}
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
                {deleteDlg && <DeleteEvent eventcancel={hideDeleteDlg} eventid={itemId} />}
                {editDlg && <EditEvent oneditcancel={hideEditDlg} editData={props.panelData} editItem={editItem} />}
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