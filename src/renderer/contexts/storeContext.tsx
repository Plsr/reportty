import { createContext } from 'react'
import { storeKeys } from '../util/storeKeys'
import { useState, useEffect } from 'react'
import { 
  StoreInterface, 
  DEFAULT_BREAK_TIME,
  DEFAULT_LONG_BREAK_TIME,
  DEFAULT_WORK_TIME 
} from 'main/storeSchema'

// FIXME: Proper typing
export type StoreContextType = {
  setStoreData(storeObject: object): void
  storeData: StoreInterface
}

const emptyStore: StoreInterface = {
  breakTime: DEFAULT_BREAK_TIME,
  longBreakTime: DEFAULT_LONG_BREAK_TIME,
  workTime: DEFAULT_WORK_TIME,
  autoStartNextInterval: false,
  finishedTimers: {
    currentDate: new Date(),
    timers: []
  },
  lastIntervalType: 'break'
}

export const StoreContext = createContext<StoreContextType>({
  setStoreData: () => {},
  storeData: emptyStore
})

export const StoreProvider = ({ children }: Props) => {
  const [storeData, setStoreData] = useState(emptyStore)

  useEffect(() => {
    const getStoreData = async () => {
      Promise.all(storeKeys.map(key => window.electron.ipcRenderer.getStoreValue(key))).then(storeValues => {
        const storeObj = {} as any// FIXME: Proper tying
        storeKeys.forEach((key, index) => {
          storeObj[key] = storeValues[index]
        })
        setStoreData({...storeObj as StoreInterface})
      })
    }

    getStoreData()
  }, [])

  return (
    <StoreContext.Provider value={{storeData, setStoreData}} >
      { children }
    </StoreContext.Provider>
  )
}

interface Props {
  children: React.ReactNode
}
