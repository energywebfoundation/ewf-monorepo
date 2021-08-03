import { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { FormInputProps, FormSelectOption } from '../../components';
import * as yup from 'yup';
import {
  TextFieldProps,
  BoxProps,
  ButtonProps,
  TypographyVariant,
} from '@material-ui/core';
import {
  DeepPartial,
  Path,
  UnpackNestedValue,
  UseFormReset,
} from 'react-hook-form';
import { DatePickerProps } from '@material-ui/lab';

export type GenericFormField = {
  name: string;
  label: string;
  type?: 'text' | 'password';
  required?: boolean;
  frozen?: boolean;
  select?: boolean;
  options?: FormSelectOption[];
  autocomplete?: boolean;
  multiple?: boolean;
  maxValues?: number;
  datePicker?: boolean;
  datePickerProps?: Omit<DatePickerProps, 'value' | 'onChange' | 'renderInput'>;
  startAdornment?: ReactNode;
  endAdornment?: {
    element: ReactNode;
    isValidCheck?: boolean;
  };
  textFieldProps?: TextFieldProps;
  dependentOn?: string;
  dependentOptionsCallback?: (fieldValue: any) => FormSelectOption[];
};

export type GenericFormSecondaryButton = ButtonProps & {
  label: string;
};

export interface GenericFormProps<FormValuesType> {
  hideSubmitButton?: boolean;
  submitHandler: (
    values: UnpackNestedValue<FormValuesType>,
    resetForm: UseFormReset<FormValuesType>
  ) => void;
  validationSchema: yup.AnyObjectSchema;
  initialValues: UnpackNestedValue<DeepPartial<FormValuesType>>;
  fields: GenericFormField[];
  buttonText: string;
  buttonFullWidth?: boolean;
  buttonWrapperProps?: BoxProps;
  buttonDisabled?: boolean;
  secondaryButtons?: GenericFormSecondaryButton[];
  formTitle?: string;
  formTitleVariant?: TypographyVariant;
  formClass?: string;
  inputsVariant?: FormInputProps<FormValuesType>['variant'];
  formInputsProps?: TextFieldProps;
  partOfMultiForm?: boolean;
  twoColumns?: boolean;
  inputsToWatch?: Path<FormValuesType>[];
  controlSubmitButton?: boolean;
  onWatchHandler?: (watchedValues: unknown[]) => void;
}

export type TGenericForm = <FormValuesType>(
  props: PropsWithChildren<GenericFormProps<FormValuesType>>
) => ReactElement;
