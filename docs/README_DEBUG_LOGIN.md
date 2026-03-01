```
 ██████╗ ███████╗██████╗ ██╗   ██╗ ██████╗ ██████╗ 
██╔════╝ ██╔════╝██╔══██╗██║   ██║██╔════╝██╔════╝ 
██║  ███╗█████╗  ██████╔╝██║   ██║██║     ██║      
██║   ██║██╔══╝  ██╔══██╗██║   ██║██║     ██║      
╚██████╔╝███████╗██████╔╝╚██████╔╝╚██████╗╚██████╗ 
 ╚═════╝ ╚══════╝╚═════╝  ╚═════╝  ╚═════╝ ╚═════╝ 

 █████╗ ██████╗ ██╗   ██╗
██╔══██╗██╔══██╗██║   ██║
███████║██████╔╝██║   ██║
██╔══██║██╔═══╝ ██║   ██║
██║  ██║██║     ╚██████╔╝
╚═╝  ╚═╝╚═╝      ╚═════╝ 
```

# 🔍 Debug Login GraphQL API - Complete Setup Guide

Welcome! This guide will help you test your login mutation against your local GraphQL endpoint.

---

## ⚡ 60-Second Quick Start

### Fastest Way (Copy-Paste)

Paste this into React Native console:

```javascript
fetch('http://localhost:3000/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    query: `mutation Login($input:LoginInput!){login(input:$input){accessToken refreshToken user{id name email}}}`,
    variables: {input: {email:'test@example.com', password:'password'}}
  })
}).then(r => r.json()).then(d => console.log(JSON.stringify(d, null, 2)))
```

See results in console ✨

---

## 🚀 3 Ways to Test

### Method 1: UI Component (⭐ Recommended)

**What**: Beautiful interface in your app  
**Time**: 5 minutes  
**Setup**:

```tsx
// 1. Add to App.tsx
import DebugLoginTest from './src/screens/debug/DebugLoginTest';

// 2. Add route
<Stack.Screen name="DebugLogin" component={DebugLoginTest} />

// 3. Run app
pnpm run ios

// 4. Navigate to DebugLogin screen
// 5. Click buttons to test
```

**Why**: 
- ✅ No code changes needed after setup
- ✅ Beautiful UI
- ✅ Shows results on screen
- ✅ Easy to reuse

---

### Method 2: Console Commands (⚡ Fastest)

**What**: Paste commands into Chrome DevTools  
**Time**: 1 minute  
**Setup**:

```
1. Shake phone → Toggle Remote JS Debugger
2. Open Chrome: chrome://inspect
3. Go to Console tab
4. Copy from QUICK_TEST_CONSOLE.js
5. Paste in console
6. See results
```

**Why**:
- ✅ No setup needed
- ✅ Instant results
- ✅ No app modification
- ✅ Works immediately

---

### Method 3: Direct Fetch (🔥 Instant)

**What**: Single fetch command  
**Time**: 30 seconds  
**Setup**:

```
1. Open any console (Chrome, Xcode, Terminal)
2. Copy fetch code (see above)
3. Change email/password if needed
4. Press Enter
5. Done!
```

**Why**:
- ✅ Fastest setup
- ✅ No dependencies
- ✅ Works anywhere
- ✅ Pure fetch API

---

## 📊 What You'll See

### ✅ Success Response

```json
{
  "data": {
    "login": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "1",
        "name": "Test User",
        "email": "test@example.com"
      }
    }
  }
}
```

### ❌ Failed Response

```json
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
```

---

## 📁 Files Created

### Core Files
- `src/__tests__/debug-login.ts` - Debug functions
- `src/__tests__/debug-login-runner.ts` - Test runner
- `src/screens/debug/DebugLoginTest.tsx` - UI Component ⭐

### Documentation
- `START_HERE.md` - Quick summary
- `QUICK_START_TEST.md` - 5-minute setup
- `TEST_LOGIN_MUTATION.md` - All 3 methods
- `DEBUG_LOGIN_GUIDE.md` - Troubleshooting
- `TEST_VISUAL_SUMMARY.md` - Visual guide
- `INDEX.md` - File index
- `QUICK_TEST_CONSOLE.js` - Console commands

### Updated Files
- `src/providers/AuthProvider.tsx` - Better error handling
- `package.json` - New test script

---

## 🔧 Improvements Made

### 1. Better Error Handling
```tsx
// Before: Errors were sometimes lost
if (err.errors?.[0]?.extensions?.originalError?.message) {
  // Handle error
}

// After: Catches all error types
if (err.graphQLErrors?.length > 0) {
  // Handle GraphQL errors
} else if (err.networkError) {
  // Handle network errors  
} else if (err.message) {
  // Handle generic errors
}
```

