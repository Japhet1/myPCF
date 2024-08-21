import { CommandBarButton, IIconProps, Stack, StackItem } from "@fluentui/react"
import { Panel, PanelContent, PanelHeader, PanelHeaderTitle } from "pcf-components/lib/panel"
import * as React from "react"
import { LifeEventTile } from "./lifeEventTile"
import { AddLifeEvent } from "./addLifeEvent"
import { mergeStyleSets } from "@fluentui/merge-styles"
import { IChoice, getOptionSet } from "pcf-core"
import { Loading, useBoolean } from "pcf-components"
import { eventUseContext } from "./Context/eventUseContext"
import { EventRecord, EventTable } from "./model"
import { addEvent, editEvent, setCategory, setEvents } from "./Context/eventContext"
import { choiceColumn, fetchxml, filterAnd, orderBy } from 'fetchxml4js';


const addIcon: IIconProps = { iconName: 'Add'}

const classNames = mergeStyleSets({
    container: {
        width: '100%'
    },
    cmdButton: {
        height: '100%',
        marginRight: 10,
    },
    tiles: {
        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.15)",
        display: "grid",
        columnGap: 12,
        rowGap: 12,
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))"
    }
})

export interface LifeEventProp {}


export const LifeEvent: React.FC<LifeEventProp> = (props) => {

    const { state, dispatch  } = eventUseContext()
    const lifeEvent  = React.useRef<EventRecord>()
    const [ openDlg, {setTrue: showDlg, setFalse: hideDlg}] = useBoolean(false)
    const [ isLoading, setIsLoading ] = React.useState(true)

    const getEvents = (category: IChoice) => {
        return state.events.filter((e) => e.new_category.key == category.key);
    };

    // console.log(dispatch)
    // console.log(state.events)
    // console.log(item)

    const onAddEvent = React.useCallback(() => {
        lifeEvent.current = new EventRecord();
        showDlg();
    }, []);

    const onAddEvent2 = React.useCallback((category: IChoice) => {
        lifeEvent.current = new EventRecord();
        // Set category and contact for the new event
        lifeEvent.current.new_category = category;
        showDlg();
    }, []);

    const onEdit = React.useCallback((event: EventRecord) => {
        lifeEvent.current = event;
        showDlg();
    }, []);

    const afterSave = React.useCallback((event: EventRecord, updating: boolean) => {
        if (updating) {
            dispatch(editEvent(event));
        }
        else {
            dispatch(addEvent(event));
        }
        hideDlg();
    }, []);

    
    const optionSet = React.useRef<IChoice[]>([])
    const eventSet = React.useRef<EventRecord[]>()
    const table = new EventTable()

    React.useEffect(() => {
        const getData = async () => {
            try {
                optionSet.current = await getOptionSet(table.LogicalName, "new_category")
                // console.log(optionSet.current)
                const data = await table.getRecordsWithFetchXml(fetchxml({ entity: table.LogicalName },
                    table.attributesAsXML(),
                    filterAnd(
                        choiceColumn('statecode').equalTo(0)
                    ),
                    orderBy({ logicalName: "new_date", desc: true })
                ));

                dispatch(setCategory(optionSet.current));
                dispatch(setEvents(data));
                setIsLoading(false)
            } catch (error) {
                console.error(error)
            }
            
        };
      
        getData();
    },[dispatch])

    return (
        <Panel>
            <PanelHeader>
                <Stack horizontal horizontalAlign="space-between" className={classNames.container}>
                    <StackItem grow={1}>
                        <PanelHeaderTitle title="Life Event" />
                    </StackItem>
                    <StackItem>
                        <CommandBarButton iconProps={addIcon} text='Add event' onClick={onAddEvent} className={classNames.cmdButton} />
                    </StackItem>
                </Stack>
            </PanelHeader>
            <PanelContent>
                <Loading text="Loading..." isLoading={isLoading}>
                    <div className={classNames.tiles}>
                        {state.category.map((category) => (
                            <LifeEventTile key={category.key} onedit={onEdit} onaddevent={onAddEvent2} item={state.events} getevent={getEvents(category)} category={category} />
                        ))}   
                    </div>
                </Loading>
                {openDlg && <AddLifeEvent oncancel={hideDlg} afterSave={afterSave} event={lifeEvent.current} lifeEventCategory={state.category}  />}
            </PanelContent>
        </Panel>
    )
}