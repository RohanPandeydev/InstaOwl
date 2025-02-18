import { createContext, useEffect, useState } from 'react'
import React from 'react'

const ContentContext = createContext()

const ContentData = ({ children }) => {
  const [classData, setClassData] = useState([])
const [redirectURL,setRedirectURL]=useState(null)
  const [token, setToken] = useState()

  const myuserData = JSON.parse(localStorage.getItem('insta_owl_user_details'))
  const [class_List, setClass_List] = useState([])
  const [search_List, setSearch_List] = useState([])



  const [user_Data, setUser_Data] = useState(myuserData ? myuserData : {})


















  return (
    <ContentContext.Provider value={{redirectURL,setRedirectURL, classData, setClassData, setToken, token, user_Data, setUser_Data, class_List, setClass_List, search_List, setSearch_List }}>
      {children}
    </ContentContext.Provider>
  )
}

export default ContentData
export { ContentContext }
