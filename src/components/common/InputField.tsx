import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, IconButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { colors } from '../../theme/authTheme';

type FieldType = 'text' | 'email' | 'password' | 'number' | 'textarea';

interface InputFieldProps {
  label: string;
  type?: FieldType;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  minLength?: number;
  matchValue?: string;
  customErrorMessage?: string;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
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
  error: externalError,
  multiline = false,
  numberOfLines = 1,
}) => {
  const { t } = useTranslation();
  const [internalError, setInternalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const error = externalError || internalError;

  const validate = (val: string) => {
    let message = '';

    if (customErrorMessage) {
      message = customErrorMessage;
    } else {
      if (required && !val) {
        message = t('validation.required', { field: label });
      } else if (minLength && val.length < minLength) {
        message = t('validation.minLength', { field: label, min: minLength });
      } else if (type === 'email' && val) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          message = t('validation.email');
        }
      } else if (type === 'number' && val) {
        if (isNaN(Number(val))) {
          message = t('validation.number');
        }
      } else if (matchValue !== undefined && val !== matchValue) {
        message = t('validation.match', { field: label });
      }
    }

    setInternalError(message);
    return message === '';
  };

  const isPasswordType = type === 'password';
  const isSecureText = isPasswordType && !showPassword;

  const getOutlineColor = () => {
    if (error) {
      return colors.danger;
    }
    return colors.primary;
  };

  const getBackgroundColor = () => {
    return '#ffffff';
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputContainer}>
        <TextInput
          label={label}
          value={value}
          onChangeText={text => {
            onChange(text);
            validate(text);
          }}
          onBlur={() => {
            validate(value);
          }}
          secureTextEntry={isSecureText}
          keyboardType={type === 'number' ? 'numeric' : type === 'email' ? 'email-address' : 'default'}
          mode="outlined"
          multiline={multiline || type === 'textarea'}
          numberOfLines={type === 'textarea' ? (numberOfLines || 4) : undefined}
          style={[
            styles.input,
            { 
              backgroundColor: getBackgroundColor(),
              minHeight: type === 'textarea' ? 100 : 48 
            }
          ]}
          contentStyle={{ height: type === 'textarea' ? undefined : 48 }}
          outlineStyle={styles.outline}
          outlineColor={getOutlineColor()}
          activeOutlineColor={getOutlineColor()}
          error={!!error}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          textAlignVertical={type === 'textarea' ? 'top' : 'center'}
          right={
            isPasswordType ? (
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
                forceTextInputFocus={false}
              />
            ) : null
          }
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
    width: '100%',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  outline: {
    borderRadius: 12,
    borderWidth: 1.5,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default InputField;

