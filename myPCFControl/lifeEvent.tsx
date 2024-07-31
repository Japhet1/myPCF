import { CommandBarButton, IIconProps, Stack, StackItem } from "@fluentui/react"
import { Panel, PanelContent, PanelHeader, PanelHeaderTitle } from "pcf-components/lib/panel"
import * as React from "react"
import { LifeEventCategoryData, LifeEventCategoryProp } from "./DummyData/categoryData"
import { LifeEventTile } from "./lifeEventTile"
import { SummaryProp } from "./DummyData/summaryData"
import { AddLifeEvent } from "./addLifeEvent"
import { mergeStyleSets } from "@fluentui/merge-styles"


const addIcon: IIconProps = { iconName: 'Add'}

const classNames = mergeStyleSets({
    container: {
        width: '100%'
    },
    cmdButton: {
        height: '100%',
        marginRight: 10,
        // backgroundColor: '#f4f4f4',
    },
    tiles: {
        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.15)",
        display: "grid",
        columnGap: 12,
        rowGap: 12,
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))"
    }
})

export interface LifeEventProp {
    // contactEvent?: {}[]
    // contactEvent: SummaryProp
}


export const LifeEvent: React.FC<LifeEventProp> = (props) => {

    const [lifeEventCategory, setLifeEventCategory] = React.useState<LifeEventCategoryProp[]>(LifeEventCategoryData)

    // console.log(Object.entries(props.contactEvent).map(([key, value]) => ({
    //     key,
    //     value
    // })));

    // const data = Object.entries(props.contactEvent).map(([key, value]) => ({
    //     key,
    //     value
    // })).filter(evt => evt.key == "event")
    // // console.log(lifeEventCategory)
    // console.log(data)
    

    // const getEvent = (category: LifeEventCategoryProp) => {
    //     const a = data.filter((evt) => evt.key == category.text).map(evt => evt.value)
    //     console.log(a)
    //     return a
    // }

    // const addEvent = () => {

    // }

    return (
        <Panel>
            <PanelHeader>
                <Stack horizontal horizontalAlign="space-between" className={classNames.container}>
                    <StackItem grow={1}>
                        <PanelHeaderTitle title="Life Event" />
                    </StackItem>
                    <StackItem>
                        {/* <CommandBarButton iconProps={addIcon} text="Add event"  className={classNames.cmdButton} /> */}
                        <AddLifeEvent />
                    </StackItem>
                </Stack>
            </PanelHeader>
            <PanelContent>
                <div className={classNames.tiles}>
                    {lifeEventCategory && lifeEventCategory.map((category) => (
                        <LifeEventTile category={category} />
                    ))}   
                </div>
            </PanelContent>
        </Panel>
    )
}