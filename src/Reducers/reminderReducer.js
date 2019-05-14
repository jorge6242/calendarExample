import uniqueId from "uuid/v1";
import { ACTIONS } from '../Actions/remindersAction';

const initialState = { }

const createReminder = (state, payload) => {
  const { date, description, city, time, color } = payload;
  const reminder = {
    id: uniqueId(),
    date,
    description,
    city,
    time,
    color,
  };
  return { ...state, [date]: state[date]
      ? state[date].concat(reminder)
      : [reminder]
  };
};

const updateReminder = (state, payload) => {
  const { id, date, description, city, time, color } = payload;
  let reminders = [];
  [...state[date]].forEach(element => {
    if (element.id === id) {
      element = {
        id,
        description,
        city,
        time,
        color,
      };
    }
    reminders.push(element);
  });
  return { ...state, [date]: reminders };
};

const deleteReminder = (state, payload) => {
  const { id, date } = payload;
  const reminders = [...state[date]].filter(reminder => reminder.id !== id);
  return { ...state, [date]: reminders };
};

const remindersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CREATE:
      return createReminder(state, action.payload);
    case ACTIONS.UPDATE:
      return updateReminder(state, action.payload);
    case ACTIONS.DELETE:
      return deleteReminder(state, action.payload);
    default:
      return state;
  }
};

export default remindersReducer;