export const ACTIONS = {
  CREATE: 'reminders/create',
  UPDATE: 'reminders/update',
  DELETE: 'reminders/delete',
};

export const createReminder = reminder => ({ type: ACTIONS.CREATE, ...reminder });

export const updateReminder = reminder => ({ type: ACTIONS.UPDATE, ...reminder });

export const deleteReminder = reminder => ({ type: ACTIONS.DELETE, ...reminder });
