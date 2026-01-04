import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error info:', errorInfo.componentStack);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleReload = () => {
    this.handleReset();
    // Optionally trigger app reload
    // RNRestart.restart();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={styles.icon}>⚠️</Text>
          <Text style={styles.title}>Oops! Something went wrong</Text>
          <Text style={styles.message}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={this.handleReset}>
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.reloadButton]} onPress={this.handleReload}>
              <Text style={styles.buttonText}>Reload App</Text>
            </TouchableOpacity>
          </View>

          {__DEV__ && this.state.error && (
            <View style={styles.debugContainer}>
              <Text style={styles.debugTitle}>Error Details (DEV only):</Text>
              <Text style={styles.debugText}>{this.state.error.stack}</Text>
            </View>
          )}
        </ScrollView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  reloadButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  debugContainer: {
    marginTop: 24,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
  },
  debugTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  debugText: {
    fontSize: 10,
    color: '#666',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});

export default ErrorBoundary;

