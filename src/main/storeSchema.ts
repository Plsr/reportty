export const storeSchema = {
  breakTime: {
    type: 'number',
    maximum: 60,
    minimum: 1,
    default: 5
  },
  longBreakTime: {
    type: 'number',
    maximum: 120,
    minimum: 1,
    default: 15
  },
  workTime: {
    type: 'number',
    maximum: 120,
    minimum: 1,
    default: 25
  },
  autoStartNextInterval: {
    type: 'boolean',
    default: false
  },
  finishedTimers: {
    type: 'object',
    properties: {
      currentDate: {
        type: 'string'
      },
      timers: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            duration: {
              type: 'number',
            },
            taskNName: {
              type: 'string'
            }
          }
        }
      }
    },
    required: ['currentDate'],
    default: {
      currentDate: new Date().toISOString(), 
      timers: []
    }
  },
  lastIntervalType: {
    type: 'string',
    default: 'work'
  }
}
