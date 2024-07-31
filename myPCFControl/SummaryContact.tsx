import * as React from 'react';
import { Label } from '@fluentui/react';
import { Table } from './Table';
import { Grid, GridCell, GridRow } from 'pcf-components/lib/grid';
import { ContactView } from './ContactView';
import { SummaryProp, SummaryData, getSummaryData } from './DummyData/summaryData'
import { LifeEvent } from './lifeEvent';

type HandleDataFromChild = (data: SummaryProp) => void;



export const SummaryContact: React.FC = () => {

  const [contact, setContact] = React.useState<SummaryProp>(SummaryData[0])


  // setContact(summaryData)
  // console.log(contact)


  // const handleDataFromChild: HandleDataFromChild = (data) => {
  //   setContact(data);
  // };

  // React.useEffect(() => {

  // })

  return(
    <Grid>
      <GridRow rowGap colGap>
        {/* <GridCell md={3}>
          <ContactView contact={contact} />
        </GridCell> */}
          <GridCell md={9}>
            <LifeEvent />
          </GridCell>
      </GridRow>
      {/* <GridRow>
        <GridCell md={12}>
          <Table sendDataToParent={handleDataFromChild} />
        </GridCell>
      </GridRow> */}
    </Grid>

    
  )
}


