import * as React from "react"
import { LifeEventCategoryProp } from "./DummyData/categoryData"
import { Panel, PanelHeader, PanelHeaderFlexible } from "pcf-components/lib/panel"
import { StackItem, Stack } from "@fluentui/react/lib/Stack"
import { IconButton } from "@fluentui/react/lib/Button"
import { mergeStyleSets, Text } from "@fluentui/react"

const stackGap = {childrenGap: 12}


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
}

const categoryiconname = (category: LifeEventCategoryProp) => {
    switch (category.key) {
        case 1:
            return "Education"
        case 2: 
            return "Work"
        case 3:
            return "Hospital"
        default: 
            return "CubeShape"
    }
}


export const LifeEventTile: React.FC<LifeEventTileProp> = (props) => {

    // console.log(props.category.text)

    // console.log(props.event)

    return (
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
                            <Text variant="smallPlus"> events</Text>
                        </StackItem>
                    </Stack>
                    
                    
                </StackItem>
            </Stack>
        </PanelHeaderFlexible>
        // <>hi</>
    )
}