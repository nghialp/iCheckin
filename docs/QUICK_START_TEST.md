# 🎯 QUICK START - Test Login Mutation Ngay Bây Giờ

## ⏱️ 5 Phút Setup

### Bước 1: Thêm debug screen vào navigation (1 phút)

**File: App.tsx hoặc Navigation.tsx**

```tsx
import DebugLoginTest from './src/screens/debug/DebugLoginTest';

// Thêm vào Stack Navigator:
<Stack.Screen 
  name="DebugLogin" 
  component={DebugLoginTest}
  options={{ title: 'Debug Login' }}
/>
```

### Bước 2: Chạy App (2 phút)

```bash
cd /Users/nghiale/Documents/Workspace/Project/iCheck/checkin-frontend/iCheckin

# Terminal 1: Start Metro
pnpm start

# Terminal 2: Run iOS
pnpm run ios
```

### Bước 3: Mở Debug Screen (1 phút)

Trong app, navigate tới "DebugLogin" screen

### Bước 4: Test (1 phút)

1. 📌 Nhấn "Test Endpoint"
   - Phải thấy ✅ "Endpoint is reachable"
   - Nếu ❌, cần check server đang chạy

2. 📌 Nhấn "Test Login"
   - Input: test@example.com / password
   - Nếu ✅, login hoạt động được
   - Nếu ❌, xem chi tiết error

---

## 🔥 Chạy Ngay Nếu Không Muốn Setup

**Copy & paste vào React Native Console** (Cách 3 ở trên):

```javascript
// Test endpoint
fetch('http://localhost:3000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '{ __typename }' })
}).then(r => r.json()).then(d => console.log(JSON.stringify(d, null, 2)));

// Test login (modify email/password)
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
    variables: { input: { email: 'test@example.com', password: 'password' } }
  })
}).then(r => r.json()).then(d => console.log(JSON.stringify(d, null, 2)));
```

---

## 📊 Kỳ Vọng Kết Quả

| Test | Status | Output |
|------|--------|--------|
| Endpoint | ✅ OK | `{"data":{"__typename":"Query"}}` |
| Login | ✅ OK | `{"data":{"login":{"accessToken":"..."}}}` |
| Endpoint | ❌ Failed | `Cannot reach server` |
| Login | ❌ Failed | `{"errors":[{...}]}` |

---

## 🐛 Troubleshooting 30 Giây

### ❌ "Cannot reach endpoint"
→ Chạy server: `npm run start` (hoặc `yarn dev`)

### ❌ "Invalid credentials"
→ Dùng email/password đúng (check database)

### ❌ "Login returned null"
→ Check schema, field `login` có tồn tại không?

### ❌ Vẫn lỗi?
→ Xem chi tiết: `DEBUG_LOGIN_GUIDE.md`

---

## 📁 Files Đã Tạo

```
src/
├── __tests__/
│   ├── debug-login.ts                ← Core functions
│   ├── debug-login-runner.ts         ← Runner wrapper
│   └── debug-test.ts                 ← Executable test
├── screens/
│   └── debug/
│       └── DebugLoginTest.tsx        ← UI Component (CHÍNH)
├── ...

Root/
├── TEST_LOGIN_MUTATION.md            ← Hướng dẫn (short)
├── DEBUG_LOGIN_GUIDE.md              ← Hướng dẫn (detailed)
├── QUICK_TEST_CONSOLE.js             ← Console commands
└── ...
```

---

## 🎬 Demo Video (Text)

```
1. Mở app
2. Navigate: DebugLogin
3. Nhấn: "Test Endpoint"
   ✅ Endpoint is reachable
4. Nhấn: "Test Login"  
   ✅ Login successful
5. Xem console log chi tiết
```

---

## ✅ Xong!

Test hoạt động → Giờ có thể debug lỗi chính xác
Test thất bại → Xem error message để fix

Hãy bắt đầu bằng **Setup 5 phút** ở trên! 🚀
