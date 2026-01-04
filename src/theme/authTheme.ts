import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#0a84ff',
  text: '#000',
  gray: '#666',
  border: '#ccaefffff',
  background: '#caefffff',
  danger: '#ff3b30',
};

export const spacing = {
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
};

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.s,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: spacing.m,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
};

export const authTheme = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  cardWrapper: {
    width: '100%',
    paddingHorizontal: 24,
	},
  card: {
    width: '100%',
    backgroundColor: colors.background,
    borderWidth: 0,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  cardContent: {
    alignItems: 'center',
    // paddingVertical: spacing.m,
  },
	logoWrapper: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  input: { 
		width: '100%', 
		marginBottom: 12, 
		backgroundColor: 'transparent' 
	},

  // input: {
  //   borderWidth: 1,
  //   borderColor: colors.border,
  //   borderRadius: 8,
  //   padding: spacing.m,
  //   marginBottom: spacing.m,
  //   fontSize: 16,
  //   color: colors.text,
  // },
	inputOutline: { borderRadius: 12 },
	button: {
    width: '100%',
    backgroundColor: '#0a84ff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 24,
  },
  buttonText: { 
		color: '#fff', 
		textAlign: 'center', 
		fontWeight: '600', 
		fontSize: 16 
	},
  link: {
    color: colors.primary,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: spacing.m,
  },
	row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
		padding: 0,
		margin: 0,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
		paddingLeft: -10,
		margin: 0,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,          // outline
    borderColor: '#666',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
		padding: 0,
		margin: 0,
  },
  checkmark: {
    fontSize: 16,
    color: '#0a84ff',
    fontWeight: 'bold',
  },
  rememberText: {
    fontSize: 14,
    color: '#666',
  },
  forgotText: {
    fontSize: 14,
    color: '#0a84ff',
    fontWeight: '600',
  },
	errorText: { color: 'red', marginTop: 8, textAlign: 'center' },
  
  // Title styles
  pageTitle: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: colors.text, 
    marginBottom: 18,
    textAlign: 'center',
  },
  subtitle: { 
    fontSize: 14, 
    color: colors.gray, 
    marginBottom: 24, 
    textAlign: 'center',
  },
  
  // Field error text
  fieldError: { 
    color: '#d32f2f', 
    fontSize: 12, 
    marginTop: -8, 
    marginBottom: 8, 
    marginLeft: 12 
  },
  
  // Divider text (for "or" between sections)
  orText: { 
    marginTop: 12, 
    marginBottom: 8, 
    color: colors.gray,
    textAlign: 'center',
  },
  
  // Sign up link
  signupLink: { 
    color: colors.primary, 
    fontSize: 18, 
    fontWeight: '700',
    textAlign: 'center',
    textDecorationLine: 'underline' as const,
  },
  
  // Policy text
  policyText: { 
    fontSize: 12, 
    color: colors.gray, 
    marginTop: 16, 
    textAlign: 'center' 
  },
  policyLink: { 
    color: colors.primary, 
    textDecorationLine: 'underline' 
  },
  
  // Icon wrapper
  iconWrapper: { 
    marginBottom: 16,
  },
  
  // Back link
  backLink: { 
    marginTop: 24,
  },
});
