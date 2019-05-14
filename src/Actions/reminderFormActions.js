export const ACTIONS = {
  SET_EDIT: 'reminder_form/set_edit',
  CLEAR: 'reminder_form/clear',
  CLEAR1: 'reminder_form/clear1',
};

export const setEdit = reminder => ({ type: ACTIONS.SET_EDIT, payload: reminder });

export const clear = () => ({ type: ACTIONS.CLEAR });

export const clear1 = reminder => ({ type: ACTIONS.CLEAR1 , payload: reminder });