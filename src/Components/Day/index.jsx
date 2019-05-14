import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import './index.sass';
import ReminderDetail from './ReminderDetail';

const Day = ({ day, currentDay, handleReminder, reminders, handleEdit }) => (
  <TableCell>
    <div className="day-container">
      <div className="day-container__day">{day}</div>
      <div className="day-container__reminders">
        {reminders &&
          reminders.map((reminder, i) => (
            <ReminderDetail
              key={i}
              reminder={reminder}
              handleEdit={handleEdit}
            />
          ))}
      </div>
      {day > 0 && (
        <div
          className="day-container__add"
          onClick={() => handleReminder(day, currentDay)}
        >
          Add
        </div>
      )}
    </div>
  </TableCell>
);

export default Day;