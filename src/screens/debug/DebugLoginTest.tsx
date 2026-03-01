/**
 * Debug Test Component
 * 
 * Sử dụng cách này:
 * 1. Import component vào App.tsx hoặc navigation
 * 2. Hiển thị component trên screen
 * 3. Nhấn button để test
 */

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, TextInput, Card } from 'react-native-paper';
import { runEndpointTest, runLoginTest, runAllTests } from '../../__tests__/debug-login-runner';

interface TestResult {
  title: string;
  status: 'pending' | 'running' | 'success' | 'error';
  message: string;
  details?: string;
}

export default function DebugLoginTest() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (title: string, status: 'pending' | 'running' | 'success' | 'error', message: string, details?: string) => {
    setResults(prev => [...prev, { title, status, message, details }]);
  };

  const clearResults = () => {
    setResults([]);
  };

  const handleEndpointTest = async () => {
    clearResults();
    setLoading(true);
    addResult('Endpoint Test', 'running', 'Testing endpoint connectivity...');
    
    try {
      const result = await runEndpointTest();
      setResults(prev => {
        const newResults = [...prev];
        newResults[newResults.length - 1] = {
          title: 'Endpoint Test',
          status: result ? 'success' : 'error',
          message: result ? 'Endpoint is reachable ✅' : 'Endpoint is unreachable ❌',
          details: `Server should be running on http://localhost:3000/graphql`,
        };
        return newResults;
      });
    } catch (error: any) {
      setResults(prev => {
        const newResults = [...prev];
        newResults[newResults.length - 1] = {
          title: 'Endpoint Test',
          status: 'error',
          message: 'Test failed ❌',
          details: error.message,
        };
        return newResults;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginTest = async () => {
    clearResults();
    setLoading(true);
    addResult('Login Test', 'running', `Testing login with ${email}...`);
    
    try {
      const result = await runLoginTest(email, password);
      setResults(prev => {
        const newResults = [...prev];
        newResults[newResults.length - 1] = {
          title: 'Login Test',
          status: result.success ? 'success' : 'error',
          message: result.success ? 'Login successful ✅' : 'Login failed ❌',
          details: JSON.stringify(result.data || result.error, null, 2),
        };
        return newResults;
      });
    } catch (error: any) {
      setResults(prev => {
        const newResults = [...prev];
        newResults[newResults.length - 1] = {
          title: 'Login Test',
          status: 'error',
          message: 'Test failed ❌',
          details: error.message,
        };
        return newResults;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAllTests = async () => {
    clearResults();
    setLoading(true);
    addResult('All Tests', 'running', 'Running all tests...');
    
    try {
      await runAllTests(email, password);
      setResults(prev => {
        const newResults = [...prev];
        newResults[newResults.length - 1] = {
          title: 'All Tests',
          status: 'success',
          message: 'All tests completed ✅',
          details: 'Check console logs for detailed output',
        };
        return newResults;
      });
    } catch (error: any) {
      setResults(prev => {
        const newResults = [...prev];
        newResults[newResults.length - 1] = {
          title: 'All Tests',
          status: 'error',
          message: 'Tests failed ❌',
          details: error.message,
        };
        return newResults;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="🔍 Debug Login Test" />
        <Card.Content>
          <Text style={styles.sectionTitle}>Credentials</Text>
          
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            editable={!loading}
          />
          
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
            editable={!loading}
          />

          <Text style={styles.sectionTitle}>Tests</Text>
          
          <Button
            mode="contained"
            onPress={handleEndpointTest}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Test Endpoint
          </Button>

          <Button
            mode="contained"
            onPress={handleLoginTest}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Test Login
          </Button>

          <Button
            mode="contained"
            onPress={handleAllTests}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Run All Tests
          </Button>

          <TouchableOpacity
            onPress={clearResults}
            disabled={loading}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>Clear Results</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>

      {results.length > 0 && (
        <Card style={styles.resultsCard}>
          <Card.Title title="📊 Results" />
          <Card.Content>
            {results.map((result, index) => (
              <View key={index} style={styles.resultItem}>
                <Text style={[
                  styles.resultTitle,
                  {
                    color: result.status === 'success' ? '#4CAF50' : 
                           result.status === 'error' ? '#F44336' : '#2196F3'
                  }
                ]}>
                  {result.title} - {result.status.toUpperCase()}
                </Text>
                <Text style={styles.resultMessage}>{result.message}</Text>
                {result.details && (
                  <Text style={styles.resultDetails}>{result.details}</Text>
                )}
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      <Card style={styles.tipsCard}>
        <Card.Title title="💡 Tips" />
        <Card.Content>
          <Text style={styles.tipText}>
            1. Đảm bảo GraphQL server đang chạy trên http://localhost:3000/graphql
          </Text>
          <Text style={styles.tipText}>
            2. Kiểm tra GRAPHQL_ENDPOINT trong .env.development
          </Text>
          <Text style={styles.tipText}>
            3. Mở DevTools (Shake phone) để xem chi tiết logs
          </Text>
          <Text style={styles.tipText}>
            4. Kiểm tra console output để xem full GraphQL response
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 16,
  },
  resultsCard: {
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  tipsCard: {
    marginBottom: 16,
    backgroundColor: '#fffbea',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginBottom: 8,
  },
  clearButton: {
    marginTop: 12,
    padding: 12,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  clearButtonText: {
    color: '#424242',
    fontWeight: '600',
  },
  resultItem: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resultMessage: {
    fontSize: 13,
    marginBottom: 4,
  },
  resultDetails: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
  },
  tipText: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 18,
  },
});
