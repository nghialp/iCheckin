import { MD2Colors, DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0066CC',
    accent: '#03dac4',
    background: '##ddf4feff',
    surface: '#ffffff',
    onSurface: '#000000',
    outline: '#cccccc',
    outlineVariant: '#eeeeee',
  },
  inputField: {
    wrapper: { marginBottom: 12, width: '100%' as const },
    input: { width: '100%' as const, backgroundColor: '#ffffff' },
    inputError: { borderColor: 'red' },
    errorText: { color: 'red', fontSize: 12, marginTop: 4, marginLeft: 4 },
  },
};

export default theme;

