import { createContext, useState, useEffect } from 'react'
import {
  StoreInterface,
  DEFAULT_BREAK_TIME,
  DEFAULT_LONG_BREAK_TIME,
  DEFAULT_WORK_TIME,
} from 'main/storeSchema'
import { storeKeys } from '../util/storeKeys'

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
    currentDate: new Date().toISOString(),
    timers: [],
  },
  lastIntervalType: 'break',
}

export const StoreContext = createContext<StoreContextType>({
  setStoreData: () => {},
  storeData: emptyStore,
})
export const StoreProvider = ({ children }: Props) => {
  const [storeData, setStoreData] = useState(emptyStore)

  useEffect(() => {
    const getStoreData = async () => {
      Promise.all(
        storeKeys.map((key) => window.electron.ipcRenderer.getStoreValue(key))
      )
        .then((storeValues) => {
          const keyValueArray = storeValues.map((val, index) => {
            return { [storeKeys[index]]: val }
          })
          const storeObj: StoreInterface = Object.assign({}, ...keyValueArray)
          setStoreData({ ...(storeObj as StoreInterface) })
          return null
        })
        .catch((errors) => console.error(errors))
    }

    getStoreData()
  }, [])

  return (
    <StoreContext.Provider value={{ storeData, setStoreData }}>
      {children}
    </StoreContext.Provider>
  )
}

interface Props {
  children: React.ReactNode
}
