import React from 'react';
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { AppInput, AppInputProps } from './AppInput';

export interface ControlledInputProps<T extends FieldValues>
  extends Omit<AppInputProps, 'value' | 'onChangeText'> {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, FieldPath<T>>;
}

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  rules,
  error,
  ...props
}: ControlledInputProps<T>): React.ReactElement => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error: fieldError },
      }) => (
        <AppInput
          {...props}
          value={value !== undefined && value !== null ? String(value) : ''}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error ?? fieldError?.message}
        />
      )}
    />
  );
};

export default ControlledInput;
