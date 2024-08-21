import * as React from "react"
import { Panel, PanelContent, PanelHeaderFlexible } from "pcf-components/lib/panel"
import { StackItem, Stack } from "@fluentui/react/lib/Stack"
import { ActionButton, IconButton } from "@fluentui/react/lib/Button"
import { mergeStyleSets, Text } from "@fluentui/react"
import { formatDistance, subDays } from "date-fns";
import { useBoolean } from "pcf-components"
import { EventAddDialog } from "./components/EventForm/eventAddDialog"
import { EventList } from "./components/EventPanel/eventList"
import { IChoice, getOptionSet } from "pcf-core"
import { EventRecord, EventTable } from "./model"

const stackGap = { childrenGap: 12}

const classNames = mergeStyleSets({
    iconBackgound: {
        padding: 8,
        backgroundColor: "darkBlue",
        color: "white"
    }
})

export interface Item {
    id?: string,
    category: string,
    date: string,
    detail: string,
    type: string
}

export interface LifeEventTileProp {
    category: IChoice
    item: EventRecord[]
    getevent: EventRecord[]
    onaddevent: (category: IChoice) => void
    onedit: (event: EventRecord) => void
}

const categoryiconname = (category: IChoice) => {
    switch (category.key) {
        case 10:
            return "Education"
        case 20: 
            return "Work"
        case 30:
            return "Hospital"
        default: 
            return "CubeShape"
    }
}


export const LifeEventTile: React.FC<LifeEventTileProp> = (props) => {

    const [formDlg, {setTrue: showFormDlg, setFalse: hideFormDlg}] = useBoolean(false)
    const [panelDlg, {setTrue: showPanelDlg, setFalse: hidePanelDlg}] = useBoolean(false)

    const formDataEvent = React.useRef<IChoice>()

    const onAdd = React.useCallback((event?: React.MouseEvent<HTMLAnchorElement>) => {
        event!.stopPropagation()
        props.onaddevent(props.category)
        // console.log(props.category)
        // showFormDlg()
    }, []);

    

    const count = props.item.filter(e => e.new_category.key === props.category.key).map(e => e.new_category.text)
    const detail = props.getevent.filter(e => e.new_category.key === props.category.key).map(e => ({type: e.new_eventtype, date: e.new_date}))
    const formData = props.item.filter(e => e.new_category.key === props.category.key).map(e => ({category: e.new_category.text, type: e.new_eventtype}))
    formDataEvent.current = props.category
    // console.log(count)
    // console.log(props.category)
    // console.log(props.getevent)
    // console.log(formData)

   

    return (
        <Panel onClick={showPanelDlg}>
            <PanelHeaderFlexible>
            <Stack horizontal tokens={stackGap}>
                <IconButton iconProps={{iconName: categoryiconname(props.category)}} className={classNames.iconBackgound} />
                <StackItem>
                    <Stack>
                        <StackItem>
                            <span>{props.category.text}</span>
                        </StackItem>
                    </Stack>
                    <Stack>
                        <StackItem>
                            <Text variant="smallPlus">{count.length} {count.length > 1 ? "events" : "event"}</Text>
                        </StackItem>
                    </Stack>
                </StackItem>
            </Stack>
            </PanelHeaderFlexible>
            <PanelContent>
            {count.length && detail.length > 0 ? (
                <Stack tokens={{childrenGap: 5}}>
                    <StackItem>
                        <Text variant="smallPlus">{detail[detail.length -1].type.text}</Text>
                    </StackItem>
                    <StackItem>
                        <Text variant="smallPlus">{formatDistance(subDays(new Date(detail[detail.length -1].date), 3), new Date(), { addSuffix: true })}</Text>
                    </StackItem>
                </Stack> )
                :   (
                    <ActionButton iconProps={{iconName: 'Add'}} onClick={onAdd}>Add event</ActionButton>  
                )  
            }
                {formDlg && <EventAddDialog onFormCancel={hideFormDlg} formData={props.category}/>}
                {panelDlg && <EventList listevent={props.getevent} onadd={onAdd} onEdit={props.onedit} onhide={hidePanelDlg} addevent={showFormDlg} panelHeader={props.category.text}/>}
                
            </PanelContent>
        </Panel>
    )
}