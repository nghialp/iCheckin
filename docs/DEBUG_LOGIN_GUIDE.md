# 🔍 Debug Login Test - Hướng Dẫn Sử Dụng

## 📋 Tệp Tạo Mới

1. **`src/__tests__/debug-login.ts`** - Core debug functions
   - `debugEndpoint()` - Kiểm tra endpoint connectivity
   - `debugLoginMutation(email, password)` - Test login mutation

2. **`src/__tests__/debug-login-runner.ts`** - Test runner wrapper
   - `runEndpointTest()` - Hiển thị kết quả endpoint test
   - `runLoginTest(email, password)` - Hiển thị kết quả login test
   - `runAllTests(email, password)` - Chạy tất cả tests

3. **`src/screens/debug/DebugLoginTest.tsx`** - UI Component để test trực tiếp

4. **`src/__tests__/debug-test.ts`** - Executable test file

## 🚀 Cách Sử Dụng

### Cách 1: Dùng Debug Component (Dễ nhất)

Thêm vào App.tsx hoặc navigation:

```tsx
import DebugLoginTest from './src/screens/debug/DebugLoginTest';

// Hoặc thêm route vào navigation
// <Stack.Screen name="DebugLogin" component={DebugLoginTest} />
```

Sau đó:
1. Mở app
2. Navigate tới DebugLoginTest screen
3. Nhập email/password (mặc định: test@example.com / password)
4. Nhấn "Test Endpoint" để kiểm tra kết nối
5. Nhấn "Test Login" để kiểm tra mutation
6. Xem kết quả ngay trên screen + console logs

### Cách 2: Chạy từ Console

Mở DevTools Console (Shake phone → Debug remote JS):

```javascript
// Test endpoint
await import('./src/__tests__/debug-login-runner').then(m => m.runEndpointTest());

// Test login
await import('./src/__tests__/debug-login-runner').then(m => m.runLoginTest('test@example.com', 'password'));

// Run all tests
await import('./src/__tests__/debug-login-runner').then(m => m.runAllTests('test@example.com', 'password'));
```

### Cách 3: Chạy từ Terminal (Nếu có ts-node)

```bash
# Cài ts-node nếu chưa có
pnpm add -D ts-node

# Chạy tests
npx ts-node src/__tests__/debug-test.ts
npx ts-node src/__tests__/debug-test.ts endpoint
npx ts-node src/__tests__/debug-test.ts login test@example.com password123
```

### Cách 4: Import Functions Trực Tiếp

```tsx
import { debugEndpoint, debugLoginMutation } from './src/__tests__/debug-login';

// Trong component
const handleTest = async () => {
  const result = await debugLoginMutation('test@example.com', 'password');
  console.log('Result:', result);
};
```

## 📊 Output Sẽ Hiển Thị

### ✅ Endpoint Test Thành Công

```
==== TESTING ENDPOINT CONNECTIVITY ====
Endpoint: http://localhost:3000/graphql
=====================================

Response Status: 200
Response OK: true

==== FULL RESPONSE ====
{
  "data": {
    "__typename": "Query"
  }
}
```

### ❌ Endpoint Test Thất Bại

```
Error: Failed to fetch
Cannot reach endpoint: Connection refused

💡 TIP: Make sure your GraphQL server is running on http://localhost:3000/graphql
```

### ✅ Login Mutation Thành Công

```
==== DEBUGGING LOGIN MUTATION ====
Endpoint: http://localhost:3000/graphql
Email: test@example.com
=====================================

==== FULL RESPONSE ====
{
  "data": {
    "login": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc...",
      "user": {
        "id": "123",
        "name": "Test User",
        "email": "test@example.com",
        "avatar": null
      }
    }
  }
}

✅ LOGIN SUCCESS
Access Token: eyJhbGc...
User: { id: '123', name: 'Test User', email: 'test@example.com', avatar: null }
```

### ❌ Login Mutation Thất Bại

```
==== DEBUGGING LOGIN MUTATION ====
Endpoint: http://localhost:3000/graphql
Email: wrong@example.com
=====================================

==== FULL RESPONSE ====
{
  "errors": [
    {
      "message": "Invalid credentials",
      "extensions": {
        "code": "UNAUTHENTICATED",
        "originalError": {
          "message": "Email or password is incorrect"
        }
      }
    }
  ]
}

❌ LOGIN FAILED
Error: Invalid credentials
```

## 🔧 Troubleshooting

### Lỗi: Cannot find module 'react-native-config'

Hãy kiểm tra `.env.development`:
```
GRAPHQL_ENDPOINT=http://localhost:3000/graphql
```

### Lỗi: Network error

Kiểm tra:
1. GraphQL server đang chạy? → `curl http://localhost:3000/graphql`
2. Port 3000 đúng?
3. Machine name/IP đúng?

### Lỗi: Login returned null

Kiểm tra:
1. Response có field `login` không?
2. Credentials có đúng không?
3. Server có error không? (Xem output details)

## 📝 Ghi Chú

- Console logs sẽ xuất hiện trong:
  - React Native Debugger
  - Xcode console
  - Android Studio Logcat
  - Safari DevTools (cho iOS)

- Debug logs có prefix `[Login]`, `[SignUp]`, `[API Test]` để dễ tìm

- Debug component có thể xóa bỏ sau khi fix bug xong

## 🎯 Bước Tiếp Theo

1. ✅ Chạy endpoint test đầu tiên
2. ✅ Kiểm tra endpoint connectivity
3. ✅ Chạy login test với valid credentials
4. ✅ Xem chi tiết error từ response
5. ✅ Fix issue dựa trên error message
6. ✅ Verify login hoạt động đúng
