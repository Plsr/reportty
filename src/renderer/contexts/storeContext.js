import { createContext } from 'react'
import { storeKeys } from '../util/storeKeys'
import { useState, useEffect } from 'react'

export const StoreContext = createContext({
  setStoreData: () => {},
  storeData: {}
})

export const StoreProvider = ({ children }) => {
  const [storeData, setStoreData] = useState(undefined)

  useEffect(() => {
    const getStoreData = async () => {
      Promise.all(storeKeys.map(key => window.electron.ipcRenderer.getStoreValue(key))).then(storeValues => {
        const storeObj = {}
        storeKeys.forEach((key, index) => {
          storeObj[key] = storeValues[index]
        })
        setStoreData({...storeObj})
      })
    }

    getStoreData()
  }, [])

  return (
    <StoreContext.Provider value={[storeData, setStoreData]} >
      { children }
    </StoreContext.Provider>
  )
}
