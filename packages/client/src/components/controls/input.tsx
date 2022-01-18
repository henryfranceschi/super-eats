import React from 'react';
import { FieldHookConfig, useField } from 'formik';

// Turn camel case names into labels
function nameToLabel(name: string): string {
  const string = Array.from(
    name.matchAll(/(([A-Z]|[a-z])([a-z]+))(?=[A-Z]|$| )/g)
  )
    .map((match) => match[0].toLocaleLowerCase())
    .join(' ');

  return string.charAt(0).toUpperCase() + string.slice(1);
}

type InputProps = { type: string; label?: string } & FieldHookConfig<string>;

export const Input: React.FC<InputProps> = ({ type, label, ...props }) => {
  const [field, { error, touched }] = useField(props);
  label = label ?? nameToLabel(field.name);
  const showErrors = error && touched;

  return (
    <div className="form-input">
      <label
        className={`label${showErrors ? ' error' : ''}`}
        htmlFor={field.name}
      >
        {`${label} ${showErrors ? ' - ' + error : ''}`}
      </label>
      <input type={type} {...field} />
    </div>
  );
};
