# 📑 Index - Tất Cả Tài Liệu Test Login Mutation

## 🚀 Bắt Đầu Nhanh (Pick one)

| File | Thời Gian | Mô Tả |
|------|-----------|-------|
| **QUICK_START_TEST.md** | 5 phút | ⭐ START HERE - Setup & test nhanh nhất |
| **TEST_VISUAL_SUMMARY.md** | 5 phút | 📊 Sơ đồ và visual guide |
| **TEST_LOGIN_MUTATION.md** | 10 phút | 📋 3 cách chi tiết |

## 📚 Hướng Dẫn Chi Tiết

| File | Nội Dung |
|------|----------|
| **DEBUG_LOGIN_GUIDE.md** | Troubleshooting & detailed instructions |
| **QUICK_TEST_CONSOLE.js** | Copy-paste console commands |

## 🔧 Source Code

### Core Debug Functions
- **`src/__tests__/debug-login.ts`**
  - `debugEndpoint()` - Test endpoint connectivity
  - `debugLoginMutation(email, password)` - Test login mutation

### Test Runner
- **`src/__tests__/debug-login-runner.ts`**
  - `runEndpointTest()` - Pretty-print endpoint test results
  - `runLoginTest()` - Pretty-print login test results
  - `runAllTests()` - Run all tests with full output

### UI Component (Recommended)
- **`src/screens/debug/DebugLoginTest.tsx`**
  - Beautiful UI with buttons
  - Shows results on screen + console
  - Input fields for email/password

### Executable Test
- **`src/__tests__/debug-test.ts`**
  - Runnable with `ts-node`
  - CLI arguments support
  - Can be integrated into CI/CD

## 🎯 3 Cách Chạy Test

### 1️⃣ UI Component (Khuyên dùng ⭐)

```
File: src/screens/debug/DebugLoginTest.tsx
Setup: Add to App.tsx navigation
Time: 5 min total
Benefit: Beautiful UI, easy to use repeatedly
```

**How:**
1. Open `src/screens/debug/DebugLoginTest.tsx` (already created)
2. Add to your App.tsx or Stack Navigator:
   ```tsx
   import DebugLoginTest from './src/screens/debug/DebugLoginTest';
   <Stack.Screen name="DebugLogin" component={DebugLoginTest} />
   ```
3. Run app: `pnpm run ios`
4. Navigate to DebugLogin screen
5. Click "Test Endpoint" or "Test Login"
6. See results on screen + console

### 2️⃣ React Native Console (Fastest ⚡)

```
File: QUICK_TEST_CONSOLE.js
Setup: Copy & paste to Chrome DevTools
Time: 1 min total
Benefit: No need to modify app code
```

**How:**
1. Start app with remote debug enabled
2. Open `chrome://inspect` in Chrome
3. Open Console tab in DevTools
4. Copy entire content from `QUICK_TEST_CONSOLE.js`
5. Paste in console
6. Press Enter
7. See results in console

### 3️⃣ Direct Fetch Commands (Instant 🔥)

```
File: TEST_LOGIN_MUTATION.md (Cách 3)
Setup: Copy & paste individual commands
Time: 30 sec total
Benefit: Fastest for quick one-off tests
```

**How:**
1. Open React Native remote debugger console
2. Copy fetch command from TEST_LOGIN_MUTATION.md
3. Paste in console
4. Modify email/password as needed
5. Press Enter
6. See result

## 🧪 Test Scenarios

### Scenario 1: Endpoint is down
```javascript
// Command
fetch('http://localhost:3000/graphql', ...)

// Result
❌ Error: Failed to fetch / Cannot reach endpoint
```

### Scenario 2: Valid login credentials
```javascript
// Command
fetch(...).then(r => r.json()).then(d => console.log(d))

// Result
✅ {
  "data": {
    "login": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc...",
      "user": { "id": "1", "name": "Test User", ... }
    }
  }
}
```

### Scenario 3: Invalid credentials
```javascript
// Result
❌ {
  "errors": [{
    "message": "Invalid credentials",
    "extensions": { "code": "UNAUTHENTICATED" }
  }]
}
```

## 🔍 Files Modified

### AuthProvider.tsx (Improved Error Handling)
```
Changes:
- ✅ Better error extraction
- ✅ Handle graphQLErrors
- ✅ Handle networkError
- ✅ Detailed console logging
- ✅ Error prefixes [Login] [SignUp]
```

