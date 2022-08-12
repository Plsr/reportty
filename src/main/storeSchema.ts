import { JSONSchema7 } from 'json-schema-to-ts'

export const DEFAULT_BREAK_TIME = 5
export const DEFAULT_LONG_BREAK_TIME = 15
export const DEFAULT_WORK_TIME = 25

const breakTimeSchema: JSONSchema7 = {
  type: 'number',
  maximum: 60,
  minimum: 1,
  default: DEFAULT_BREAK_TIME,
}

const longBreakTimeSchema: JSONSchema7 = {
  type: 'number',
  maximum: 120,
  minimum: 1,
  default: DEFAULT_LONG_BREAK_TIME,
}

const workTimeSchema: JSONSchema7 = {
  type: 'number',
  maximum: 120,
  minimum: 1,
  default: DEFAULT_WORK_TIME,
}

const autoStartNextIntervalSchema: JSONSchema7 = {
  type: 'boolean',
  default: false,
}

const finishedTimersSchema: JSONSchema7 = {
  type: 'object',
  default: [],
  properties: {
    currentDate: {
      type: 'string',
    },
    timers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          duration: {
            type: 'number',
          },
          taskName: {
            type: 'string',
          },
        },
      },
    },
  },
  required: ['currentDate'],
}

const lastIntervalTypeSchema: JSONSchema7 = {
  type: 'string',
  default: 'work',
}

export interface FinishedTimer {
  duration: number
  taskName: string
}

export interface FinishedTimers {
  currentDate: string
  timers: FinishedTimer[]
}

export const storeSchema = {
  breakTime: breakTimeSchema,
  longBreakTime: longBreakTimeSchema,
  workTime: workTimeSchema,
  autoStartNextInterval: autoStartNextIntervalSchema,
  finishedTimers: finishedTimersSchema,
  lastIntervalType: lastIntervalTypeSchema,
} as const

export interface StoreInterface {
  breakTime: number
  longBreakTime: number
  workTime: number
  autoStartNextInterval: boolean
  finishedTimers: FinishedTimers
  lastIntervalType: 'work' | 'break' | 'longBreak'
}
