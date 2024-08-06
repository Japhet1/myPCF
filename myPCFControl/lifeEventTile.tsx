import * as React from "react"
import { LifeEventCategoryProp } from "./DummyData/categoryData"
import { Panel, PanelHeader, PanelHeaderFlexible } from "pcf-components/lib/panel"
import { StackItem, Stack } from "@fluentui/react/lib/Stack"
import { IconButton } from "@fluentui/react/lib/Button"
import { mergeStyleSets, Text } from "@fluentui/react"
import { fetchData, EventProp } from "./Api/api"

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
    // item: EventProp[]
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

    const count = 0

    // console.log(count)

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
                            <Text variant="smallPlus">{count} events</Text>
                        </StackItem>
                    </Stack>
                </StackItem>
            </Stack>
            </PanelHeaderFlexible>
        </Panel>
    )
}