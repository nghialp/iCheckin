# 🚀 Chạy Test Login Mutation - 3 Cách Nhanh

## ✨ Cách 1: Đơn Giản Nhất - Dùng Component UI (Khuyên Dùng)

### Setup (1 lần)

```bash
# Không cần cài gì thêm, tất cả đã có
```

### Chạy Test

1. **Mở file** `src/screens/debug/DebugLoginTest.tsx` - xem có tạo thành công không
2. **Thêm vào App.tsx hoặc Navigation**:

```tsx
// App.tsx hoặc StackNavigator.tsx
import DebugLoginTest from './src/screens/debug/DebugLoginTest';

// Thêm route:
<Stack.Screen name="DebugLogin" component={DebugLoginTest} />

// Hoặc kiểm tra trực tiếp:
export default function App() {
  return <DebugLoginTest />;
}
```

3. **Chạy app**:
```bash
pnpm run ios
```

4. **Trên app**:
   - Nhấn "Test Endpoint" → Kiểm tra kết nối GraphQL server
   - Nhấn "Test Login" → Test login mutation
   - Xem kết quả trên screen + console

---

## 🖥️ Cách 2: Dùng React Native Console (Chrome DevTools)

### Setup

```bash
# Không cần cài gì
```

### Chạy Test

1. **Chạy app** (trong terminal):
```bash
pnpm run ios
# hoặc
pnpm start
```

2. **Shake phone** → "Toggle Remote JS Debugger"

3. **Mở Chrome**: `chrome://inspect`

4. **Đến tab Console**

5. **Copy & paste từ file này**:
```bash
cat QUICK_TEST_CONSOLE.js
```

6. **Xem output ngay trong console**

---

## 📱 Cách 3: Trực Tiếp Trong Console (Fastest)

Nếu app đang chạy và đã mở DevTools:

### Test Endpoint
```javascript
fetch('http://localhost:3000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '{ __typename }' })
})
.then(r => r.json())
.then(d => console.log(JSON.stringify(d, null, 2)))
.catch(e => console.error('Error:', e.message))
```

### Test Login
```javascript
fetch('http://localhost:3000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `mutation Login($input: LoginInput!) {
      login(input: $input) {
        accessToken
        refreshToken
        user { id name email }
      }
    }`,
    variables: { 
      input: { 
        email: 'test@example.com', 
        password: 'password123' 
      } 
    }
  })
})
.then(r => r.json())
.then(d => console.log(JSON.stringify(d, null, 2)))
.catch(e => console.error('Error:', e.message))
```

---

## 📊 Kỳ Vọng Output

### ✅ Endpoint OK
```json
{
  "data": {
    "__typename": "Query"
  }
}
```

### ✅ Login OK
```json
{
  "data": {
    "login": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc...",
      "user": {
        "id": "1",
        "name": "Test User",
        "email": "test@example.com"
      }
    }
  }
}
```

### ❌ Login Failed
```json
{
  "errors": [
    {
      "message": "Invalid credentials",
      "extensions": {
        "code": "UNAUTHENTICATED"
      }
    }
  ]
}
```

---

## 🔧 Kiểm Tra Trước Khi Test

✅ **Kiểm tra endpoint đang chạy**:
```bash
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __typename }"}'
```

Nên nhận lại:
```json
{"data":{"__typename":"Query"}}
```

✅ **Kiểm tra credentials**:
- Có user `test@example.com` với password `password` trong database không?
- Hoặc dùng email/password khác nếu có

---

## 🎯 Chọn Cách Nào?

| Cách | Ưu Điểm | Nhược Điểm |
|------|--------|----------|
| **Component UI** | ✅ Dễ dùng, có UI, không cần DevTools | ❌ Cần thêm vào App |
| **Console** | ✅ Nhanh, không cần code | ❌ Cần mở DevTools mỗi lần |
| **Trực tiếp fetch** | ✅ Rất nhanh, test ngay | ❌ Cần copy-paste |

**Khuyên dùng: Cách 1 (Component)** - Dễ nhất và có thể dùng lại nhiều lần.

---

## 📝 Files Tạo Mới

- ✅ `src/__tests__/debug-login.ts` - Core functions
- ✅ `src/__tests__/debug-login-runner.ts` - Runner wrapper  
- ✅ `src/__tests__/debug-test.ts` - Executable
- ✅ `src/screens/debug/DebugLoginTest.tsx` - UI Component
- ✅ `QUICK_TEST_CONSOLE.js` - Console commands
- ✅ `DEBUG_LOGIN_GUIDE.md` - Full guide

---

## ❓ Có Vấn Đề?

1. **"Cannot reach endpoint"** → GraphQL server chưa chạy
2. **"Invalid credentials"** → Email/password sai
3. **"Login returned null"** → Schema không khớp
4. **Xem chi tiết** → Mở DevTools console

Lúc đó hãy mở file `DEBUG_LOGIN_GUIDE.md` để xem troubleshooting chi tiết.
