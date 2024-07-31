import * as React from "react"
import { Panel, PanelContent, PanelHeader, PanelHeaderTitle } from "pcf-components/lib/panel"
import { Stack, StackItem } from "@fluentui/react/lib/Stack"
import { SummaryProp } from './DummyData/summaryData'
import { Text } from '@fluentui/react/lib/Text'
import { ColumnView } from "./columnView"
import { Separator } from "@fluentui/react"
import { mergeStyleSets } from "@fluentui/react"



export interface ContactViewProp {
    contact: SummaryProp
}


const classNames = mergeStyleSets({
    container: {
        marginTop: '15px', // Adjust padding as needed
        // marginBottom: '15px',
    },
    span: {
        marginRight: '8px', // Space between spans
        backgroundColor: '#f4f4f4', // Gray background color
        padding: '4px',
    },
  });



export const ContactView: React.FC<ContactViewProp> = (props) => {

    const { contact } = props
    // console.log(contact)

    return (
        <Panel>
            <PanelHeader>
                <Stack horizontal horizontalAlign="space-between">
                    <StackItem>
                        <PanelHeaderTitle title="Contact Snapshot"/>
                    </StackItem>
                </Stack>
            </PanelHeader>
            <PanelContent>
                <Stack>
                    <StackItem>
                        <Text variant="xLarge">{contact.name}</Text>
                        <div>
                            <Text variant="xSmall" className={classNames.span}>{contact.type}</Text>
                            <Text variant="xSmall" className={classNames.span}>{contact.category}</Text>
                        </div>
                        <div>ID: <strong>{contact.id}</strong></div>
                    </StackItem>
                    <Separator/>
                    <StackItem>
                        {contact.type === "Individual" && 
                            <>
                               <ColumnView label="Gender" iconName="People" value={contact.gendercode} /> 
                               <ColumnView label="Date of birth" iconName="Calendar" value={contact.dateofbirth} />
                            </>
                        }
                        <ColumnView label="Phone" iconName="Phone" value={contact.phone} />
                        <ColumnView label="Email" iconName="Mail" value={contact.email} />
                        <ColumnView label="Address" iconName="Home" value={contact.address} />
                        <ColumnView label="Prefer method of contact" iconName="" value={contact.preferredcontactmethod} />
                        <Separator/>
                        {contact.type === "Company" ?
                            (<>
                                <ColumnView label="Company registration number" iconName="" value={contact.companyregistrationnumber} />
                                <ColumnView label="Company place of incorporation" iconName="" value={contact.companyplaceofincorporation} />
                                <ColumnView label="Company operation" iconName="" value={contact.companyoperation} />
                                <ColumnView label="Year of operation" iconName="" value={contact.yearofoperation} />
                            </>) :
                            (<>
                                <ColumnView label="Occupation" iconName="" value={contact.occupation} /> 
                                <ColumnView label="Employer name" iconName="" value={contact.employername} /> 
                                <ColumnView label="Annual income" iconName="" value={contact.annualincome} /> 
                            </>)
                        }
                        <ColumnView label="Bank" iconName="" value={contact.bank} />
                        <ColumnView label="Bank branch" iconName="" value={contact.bankbranch} />
                    </StackItem>
                </Stack>
            </PanelContent>
        </Panel>
    )
}