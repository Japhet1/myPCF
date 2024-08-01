export interface LifeEventCategoryProp {
    key: string,
    text: string,
    type: any[]
}

export const LifeEventCategoryData: LifeEventCategoryProp[] = [
    {
        key: "1",
        text: "Education",
        type: [
            { key: "1", text: "Associate degree" },
            { key: "2", text: "Bachelor degree"}, 
            { key: "3", text: "Doctorate degree" },
            { key: "4", text: "High school" },
            { key: "5", text: "Master degree" }, 
            { key: "6", text: "Other" } , 
        ]
    },
    {
        key: "2",
        text: "Employment",
        type: [
            { key: "1", text: "Business closed" },
            { key: "2", text: "Business started"}, 
            { key: "3", text: "Job started" },
            { key: "4", text: "Job ended" },
            { key: "5", text: "Retirement" }, 
            { key: "6", text: "Other" } ,
        ]
    },
    {
        key: "3",
        text: "Health",
        type: [
            { key: "1", text: "Hospital/Facility stay" },
            { key: "2", text: "Procedure"}, 
            { key: "3", text: "Serious illness" },
            { key: "4", text: "Other" } , 
        ]
    },
    {
        key: "4",
        text: "Other",
        type: [{ key: "1", text: "Other" } ,]
    }
]