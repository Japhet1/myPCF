import * as React from "react"
import { Stack, StackItem } from "@fluentui/react/lib/Stack"
import { FontIcon, Icon, mergeStyleSets } from "@fluentui/react"


export interface ColumnViewProp {
    label: string,
    iconName?: string,
    value?: string,
}

export const ColumnView: React.FC<ColumnViewProp> = (props) => {


    return (
        <Stack>
            <Stack>
                <span>{props.iconName && <FontIcon iconName={props.iconName} />}<strong>{props.label}</strong></span>
            </Stack>
            <Stack>
                <StackItem>
                    {props.value}
                </StackItem>
            </Stack>
        </Stack>
    )
}