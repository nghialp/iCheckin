import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import theme from '../../theme';

type FieldType = 'text' | 'email' | 'password' | 'number' | 'selection';

interface InputFieldProps {
  label: string;
  type?: FieldType;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  minLength?: number;
  matchValue?: string;
  customErrorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  minLength,
  matchValue,
  customErrorMessage,
}) => {
  const { t } = useTranslation();
  const [error, setError] = useState('');

  const validate = (val: string) => {
    let message = '';

    if (customErrorMessage) {
      message = customErrorMessage;
    } else {
      if (required && !val) {
        message = t('validation.required', { field: label });
      } else if (minLength && val.length < minLength) {
        message = t('validation.minLength', { field: label, min: minLength });
      } else if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (val && !emailRegex.test(val)) {
          message = t('validation.email');
        }
      } else if (type === 'number') {
        if (val && isNaN(Number(val))) {
          message = t('validation.number');
        }
      } else if (matchValue !== undefined && val !== matchValue) {
        message = t('validation.match', { field: label });
      }
    }

    setError(message);
    return message === '';
  };

  return (
    <View style={theme.inputField.wrapper}>
      <TextInput
        label={label}
        value={value}
        onChangeText={text => {
          onChange(text);
          validate(text);
        }}
        onBlur={() => validate(value)}
        secureTextEntry={type === 'password'}
        keyboardType={type === 'number' ? 'numeric' : 'default'}
        mode="outlined"
        contentStyle={{ height: 48 }}
        style={[theme?.inputField?.input, error ? theme.inputField.inputError : null]}
        theme={{
          roundness: 8,
          colors: {
            primary: theme.colors.primary,
            outline: theme.colors.outline,
            background: '#fff',
            onSurfaceVariant: theme.colors.onSurface,
            surfaceVariant: '#fff',
          },
        }}
      />
      {error ? <Text style={theme.inputField.errorText}>{error}</Text> : null}
    </View>
  );
};

export default InputField;
