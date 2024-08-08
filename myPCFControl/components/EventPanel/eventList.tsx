import { Panel, PanelType } from '@fluentui/react/lib/Panel'
// import { Panel } from 'pcf-components/lib/Panel'
import * as React from 'react'


interface EventListProp {
    onhide: () => void
}



export const EventList: React.FC<EventListProp> = (props) => {

    return(
        <Panel
        isOpen={true}
        onDismiss={() => props.onhide()}
        type={PanelType.smallFixedFar}
        closeButtonAriaLabel="Close"
        isFooterAtBottom={true}
        // headerText={props.header}
        // styles={props.events.length > 0 ? panelStyle : emptyPanel}
        // onRenderFooterContent={onRenderFooterContent}
        >
            <>hi</>
        </Panel>
    )
}