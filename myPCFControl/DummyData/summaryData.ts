export interface SummaryProp {
    id: number
    name: string,
    type: string,
    category: string,
    phone: string,
    email: string,
    branch: string,
    gendercode: string,
    dateofbirth: string,
    address: string,
    preferredcontactmethod: string,
    occupation: string,
    employername: string,
    annualincome: string,
    companyregistrationnumber: string,
    companyplaceofincorporation: string,
    companyoperation: string,
    yearofoperation: string,
    bank: string,
    bankbranch: string
}

export const SummaryData: SummaryProp[] = [
    {
        id: 1,
        name: "James",
        type: "Individual",
        category: "Customer",
        phone: "022789012",
        email: "japh@gmail.com",
        branch: "madina",
        gendercode: "M",
        dateofbirth: "05-July-1994",
        address: "Adenta",
        preferredcontactmethod: "any",
        occupation: "Teacher",
        employername: "Galaxy International",
        annualincome: "30000",
        companyregistrationnumber: "",
        companyplaceofincorporation: "",
        companyoperation: "",
        yearofoperation: "",
        bank: "UBA",
        bankbranch: "Madina"
    },
    {
        id: 2,
        name: "Redco",
        type: "Company",
        category: "Customer",
        phone: "022789012",
        email: "japh@gmail.com",
        branch: "madina",
        gendercode: "",
        dateofbirth: "",
        address: "Botwe",
        preferredcontactmethod: "any",
        occupation: "",
        employername: "",
        annualincome: "",
        companyregistrationnumber: "ABN-566",
        companyplaceofincorporation: "Ghana",
        companyoperation: "Transport",
        yearofoperation: "5 years",
        bank: "Ecobank",
        bankbranch: "Tesano"
    }
]


export const getSummaryData = async () => {
    return SummaryData.map(id => id)
}