import * as React from "react"
import { LifeEventCategoryProp } from "./DummyData/categoryData"
import { Panel, PanelContent, PanelHeader, PanelHeaderFlexible } from "pcf-components/lib/panel"
import { StackItem, Stack } from "@fluentui/react/lib/Stack"
import { IconButton } from "@fluentui/react/lib/Button"
import { mergeStyleSets, Text } from "@fluentui/react"
import { fetchData, EventProp } from "./Api/api"
import { formatDistance, subDays } from "date-fns";

const stackGap = { childrenGap: 12}


const classNames = mergeStyleSets({
    iconBackgound: {
        padding: 8,
        backgroundColor: "darkBlue",
        color: "white"
    }
})

export interface LifeEventTileProp {
    category: LifeEventCategoryProp,
    // event: any[]
    item: EventProp[]
}

const categoryiconname = (category: LifeEventCategoryProp) => {
    switch (category.key) {
        case "1":
            return "Education"
        case "2": 
            return "Work"
        case "3":
            return "Hospital"
        default: 
            return "CubeShape"
    }
}


export const LifeEventTile: React.FC<LifeEventTileProp> = (props) => {

    // console.log(props.category.text)

    // console.log(props.event)

    // const newEvent = JSON.parse(fetchData())

    // const countEvents = newEvent.filter()
    // console.log(fetchData())
    // const count = props.item.reduce((acc, item) => {
    //     acc[item.category] = (acc[item.category] || 0) + 1;
    //     return acc;
    // }, {});

    // const count = 0
    const count = props.item.filter(e => e.category === props.category.text).map(e => e.category)

    const detail = props.item.filter(e => e.category === props.category.text).map(e => ({type: e.type, date: e.date}))
    
    // console.log(count)
    console.log(detail)
    // console.log(props.item)

    return (
        <Panel>
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
                            <Text variant="smallPlus">{`${count.length} ${props.item.length > 1 ? "events" : "event"}`}</Text>
                        </StackItem>
                    </Stack>
                </StackItem>
            </Stack>
            </PanelHeaderFlexible>
            <PanelContent>
            {count.length && detail.length > 0 ? 
                <Stack tokens={{childrenGap: 5}}>
                    <StackItem>
                        <Text variant="smallPlus">{detail[detail.length -1].type}</Text>
                    </StackItem>
                    <StackItem>
                        <Text variant="smallPlus">{formatDistance(subDays(new Date(detail[detail.length -1].date), 3), new Date(), { addSuffix: true })}</Text>
                    </StackItem>
                </Stack>
            : ""    
            }
                
            </PanelContent>
        </Panel>
    )
}