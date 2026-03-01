# API Connectivity Troubleshooting Guide

## ✅ Problem Fixed!

### What was the issue?
Your app was trying to connect to `http://localhost:3000/graphql` but the server is actually running at `https://nghiale.zalink.asia/graphql`.

### What I changed:
Updated `.env` file:
```properties
# Before:
# GRAPHQL_ENDPOINT=https://nghiale.zalink.asia/graphql
GRAPHQL_ENDPOINT=http://localhost:3000/graphql

# After:
GRAPHQL_ENDPOINT=https://nghiale.zalink.asia/graphql
# GRAPHQL_ENDPOINT=http://localhost:3000/graphql
```

---

## 🔍 How the API Connection Works

### 1. **Environment Configuration** (`.env`)
- Defines `GRAPHQL_ENDPOINT` which points to your GraphQL server
- Loaded by `react-native-config` at runtime
- Must be accessible from the device/simulator

### 2. **Apollo Client Setup** (`src/graphql/client.ts`)
- Reads endpoint from `Config.GRAPHQL_ENDPOINT`
- Creates HTTP link to the endpoint
- Attaches auth links to inject Bearer token automatically
- Handles token refresh on expiration

### 3. **Authentication Flow**
```
User Login
    ↓
LoginPage calls AuthProvider.login()
    ↓
AuthProvider uses LOGIN_MUTATION
    ↓
Apollo Client sends to GRAPHQL_ENDPOINT
    ↓
Server returns accessToken & refreshToken
    ↓
Tokens stored in AsyncStorage
    ↓
All future requests automatically include: Authorization: Bearer <accessToken>
    ↓
If token expires: errorLink triggers REFRESH_TOKEN mutation
    ↓
New tokens obtained & stored
    ↓
Original request retried with new token
```

---

## 📋 Testing API Connection

### Option 1: Use the API Check Script
```typescript
// In App.tsx or any screen component
import { testEndpointConnectivity, testLoginMutation, testBearerTokenAttachment } from './__tests__/api-check';

// Test 1: Check if endpoint is reachable
const result = await testEndpointConnectivity();
console.log('Endpoint reachable:', result.success);

// Test 2: Test login
const loginResult = await testLoginMutation('test@example.com', 'password123');
console.log('Login successful:', loginResult.success);

// Test 3: Test authenticated request with token
const authResult = await testBearerTokenAttachment('your-access-token');
console.log('Authenticated request successful:', authResult.success);
```

### Option 2: Monitor Network Tab in React Native Debugger
1. Open React Native Debugger
2. Check "Enabled" for Network
3. Try login - you'll see GraphQL request to endpoint
4. Verify response contains tokens

### Option 3: Check AsyncStorage for Tokens
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = await AsyncStorage.getItem('auth_user');
const parsed = JSON.parse(auth);
console.log('Stored tokens:', {
  accessToken: parsed?.accessToken?.substring(0, 20) + '...',
  refreshToken: parsed?.refreshToken?.substring(0, 20) + '...',
});
```

---

## 🚀 Next Steps to Verify Everything Works

### 1. **Rebuild the App**
```bash
npm start -- --reset-cache  # Terminal 1: Start Metro bundler
npm run ios                 # Terminal 2: Build iOS app
# or for Android:
npm run android
```

### 2. **Test Login**
- Open app on simulator/device
- Go to Login screen
- Enter test credentials
- Click Login
- **Check if:**
  - No error shown
  - Navigation to home screen succeeds
  - Tokens stored in AsyncStorage

### 3. **Check Network Logs**
In React Native Debugger, you should see:
```
POST /graphql HTTP/1.1
Host: nghiale.zalink.asia
Content-Type: application/json
Authorization: Bearer eyJ...

{
  "query": "mutation Login(...)",
  "variables": {"email": "...", "password": "..."}
}

Response: 200 OK
{
  "data": {
    "login": {
      "accessToken": "eyJ...",
      "refreshToken": "eyJ...",
      "user": {"id": "...", "name": "..."}
    }
  }
}
```

### 4. **Check for Token Refresh**
- Login and get accessToken
- Wait for it to expire (or manually make request)
- Should automatically:
  - Call REFRESH_TOKEN mutation
  - Get new tokens
  - Retry original request
  - Continue without user interaction

---

## 🛠️ If Still Having Issues

### Issue: "Cannot connect to server"
**Solutions:**
1. Verify endpoint URL is correct in `.env`
2. Check server is actually running at that endpoint
3. Check device has internet connectivity
4. Try with production endpoint first to rule out local network issues

### Issue: "CORS error"
**Solution:** Server needs to allow requests from your app domain. Check CORS configuration on backend.

### Issue: "Invalid token / UNAUTHENTICATED"
**Solutions:**
1. Clear app cache: `npm start -- --reset-cache`
2. Clear AsyncStorage: Delete app & reinstall
3. Check token format in headers (should be `Bearer <token>`)
4. Verify token is valid and not expired

### Issue: "Token refresh fails"
**Solutions:**
1. Check REFRESH_TOKEN mutation exists on backend
2. Verify refreshToken is stored correctly
3. Check errorLink implementation in `client.ts`

---

## 📝 Configuration Files Involved

| File | Purpose |
|------|---------|
| `.env` | Defines GRAPHQL_ENDPOINT |
| `src/graphql/client.ts` | Apollo Client setup with auth links |
| `src/providers/ApolloWrapper.tsx` | Provides Apollo Client to app |
| `src/providers/AuthProvider.tsx` | Manages authentication state & token storage |
| `src/graphql/mutations/login.mutation.ts` | Login mutation definition |
| `src/graphql/mutations/` | All other mutations (refresh token, etc.) |

---

## ✅ Verification Checklist

After rebuilding, check:

- [ ] App launches without crashing
- [ ] Login screen loads
- [ ] Can enter credentials
- [ ] Click login button sends request to `https://nghiale.zalink.asia/graphql`
- [ ] Server responds with tokens (check Network tab)
- [ ] Tokens stored in AsyncStorage
- [ ] Navigation to home screen succeeds
- [ ] Can make authenticated requests (like fetching feed)
- [ ] All screens load and display data
- [ ] Token refresh works when expired

---

## 📞 Summary

The issue was **endpoint configuration**. Your app was pointing to `localhost:3000` when it should point to `https://nghiale.zalink.asia`.

**Fixed by:** Updating `.env` file to use the correct production endpoint.

**To verify:** Rebuild the app and test login flow. Check Network tab in debugger to see requests going to the correct endpoint.