### package.json (New Script)
```json
{
  "scripts": {
    "test:debug": "node -r ts-node/register src/__tests__/debug-test.ts"
  }
}
```

## 📊 Files Created

```
✅ Core Debug
  └─ src/__tests__/debug-login.ts (116 lines)
  └─ src/__tests__/debug-login-runner.ts (87 lines)
  └─ src/__tests__/debug-test.ts (35 lines)

✅ UI Component
  └─ src/screens/debug/DebugLoginTest.tsx (253 lines)

✅ Documentation
  └─ QUICK_START_TEST.md (120 lines)
  └─ TEST_LOGIN_MUTATION.md (280 lines)
  └─ DEBUG_LOGIN_GUIDE.md (350 lines)
  └─ TEST_VISUAL_SUMMARY.md (280 lines)
  └─ QUICK_TEST_CONSOLE.js (40 lines)

✅ Utilities
  └─ setup-test.sh (shell script)
  └─ INDEX.md (this file)
```

## 🎓 How to Read These Files

### For Quick Setup (5 minutes)
1. Read: **QUICK_START_TEST.md**
2. Choose a method (recommend Component)
3. Follow steps
4. Test!

### For Visual Learners
1. Read: **TEST_VISUAL_SUMMARY.md**
2. Follow diagrams
3. Pick a method
4. Copy code

### For Deep Dive
1. Read: **DEBUG_LOGIN_GUIDE.md**
2. Understand error handling
3. Troubleshoot issues
4. Check console output

### For Quick Console Tests
1. Open: **QUICK_TEST_CONSOLE.js**
2. Copy code
3. Paste in DevTools console
4. See results

## 🚀 Getting Started

### Step 1: Choose Your Method
- ⭐ **Recommended**: UI Component (Method 1)
- ⚡ **Fastest**: Direct Console (Method 3)

### Step 2: Read Documentation
- 5 min read: **QUICK_START_TEST.md**
- Visual: **TEST_VISUAL_SUMMARY.md**
- Detailed: **DEBUG_LOGIN_GUIDE.md**

### Step 3: Run Test
- Setup as per method
- Click button or paste code
- Check results

### Step 4: Debug if Needed
- Check console logs
- Read troubleshooting section
- Compare with expected output

## 💡 Key Learnings

1. **Debug Functions** - Raw fetch calls without Apollo
2. **Test Runner** - Pretty-printed results
3. **UI Component** - Easy to use, no code needed
4. **Error Handling** - Improved in AuthProvider
5. **Console Commands** - Instant testing without setup

## ❓ FAQ

**Q: Which method should I use?**
A: UI Component if you want to test multiple times. Direct Fetch if you want instant results.

**Q: Do I need to modify my app?**
A: Only for UI Component method. Console method doesn't require any changes.

**Q: Why are there multiple files?**
A: Different use cases - UI, console, script, docs.

**Q: Can I delete these files later?**
A: Yes, they're for debugging only. Delete after you find the issue.

**Q: Where are the errors shown?**
A: On screen (UI Component) + console logs (all methods).

## 🔗 Quick Links

- 📚 Documentation
  - [Quick Start (5 min)](QUICK_START_TEST.md)
  - [Visual Guide](TEST_VISUAL_SUMMARY.md)
  - [Full Guide](TEST_LOGIN_MUTATION.md)
  - [Troubleshooting](DEBUG_LOGIN_GUIDE.md)

- 💻 Code
  - [Debug Functions](src/__tests__/debug-login.ts)
  - [UI Component](src/screens/debug/DebugLoginTest.tsx)
  - [Console Commands](QUICK_TEST_CONSOLE.js)

- 🛠️ Utilities
  - [Setup Script](setup-test.sh)
  - [This Index](INDEX.md)

## ✅ Checklist

- [x] Core debug functions created
- [x] Test runner created
- [x] UI component created
- [x] Documentation written
- [x] Error handling improved
- [x] Setup script created
- [x] Index created

## 🎯 Next Steps

1. **Right Now**: Read `QUICK_START_TEST.md` (5 minutes)
2. **Then**: Choose a method
3. **Then**: Run test
4. **Then**: Debug if needed
5. **Finally**: Fix the issue!

---

**Ready?** Start with 👉 **QUICK_START_TEST.md**
