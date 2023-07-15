import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

/* eslint-disable */

function RadioButtons(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control-con-marco">
      <label>{label}</label>
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                ____
                <input
                  type="radio"
                  id={option.value}
                  className='separator'
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />                
                <label htmlFor={option.value}>{option.key}</label>
                _____
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default RadioButtons;
/* eslint-enable */
