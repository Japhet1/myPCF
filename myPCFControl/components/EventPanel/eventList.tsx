import { Panel, PanelType } from '@fluentui/react/lib/Panel'
import * as React from 'react'
import { LifeEventCategoryProp } from '../../Api/api'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { List } from '@fluentui/react/lib/List'
import { StackItem, Stack } from '@fluentui/react/lib/Stack'
import { Text } from '@fluentui/react/lib/Text'
import { EventProp } from '../../Api/api'
import { Item } from '../../lifeEventTile'


interface EventListProp {
    onhide: () => void
    panelData: LifeEventCategoryProp
    addevent: () => void
    listevent: Item[]
}



export const EventList: React.FC<EventListProp> = (props) => {

    const Data = React.useRef<{}[]>()


    const footerContent = React.useCallback(() => (
        <div>
            <PrimaryButton onClick={props.addevent}>Add event</PrimaryButton>
        </div>

    ), [props.addevent])

    const onRenderCell = (item: Item, index?: number) => {
        return (
            <div>
                <Stack>
                    <StackItem>
                        <Text>{item.type}</Text>
                    </StackItem>
                    <StackItem>
                        <Text>{item.detail}</Text>
                    </StackItem>
                    <StackItem>
                        <Text>{item.date}</Text>
                    </StackItem>

                </Stack>
            </div>
        )
    }

    Data.current = props.listevent

    

    console.log(props.listevent)

    return(
        <Panel
        isOpen={true}
        onDismiss={() => props.onhide()}
        type={PanelType.smallFixedFar}
        closeButtonAriaLabel="Close"
        isFooterAtBottom={true}
        headerText={props.panelData.text}
        // styles={props.events.length > 0 ? panelStyle : emptyPanel}
        onRenderFooterContent={footerContent}
        >
            <>
            {props.listevent.length > 0 && <List items={props.listevent.reverse()} onRenderCell={onRenderCell} />}

            </>
        </Panel>
    )
}