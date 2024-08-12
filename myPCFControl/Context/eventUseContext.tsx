import * as React from 'react'
import { AppContext } from './eventContext'
import { useContext } from 'react'

export const eventUseContext = () => {
    const lifeEvent = useContext(AppContext)

    if(!lifeEvent) {
        throw new Error ("eventUseContext mus be use with EventContextProvider")
    }

    return lifeEvent

}