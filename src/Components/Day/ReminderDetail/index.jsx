import React from 'react';

const ReminderDetail = ({ reminder, handleEdit }) => (
  <div className={`day-container__reminder day-container__reminder--${reminder.color}`} onClick={() => handleEdit(reminder)}>
    {reminder.description}
  </div>
);

export default ReminderDetail;
