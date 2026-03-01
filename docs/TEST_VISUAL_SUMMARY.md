# 📊 Test Login Mutation - Visual Summary

## 🎯 3 Cách Chạy Test

```
┌─────────────────────────────────────────────────────────────────┐
│          HOW TO RUN LOGIN MUTATION TEST (3 WAYS)               │
└─────────────────────────────────────────────────────────────────┘

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃    CÁCH 1: UI Component    ┃  ┃  CÁCH 2: Console Chrome    ┃
┃    (Khuyên Dùng ⭐)         ┃  ┃  (Nhanh hơn)              ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩  ┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ Setup: Add to App.tsx      │  │ Setup: Chrome DevTools     │
│ File: DebugLoginTest.tsx   │  │ File: QUICK_TEST_CONSOLE.js│
│ Steps: Navigate → Test     │  │ Steps: Copy → Paste → Run  │
│ UI: Beautiful & Easy       │  │ UI: Raw console output     │
│ Time: 5 min                │  │ Time: 1 min                │
└────────────────────────────┘  └────────────────────────────┘
         ↓ HỮU DỤNG                      ↓ NHANH NHẤT
     ✅ Best for debugging        ✅ Best for quick test

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  CÁCH 3: Direct Console    ┃
┃  (Rất Nhanh ⚡)              ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ Setup: Copy 5 lines code   │
│ File: fetch + JSON query   │
│ Steps: Paste → Run         │
│ UI: Plain text             │
│ Time: 30 sec               │
└────────────────────────────┘
     ↓ RẤT NHANH
 ✅ Best for instant test
```

---

## 📁 File Structure

```
iCheckin/
│
├── 🆕 QUICK_START_TEST.md           ← START HERE (5 min)
├── 🆕 TEST_LOGIN_MUTATION.md        ← 3 Cách chi tiết
├── 🆕 DEBUG_LOGIN_GUIDE.md          ← Troubleshooting
├── 🆕 QUICK_TEST_CONSOLE.js         ← Copy-paste console
│
├── src/
│   ├── __tests__/
│   │   ├── 🆕 debug-login.ts        ← Core functions
│   │   ├── 🆕 debug-login-runner.ts ← Test runner
│   │   ├── 🆕 debug-test.ts         ← Executable
│   │   └── api-check.ts
│   │
│   ├── screens/
│   │   ├── debug/
│   │   │   └── 🆕 DebugLoginTest.tsx ← UI Component
│   │   └── auth/
│   │       └── LoginPage.tsx
│   │
│   ├── providers/
│   │   └── AuthProvider.tsx         ← IMPROVED (error handling)
│   │
│   └── graphql/
│       ├── mutations/
│       │   └── login.mutation.ts
│       └── client.ts
│
└── package.json                     ← UPDATED (new script)
```

---

## 🔄 Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR APP                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────┐       │
│  │         DebugLoginTest Component                │       │
│  │  (UI with buttons to run tests)                 │       │
│  └──────────────────────────────────────────────────┘       │
│         ↓ click "Test Endpoint"      ↓ click "Test Login"   │
│  ┌────────────────────┐      ┌──────────────────────┐       │
│  │ debugEndpoint()    │      │ debugLoginMutation() │       │
│  │ (Raw fetch calls)  │      │ (Raw fetch calls)    │       │
│  └────────────────────┘      └──────────────────────┘       │
│         ↓                            ↓                       │
│  ┌──────────────────────────────────────────┐               │
│  │      GraphQL Endpoint                    │               │
│  │  http://localhost:3000/graphql           │               │
│  └──────────────────────────────────────────┘               │
│         ↓                            ↓                       │
│  ┌──────────────────────────────────────────┐               │
│  │      Response (JSON)                     │               │
│  │  - Status 200                            │               │
│  │  - Data or Errors                        │               │
│  └──────────────────────────────────────────┘               │
│         ↓                            ↓                       │
│  ┌──────────────────────────────────────────┐               │
│  │      Display Results on UI + Console     │               │
│  │  ✅ Success or ❌ Error with details     │               │
│  └──────────────────────────────────────────┘               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Reference

### Via Component (Recommended)

```
1. Add DebugLoginTest to App.tsx
2. Run: pnpm run ios
3. Navigate: DebugLogin screen
4. Input email/password
5. Click buttons → See results
```

### Via Console (Fastest)

```
1. Shake phone → Remote Debug
2. Open: chrome://inspect
3. Console tab
4. Paste code from QUICK_TEST_CONSOLE.js
5. See results immediately
```

### Via Direct Fetch

```
1. Open console
2. Copy 10 lines of fetch code
3. Paste in console
4. Press Enter
5. Done!
```

---

## 📊 Expected Results

### Test 1: Endpoint

```javascript
// Command
fetch('http://localhost:3000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '{ __typename }' })
}).then(r => r.json()).then(d => console.log(d));

// Result ✅
{
  "data": {
    "__typename": "Query"
  }
}

// Or ❌
{
  "errors": [
    { "message": "Cannot reach endpoint" }
  ]
}
```

### Test 2: Login Mutation

```javascript
// Command
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
}).then(r => r.json()).then(d => console.log(d));

// Result ✅
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

// Or ❌
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

## 🔧 Modified Files

### ✅ AuthProvider.tsx
- Improved error handling
- Added detailed console logs
- Better error extraction from Apollo Client

### ✅ package.json
- Added test:debug script

---

## 🎓 Key Files to Understand

| File | Purpose | Size |
|------|---------|------|
| debug-login.ts | Core fetch functions | ~100 lines |
| debug-login-runner.ts | Test runner wrapper | ~80 lines |
| DebugLoginTest.tsx | UI Component | ~250 lines |
| AuthProvider.tsx | Improved error handling | ~260 lines |

---

## 🔍 Debug Tips

```
Problem: "Cannot reach endpoint"
→ Solution: Start GraphQL server first

Problem: "Invalid credentials"
→ Solution: Use correct email/password

Problem: "Login returned null"
→ Solution: Check GraphQL schema

Problem: Still not working?
→ Solution: Check DEBUG_LOGIN_GUIDE.md
```

---

## ⏱️ Time Estimates

| Method | Setup | Run | Total |
|--------|-------|-----|-------|
| Component | 5 min | 30 sec | 5.5 min |
| Console | 2 min | 30 sec | 2.5 min |
| Fetch | 1 min | 10 sec | 1.1 min |

---

## 🎯 Next Steps

1. ✅ Pick a method (recommend: Component)
2. ✅ Follow setup instructions
3. ✅ Run test
4. ✅ Check results
5. ✅ Debug if needed
6. ✅ Fix in AuthProvider or backend

---

**Ready to test?** Start with `QUICK_START_TEST.md` 🚀