### 2. Detailed Logging
```
[Login] Error caught: ...
[Login] Full error object: ...
[Login] GraphQL Error: ...
[Login] Network Error: ...
[Login] Generic Error: ...
[Login] Processed error object: ...
```

### 3. Debug Functions
Raw fetch calls without Apollo complexity for instant debugging.

---

## 🎯 Next Steps

### Step 1: Choose Your Method
- ⭐ **Component Method**: Best for repeated testing
- ⚡ **Console Method**: Best for quick testing
- 🔥 **Direct Fetch**: Best for instant testing

### Step 2: Setup (Follow method chosen)

**Component Method**:
```
1. Copy code above
2. Add to App.tsx
3. Run app
4. Click buttons
```

**Console Method**:
```
1. Open QUICK_TEST_CONSOLE.js
2. Copy code
3. Paste in DevTools console
4. See results
```

**Direct Fetch Method**:
```
1. Copy fetch command above
2. Paste in console
3. Press Enter
4. Done
```

### Step 3: Check Results
- ✅ Success → Login works!
- ❌ Failed → See error message for details

### Step 4: Debug if Needed
- Check console logs
- Read `DEBUG_LOGIN_GUIDE.md`
- Fix issue based on error message

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| `Cannot reach endpoint` | Start GraphQL server (likely on port 3000) |
| `Invalid credentials` | Check email/password are correct |
| `Login returned null` | GraphQL schema doesn't match expectations |
| `Still having issues` | Read `DEBUG_LOGIN_GUIDE.md` |

---

## 📚 Documentation Guide

```
├── START_HERE.md (this file) - Overview & TL;DR
├── QUICK_START_TEST.md - 5-minute setup
├── TEST_LOGIN_MUTATION.md - All 3 methods detailed
├── DEBUG_LOGIN_GUIDE.md - Full troubleshooting
├── TEST_VISUAL_SUMMARY.md - Visual diagrams
├── INDEX.md - File index & navigation
└── QUICK_TEST_CONSOLE.js - Copy-paste commands
```

---

## 🎓 Key Concepts

### Debug Functions (Bypass Apollo)
- Use raw fetch API
- No Apollo Client overhead
- See exact GraphQL response
- Easy to debug

### Error Handling (Improved)
- Catches all Apollo error types
- Better error messages
- Detailed console logging
- Easier to fix

### Testing Tools
- **Component**: For UI testing
- **Console**: For quick testing
- **Fetch**: For instant testing
- All provide same information, different interface

---

## ✅ Verification Checklist

- [ ] All files created successfully
- [ ] AuthProvider error handling improved
- [ ] Choose your preferred method
- [ ] Run test
- [ ] See results
- [ ] Debug if needed
- [ ] Fix issue

---

## 💡 Pro Tips

1. **Start with direct fetch** - Fastest way to see if endpoint works
2. **Then try component method** - For prettier UI and repeated testing
3. **Check console logs** - Even if UI shows error, logs have more detail
4. **Compare with expected output** - Use examples above

---

## 🔗 Quick Links

- **Quick Test**: Copy fetch code above → Paste in console
- **Setup Guide**: Read `QUICK_START_TEST.md`
- **Visual Guide**: Read `TEST_VISUAL_SUMMARY.md`
- **Troubleshooting**: Read `DEBUG_LOGIN_GUIDE.md`
- **UI Component**: Open `src/screens/debug/DebugLoginTest.tsx`
- **Console Commands**: Open `QUICK_TEST_CONSOLE.js`

---

## ❓ FAQ

**Q: Do I need to modify my app?**  
A: Only if using Component method. Console method needs no changes.

**Q: Which method is fastest?**  
A: Direct Fetch (30 seconds to result)

**Q: Can I use this for production?**  
A: No, these are debug tools only.

**Q: How do I delete these files?**  
A: Simply delete after debugging.

**Q: Will this affect my app?**  
A: Only if you add Component method to navigation.

---

## 🚀 Ready?

### Choose Your Path:

1. **Lazy** (1 min): Paste fetch code above into console
2. **Quick** (5 min): Read `QUICK_START_TEST.md`
3. **Thorough** (15 min): Read `DEBUG_LOGIN_GUIDE.md`

---

## 📝 Summary

You now have 3 ways to test your login mutation:
1. Beautiful UI component
2. Console commands  
3. Direct fetch code

All are ready to use. Pick one and start testing! 🎉

---

**Questions?** Check the relevant documentation file or review the console output for specific error details.

**Happy debugging!** 🔍✨
