import React from "react";
import { Form, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = (
  {
    input: { value, onChange, onBlur },
    showYearDropdown,
    showMonthDropdown,
    dropdownMode,
    dateFormat,
    showTimeSelect,
    maxDate,
    width,
    placeholder,
    meta: { touched, error }
  },
  ...rest
) => {
  return (
    <Form.Field error={touched && !!error}>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        selected={
          value
            ? Object.prototype.toString.call(value) !== "[object Date]"
              ? value.toDate()
              : value
            : null
        }
        dateFormat={dateFormat}
        showTimeSelect={showTimeSelect}
        showYearDropdown={showYearDropdown}
        showMonthDropdown={showMonthDropdown}
        dropdownMode={dropdownMode}
        maxDate={maxDate}
        timeFormat="HH:mm"
        onChange={onChange}
        onBlur={(e, value) => onBlur(value)}
        onChangeRaw={e => e.preventDefault()}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
