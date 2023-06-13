import React, { useState } from "react";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DayPickerRangeController } from "react-dates";

const DetailCalendar = () => {
  const defaultFocusedInput = "startDate";
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(defaultFocusedInput);

  const handlEndDatesChange = (arg) => {
    setStartDate(arg.startDate);
    setEndDate(arg.endDate);
  };

  const onFocusChange = (arg) => {
    setFocusedInput(arg);
  };

  const renderDate = (date) => {
    return date ? moment(date).format("MM/DD/YY") : null;
  };

  const isDayBlocked = (day) => {
    let mock = moment().add(6, 'days').startOf('day');
    if (day.isSame(mock)) {
        return true;
    }
    return false;
  };

  const firstAvailableDay = moment().add(3, "days");
  const isCurrentMonthExcludeAvailableDate =
    moment().month() !== firstAvailableDay.month();
  return (
    <>
      <div className="mt-3">
        <div className="font-medium text-xl">{Number(endDate) - Number(startDate)} đêm tại Koh Samui</div>
        <div className="font-base mb-3">
          {renderDate(startDate)} | {renderDate(endDate)}
        </div>
        <DayPickerRangeController
          startDate={startDate}
          endDate={endDate}
          onDatesChange={handlEndDatesChange}
          onFocusChange={onFocusChange}
          numberOfMonths={2}
          initialVisibleMonth={
            isCurrentMonthExcludeAvailableDate
              ? () => moment().add(1, "month")
              : null
          }
          focusedInput={focusedInput || defaultFocusedInput}
          // weekDayFormat={""}
          monthFormat={`MMMM yyyy`}
          // renderMonthElement={(item)=>{}}
          isDayBlocked={isDayBlocked}
        />
      </div>
    </>
  );
};

export default DetailCalendar;
