import { CommandBarButton, IIconProps, Stack, StackItem } from "@fluentui/react"
import { Panel, PanelContent, PanelHeader, PanelHeaderTitle } from "pcf-components/lib/panel"
import * as React from "react"
// import { LifeEventCategoryData, LifeEventCategoryProp } from "./DummyData/categoryData"
import { LifeEventTile } from "./lifeEventTile"
import { SummaryProp } from "./DummyData/summaryData"
import { AddLifeEvent } from "./addLifeEvent"
import { mergeStyleSets } from "@fluentui/merge-styles"
import { fetchData, EventProp, fetchCategory } from "./Api/api"
import { IChoice } from "pcf-core"
// import { EventContextProvider, EventContext } from "./Context/eventContext"
import { LifeEventCategoryProp } from "./Api/api"
import { AppProvider, AppContext } from "./Context/eventContext"
import { text } from "stream/consumers"
import { useBoolean } from "pcf-components"



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

    const { state, dispatch  } = React.useContext(AppContext)

    const [lifeEventCategory, setLifeEventCategory] = React.useState<LifeEventCategoryProp[]>([])
    // const lifeEventCategory = React.useRef<LifeEventCategoryProp[]>(LifeEventCategoryData)
    const [item, setItem] = React.useState<EventProp[]>([])

    const [ openDlg, {setTrue: showDlg, setFalse: hideDlg}] = useBoolean(false)

    // const item = React.useRef<EventProp[]>([])
    // console.log(Object.entries(props.contactEvent).map(([key, value]) => ({
    //     key,
    //     value
    // })));

    // const data = Object.entries(props.contactEvent).map(([key, value]) => ({
    //     key,
    //     value
    // })).filter(evt => evt.key == "event")
    // console.log(lifeEventCategory)
    // console.log(data)
    

    // const getEvent = (category: LifeEventCategoryProp) => {
    //     const a = data.filter((evt) => evt.key == category.text).map(evt => evt.value)
    //     console.log(a)
    //     return a
    // }

    // const addEvent = () => {

    // }
    
    // console.log(state)

    React.useEffect(() => {
        const getData = async () => {
            const categories = await fetchCategory();
            setLifeEventCategory(categories)
            const events = await fetchData();
            setItem(events)
            // console.log(categories)
            // console.log(events)
            // dispatch({ type: 'SET_CATEGORY', payload: categories });
            // dispatch({ type: 'SET_EVENTS', payload: events });
        };
      
        getData();
        // const eventCategory = async () => {
        //     const data: LifeEventCategoryProp[] = await fetchCategory()
        //     setLifeEventCategory(data)
        //     dispatch({type: 'SET_DATA', payload: data})
        //     console.log(data)
        // }
        // const eventData = async () => {
        //     const data: EventProp[] = await fetchData()
        //     setItem(data)
        //     // dispatch({type: 'SET_DATA', payload: data})
        //     // item.current = data        
        // }
        // eventCategory()
        // eventData()

        // const initializeData = async () => {
        //     try {
        //         const cat = await fetchCategories();
        //         const evt = await fetchEvents();
        //         console.log(cat)
        //         console.log(evt)
        //     } catch (err) {
        //         console.error("Error initializing data:", err);
        //     }
        // };

        // initializeData();
    },[dispatch])

    const getEvents = (category: LifeEventCategoryProp) => {
        return item.filter(e => e.category === category.text).map(e => e.category)
    }

    

    // console.log(fetchCategory())

    return (
        <AppProvider>
            <Panel>
            <PanelHeader>
                <Stack horizontal horizontalAlign="space-between" className={classNames.container}>
                    <StackItem grow={1}>
                        <PanelHeaderTitle title="Life Event" />
                    </StackItem>
                    <StackItem>
                        <CommandBarButton iconProps={addIcon} text='Add event' onClick={showDlg} className={classNames.cmdButton} />
                        {/* <CommandBarButton iconProps={addIcon} text="Add event"  className={classNames.cmdButton} /> */}
                        {/* <AddLifeEvent lifeEventCategory={lifeEventCategory}  /> */}
                    </StackItem>
                </Stack>
            </PanelHeader>
            <PanelContent>
                <div className={classNames.tiles}>
                    {lifeEventCategory.map((category) => (
                        <LifeEventTile item={item} category={category} />
                    ))}   
                </div>
                {openDlg && <AddLifeEvent oncancel={hideDlg} lifeEventCategory={lifeEventCategory}  />}
            </PanelContent>
        </Panel>
        </AppProvider>

    )
}