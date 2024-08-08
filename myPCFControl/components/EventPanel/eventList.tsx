import { Panel, PanelType } from '@fluentui/react/lib/Panel'
import * as React from 'react'
import { LifeEventCategoryProp } from '../../Api/api'


interface EventListProp {
    onhide: () => void
    panelData: LifeEventCategoryProp
}



export const EventList: React.FC<EventListProp> = (props) => {

    return(
        <Panel
        isOpen={true}
        onDismiss={() => props.onhide()}
        type={PanelType.smallFixedFar}
        closeButtonAriaLabel="Close"
        isFooterAtBottom={true}
        headerText={props.panelData.text}
        // styles={props.events.length > 0 ? panelStyle : emptyPanel}
        // onRenderFooterContent={onRenderFooterContent}
        >
            <>hi</>
        </Panel>
    )
}