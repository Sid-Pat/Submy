import { useState } from 'react'
import UserContext from './UserContext'
import { auth } from '../config/firebase'

const UserContextProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loggedIn,setLoggedIn] = useState(auth.currentUser)
    return(
        <UserContext.Provider value={{user,setUser,loggedIn,setLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider