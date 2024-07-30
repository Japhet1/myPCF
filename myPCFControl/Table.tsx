import * as React from 'react'
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from "@fluentui/react"
import { SummaryProp, SummaryData } from './DummyData/summaryData'



// const v = getSummaryData()

interface ChildProps {
    sendDataToParent: (data: SummaryProp) => void;
  }


export const Table: React.FC<ChildProps> = ({ sendDataToParent }) => {

    const [data, setData] = React.useState<SummaryProp[]>(SummaryData)


    // console.log(SummaryData)

    const ListColumn: IColumn[] = [
        {
            key: 'name',
            name: 'Full Name',
            fieldName: 'name',
            minWidth: 100,
            maxWidth: 150,
            isResizable: true,
            onRender:(item: any, index?: number, column?: IColumn) => {
                return <span>{item.name}</span>
            }
        },
        {
            key: 'name',
            name: 'Contact Type',
            fieldName: 'type',
            minWidth: 100,
            maxWidth: 150,
            isResizable: true,
            onRender:(item: any, index?: number, column?: IColumn) => {
                return <span>{item.type}</span>
            }
        },
        {
            key: 'name',
            name: 'Category',
            fieldName: 'category',
            minWidth: 100,
            maxWidth: 150,
            isResizable: true,
            onRender:(item: any, index?: number, column?: IColumn) => {
                return <span>{item.category}</span>
            }
        },
        {
            key: 'name',
            name: 'Phone',
            fieldName: 'phone',
            minWidth: 100,
            maxWidth: 150,
            isResizable: true,
            onRender:(item: any, index?: number, column?: IColumn) => {
                return <span>{item.phone}</span>
            }
        },
        {
            key: 'name',
            name: 'Email',
            fieldName: 'email',
            minWidth: 100,
            maxWidth: 150,
            isResizable: true,
            onRender:(item: any, index?: number, column?: IColumn) => {
                return <span>{item.email}</span>
            }
        },
        {
            key: 'name',
            name: 'Branch',
            fieldName: 'branch',
            minWidth: 100,
            maxWidth: 150,
            isResizable: true,
            onRender:(item: any, index?: number, column?: IColumn) => {
                return <span>{item.branch}</span>
            }
        }
    ]
    const _onActiveItemChanged = (item: any): void => {
        // console.log(`Item invoked: ${JSON.stringify(item)}`);
        sendDataToParent(item)
    };

    React.useEffect(() => {
        const a = []

    })
    return (
        <DetailsList 
            columns={ListColumn}
            items={data}
            isHeaderVisible={true}
            selectionMode={SelectionMode.none}
            onActiveItemChanged={_onActiveItemChanged}
            
        />
        
        

    )
}