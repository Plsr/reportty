import { createContext, useState, useEffect } from 'react'
import {
  StoreInterface,
  DEFAULT_BREAK_TIME,
  DEFAULT_LONG_BREAK_TIME,
  DEFAULT_WORK_TIME,
  FinishedTimers,
} from 'main/storeSchema'
import { uniqueArray } from 'renderer/util/array'
import { diff } from 'deep-diff'
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
  const [storeData, reactSetStoreData] = useState(emptyStore)

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
          reactSetStoreData({ ...(storeObj as StoreInterface) })
          return null
        })
        .catch((errors) => console.error(errors))
    }

    getStoreData()
  }, [])

  const setStoreData = (store: StoreInterface) => {
    reactSetStoreData((prevStore: StoreInterface) => {
      const diffs = diff(prevStore, store)

      if (diffs) {
        const paths: Array<keyof StoreInterface> = uniqueArray(
          diffs.map((d) => d.path?.[0]) as Array<keyof StoreInterface>
        )
        const keyValuePairs: ElectronKeyValueStore[] = paths.map((path) => ({
          [path]: store[path],
        }))
        updateElectronStore(keyValuePairs)
      }
      return store
    })
  }

  const updateElectronStore = (keyValuePairs: ElectronKeyValueStore[]) => {
    keyValuePairs.forEach((keyValuePair) => {
      const key = Object.keys(keyValuePair)[0]
      window.electron.ipcRenderer.setStoreValue(
        key.toString(),
        keyValuePair[key]
      )
    })
  }

  return (
    <StoreContext.Provider value={{ storeData, setStoreData }}>
      {children}
    </StoreContext.Provider>
  )
}

interface Props {
  children: React.ReactNode
}

interface ElectronKeyValueStore {
  [key: string]: string | number | FinishedTimers | boolean
}
