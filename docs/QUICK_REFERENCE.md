# 📌 QUICK REFERENCE - Test Login Mutation

## ⚡ 30-Second Test

Copy-paste this into React Native console:

```javascript
fetch('http://localhost:3000/graphql',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query:`mutation Login($input:LoginInput!){login(input:$input){accessToken refreshToken user{id name email}}}`,variables:{input:{email:'test@example.com',password:'password'}}})}).then(r=>r.json()).then(d=>console.log(JSON.stringify(d,null,2)))
```

Press Enter. See result. Done! ✨

---

## 📱 5-Minute UI Test

1. Add to App.tsx:
```tsx
import DebugLoginTest from './src/screens/debug/DebugLoginTest';
<Stack.Screen name="DebugLogin" component={DebugLoginTest} />
```

2. Run: `pnpm run ios`
3. Navigate to DebugLogin screen
4. Click buttons

---

## 📚 Complete Guide

1. **Quick Start**: `QUICK_START_TEST.md` (5 min)
2. **Full Guide**: `DEBUG_LOGIN_GUIDE.md` (15 min)
3. **Visual**: `TEST_VISUAL_SUMMARY.md` (5 min)

---

## ✅ Success = This

```json
{
  "data": {
    "login": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc...",
      "user": { "id": "1", "name": "Test User", "email": "test@example.com" }
    }
  }
}
```

---

## ❌ Failed = This

```json
{
  "errors": [{
    "message": "Invalid credentials",
    "extensions": { "code": "UNAUTHENTICATED" }
  }]
}
```

---

## 🔧 Fix Common Issues

| Error | Fix |
|-------|-----|
| Cannot reach endpoint | Start GraphQL server on port 3000 |
| Invalid credentials | Use correct email/password |
| Null response | Check GraphQL schema |
| Network error | Check internet/port |

---

## 📂 Files Created

**Code**: `src/__tests__/` & `src/screens/debug/`  
**Docs**: `README_DEBUG_LOGIN.md`, `QUICK_START_TEST.md`, etc.  
**Utils**: `QUICK_TEST_CONSOLE.js`

---

**Now pick ONE method above and start testing! 🚀**
