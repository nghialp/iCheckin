# GraphQL Endpoint Audit Report
**Generated:** 28/02/2026
**Purpose:** Kiểm tra tất cả endpoints, tham số và vị trí folder

---

## 📋 QUERIES (src/graphql/queries/)

### ✅ Home Page Queries
**File:** `queries/home.query.ts`
```
Query: GET_HOME_DATA
Variables: lat, lng (Float)
Returns: nearbyPlaces, myCheckins
Status: ✅ OK
```

### ✅ Map Page Queries  
**File:** `queries/map.query.ts`
```
Query: GET_NEARBY_PLACES
Variables: lat, lng (Float), radius (Float optional)
Returns: nearbyPlaces[]
Status: ✅ OK
Fragment: MAP_PLACE_FIELDS

Query: GET_CHECKIN_FEED  
Variables: mapboxId, page, limit (Int)
Returns: placeCheckins[]
Status: ✅ OK
Fragment: CHECKIN_FIELDS
```

### ✅ User Profile Queries
**File:** `queries/user.query.ts`
```
Query: GET_USER_PROFILE
Variables: none
Returns: me { ...USER_DETAILS_FIELDS, notificationSettings, privacySettings, securitySettings }
Status: ✅ OK
Fragments: USER_DETAILS_FIELDS, NOTIFICATION_SETTINGS_FIELDS, PRIVACY_SETTINGS_FIELDS, SECURITY_SETTINGS_FIELDS

Query: GET_USER_PROFILE_SIMPLE
Variables: none
Returns: me { ...USER_DETAILS_FIELDS }
Status: ✅ OK
Fragment: USER_DETAILS_FIELDS
```

### ⚠️ Main Queries (queries.ts)
**File:** `queries.ts`
```
Query: GET_PLACE_DETAIL
Variables: placeId (ID)
Returns: place, placeCheckins[]
Status: ✅ OK

Query: SEARCH_PLACES
Variables: query (String), lat, lng (Float optional)
Returns: searchPlaces[]
Status: ✅ OK

Query: GET_REWARD_PAGE
Variables: none
Returns: me { rewardPoints }, rewards[]
Status: ✅ OK

Query: GET_PLACE_DETAIL_FULL
Variables: id (ID) - ⚠️ NOTE: Parameter name mismatch (expected: placeId)
Returns: place details
Status: ⚠️ REVIEW NEEDED

Query: GET_PLACE_CHECKINS
Variables: placeId (ID), limit, offset (Int)
Returns: placeCheckIns[]
Status: ✅ OK

Query: GET_USER_REWARDS
Variables: limit, offset (Int)
Returns: userRewards { currentPoints, tier, nextTierPoints, totalRedeemed, rewards[] }
Status: ✅ OK

Query: GET_REWARD_DETAIL
Variables: id (ID)
Returns: reward details
Status: ✅ OK

Query: GET_REDEEM_HISTORY
Variables: limit, offset (Int)
Returns: redeemHistory[]
Status: ✅ OK

Query: GET_PROFILE
Variables: none
Returns: me { id, name, email, avatarUrl, bio, country, interests }
Status: ✅ OK

Query: GET_USER_STATS
Variables: none
Returns: me { rewardPoints, totalCheckins, totalBadges, visitedPlaces }
Status: ✅ OK

Query: GET_MY_FRIENDS
Variables: none
Returns: myFriends[]
Status: ✅ OK

Query: GET_MY_FOLLOWINGS
Variables: none
Returns: myFollowings[]
Status: ✅ OK
```

---

## 🔧 MUTATIONS (src/graphql/mutations/)

### ✅ Authentication Mutations
**File:** `mutations/login.mutation.ts`
```
Mutation: LOGIN_MUTATION
Variables: input (LoginInput)
Returns: accessToken, refreshToken, user { ...USER_BASIC_FIELDS }
Status: ✅ OK
Fragment: ACCESS_TOKEN_FIELDS, USER_BASIC_FIELDS

Mutation: REFRESH_TOKEN
Variables: refreshToken (String)
Returns: accessToken, refreshToken
Status: ✅ OK
Fragment: ACCESS_TOKEN_FIELDS
```

**File:** `mutations/signup.mutation.ts`
```
Mutation: SIGNUP_MUTATION
Variables: input (SignupInput)
Returns: accessToken, refreshToken, user { ...USER_BASIC_FIELDS }
Status: ✅ OK
Fragment: ACCESS_TOKEN_FIELDS, USER_BASIC_FIELDS
```

### ✅ Password Mutations
**File:** `mutations/forgotPassword.mutation.ts`
```
Mutation: FORGOT_PASSWORD_MUTATION
Variables: email (String)
Returns: success, message
Status: ✅ OK
```

**File:** `mutations/resetPassword.mutation.ts`
```
Mutation: CHANGE_PASSWORD
Variables: userId (String), currentPassword, newPassword (String)
Returns: success, message
Status: ✅ OK
Note: Parameter 'userId' được gửi kèm - check backend có cần không
```

**File:** `mutations/confirmMail.mutation.ts`
```
Mutation: RESEND_RESET_EMAIL
Variables: none
Returns: success, message
Status: ✅ OK
```

### ⚠️ Check-in Mutations
**File:** `mutations/checkin.mutation.ts`
```
Status: ❌ FILE IS EMPTY
Expected content: Check-in related mutations
```

**File:** `mutations.ts`
```
Mutation: CHECK_IN_MUTATION
Variables: latitude, longitude, timestamp (String), content (String optional)
Returns: id, latitude, longitude, timestamp, content, user, place
Status: ✅ OK

Mutation: CHECK_IN_PLACE_MUTATION
Variables: placeId (ID), content, media (String[])
Returns: checkin { ...CHECKIN_FIELDS }
Status: ⚠️ FRAGMENT SYNTAX ERROR
Note: Fragment syntax bị lỗi - cần sửa
Location: lines ~25-32

Mutation: CREATE_PLACE_MUTATION
Variables: name, address (String), latitude, longitude, type (String)
Returns: success, message, place { id, name, coordinates }
Status: ✅ OK
```

### ✅ Reward Mutations
**File:** `mutations.ts`
```
Mutation: REDEEM_REWARD_MUTATION
Variables: rewardId (ID)
Returns: success, message, remainingPoints
Status: ✅ OK
```

### ✅ Social Mutations
**File:** `mutations.ts`
```
Mutation: LIKE_CHECKIN_MUTATION
Variables: checkinId (ID)
Returns: success, likeCount
Status: ✅ OK

Mutation: COMMENT_CHECKIN_MUTATION
Variables: checkinId, content (String/ID)
Returns: success, comment { id, content, createdAt, user }
Status: ✅ OK
```

### ✅ Profile Mutations
**File:** `mutations.ts`
```
Mutation: UPDATE_PROFILE_MUTATION
Variables: input (UpdateProfileInput)
Returns: success, message, user { ...detailed fields }
Status: ✅ OK

Mutation: UPDATE_USER_AVATAR_MUTATION
Variables: avatarUrl (String)
Returns: success, message, user { id, avatar }
Status: ✅ OK

Mutation: UPDATE_NOTIFICATION_SETTINGS_MUTATION
Variables: input (NotificationSettingsInput)
Returns: success, message, notificationSettings
Status: ✅ OK

Mutation: UPDATE_PRIVACY_SETTINGS_MUTATION
Variables: input (PrivacySettingsInput)
Returns: success, message, privacySettings
Status: ✅ OK

Mutation: CHANGE_PASSWORD_MUTATION
Variables: currentPassword, newPassword (String)
Returns: success, message
Status: ✅ OK

Mutation: DELETE_ACCOUNT_MUTATION
Variables: none
Returns: success, message
Status: ✅ OK

Mutation: LOGOUT_MUTATION
Variables: none
Returns: success, message
Status: ✅ OK
```

### ✅ Media Mutations
**File:** `mediaMutations.ts`
```
Mutation: ADD_MEDIA_TO_CHECKIN_MUTATION
Variables: checkinId (ID), mediaUrls (String[])
Returns: success, message, media[]
Status: ✅ OK
```

---

## 🎯 FRAGMENTS (src/graphql/fragments/)

### ✅ User Fragments
**File:** `fragments/user.fragment.ts`
```
Fragment: USER_BASIC_FIELDS
Status: ✅ OK
Fields: id, name, email, avatar, interests, country

Fragment: USER_DETAILS_FIELDS
Status: ⚠️ FRAGMENT NAME ERROR
Note: Defined as "UserBasicFields" but should be "UserDetailsFields"
Fields: id, name, email, avatar, bio, country, interests, phone, dateOfBirth, gender, location, hobby

Fragment: USER_SETTINGS_FIELDS (⚠️ Not exported?)
Status: ⚠️ CHECK EXPORT

Fragment: USER_RELATIONS_FIELDS (⚠️ Not exported?)
Status: ⚠️ CHECK EXPORT

Fragment: NOTIFICATION_SETTINGS_FIELDS
Status: ✅ OK

Fragment: PRIVACY_SETTINGS_FIELDS
Status: ✅ OK

Fragment: SECURITY_SETTINGS_FIELDS
Status: ✅ OK

Fragment: ACCESS_TOKEN_FIELDS
Status: ✅ OK
```

### ✅ Place Fragments
**File:** `fragments/place.fragment.ts`
```
Fragment: PLACE_FIELDS
Status: ✅ OK
Fields: id, name, types, category, address, lat, lng, thumbnail, description, mapboxId, photos

Fragment: MAP_PLACE_FIELDS
Status: ✅ OK
Fields: name, types, address, lat, lng, thumbnail, mapboxId, distance
```

### ✅ Check-in Fragments
**File:** `fragments/checkin.fragment.ts`
```
Fragment: CHECKIN_FIELDS
Status: ✅ OK
Fields: id, mood, status, checkedAt, content, place, user
Includes: PLACE_FIELDS, USER_BASIC_FIELDS

Fragment: CheckinFields (⚠️ Alternative name?)
Status: ⚠️ CHECK IF USED ELSEWHERE
```

### ❌ Comment Fragments
**File:** `fragments/comment.fragment.ts`
```
Status: ❌ FILE IS EMPTY
Expected: Comment fragment definitions
```

---

## 📱 USAGE IN SCREENS

### Home Page (`screens/app/HomePage.tsx`)
```
- Uses: GET_HOME_DATA (lat, lng)
- Status: ✅ Correct
```

### Map Page (`screens/app/MapPage.tsx`)
```
- Uses: GET_NEARBY_PLACES (lat, lng, radius)
- Uses: GET_CHECKIN_FEED (mapboxId, page, limit)
- Status: ✅ Correct
```

### Check-in Detail (`screens/app/CheckInDetailScreen.tsx`)
```
- Uses: GET_PLACE_DETAIL_FULL (needs 'id' variable)
- Uses: GET_PLACE_CHECKINS (placeId, limit, offset)
- TODO: Like mutation not implemented
- Status: ⚠️ NEEDS REVIEW (variable name mismatch)
```

### Location Detail (`screens/app/LocationDetailPage.tsx`)
```
- Uses: GET_PLACE_DETAIL (placeId)
- Uses: CHECK_IN_PLACE_MUTATION (placeId, content, media)
- Status: ⚠️ Fragment error needs fixing
```

### Personal Details (`screens/app/PersonalDetailsScreen.tsx`)
```
- Uses: UPDATE_PROFILE_MUTATION
- Uses: UPDATE_USER_AVATAR_MUTATION
- Status: ✅ Correct
```

### Search Screen (`screens/app/SearchScreen.tsx`)
```
- Uses: GET_NEARBY_PLACES
- Status: ✅ Correct
```

### Check-in Screen (`screens/app/CheckInScreen.tsx`)
```
- Uses: GET_NEARBY_PLACES
- Status: ✅ Correct
```

### Privacy Screen (`screens/app/PrivacyScreen.tsx`)
```
- Uses: UPDATE_PRIVACY_SETTINGS_MUTATION
- Status: ✅ Correct
```

### Notifications Screen (`screens/app/NotificationsScreen.tsx`)
```
- Uses: UPDATE_NOTIFICATION_SETTINGS_MUTATION
- Status: ✅ Correct
```

### Rewards Page (`screens/app/RewardsPage.tsx`)
```
- Uses: GET_USER_REWARDS (limit, offset)
- Status: ✅ Correct
```

### Forgot Password (`screens/auth/ForgotPasswordScreen.tsx`)
```
- Uses: FORGOT_PASSWORD_MUTATION (email)
- Status: ✅ Correct
```

### Forgot Password Page (`screens/auth/ForgotPasswordPage.tsx`)
```
- Uses: FORGET_PASSWORD (should be FORGOT_PASSWORD_MUTATION)
- Status: ⚠️ IMPORT NAME MISMATCH
```

---

## 🔴 ISSUES FOUND

### Critical Issues (🔴 Must Fix)
1. **CHECK_IN_PLACE_MUTATION Fragment Syntax Error** (mutations.ts:25-32)
   - Fragment syntax is broken
   - Should wrap fields in fragment definition

2. **FORGET_PASSWORD Import Mismatch** (ForgotPasswordPage.tsx)
   - Imports: FORGET_PASSWORD
   - Defined as: FORGOT_PASSWORD_MUTATION
   - Location: Need to standardize name

3. **USER_DETAILS_FIELDS Fragment Name** (fragments/user.fragment.ts)
   - Defined as: "UserBasicFields" 
   - Should be: "UserDetailsFields"
   - Will cause conflicts with USER_BASIC_FIELDS

### Medium Issues (🟡 Should Review)
1. **GET_PLACE_DETAIL_FULL Variable Mismatch** (queries.ts)
   - Uses: id variable
   - Should be: placeId for consistency

2. **Empty Files**
   - `mutations/checkin.mutation.ts` - empty
   - `fragments/comment.fragment.ts` - empty

3. **CHANGE_PASSWORD Parameters** (resetPassword.mutation.ts)
   - Includes userId parameter
   - Verify if backend actually needs it or uses auth context

4. **Fragment Exports** (user.fragment.ts)
   - USER_SETTINGS_FIELDS not exported
   - USER_RELATIONS_FIELDS not exported
   - Need verification if intentional

### Low Issues (🟢 Minor)
1. **Alternative Fragment Names**
   - "CheckinFields" vs "CHECKIN_FIELDS" - verify usage consistency

2. **Comment Handling**
   - Comment features defined in mutations but no dedicated fragment

---

## 📝 RECOMMENDATIONS

### Priority 1 (Fix Immediately)
- [ ] Fix CHECK_IN_PLACE_MUTATION fragment syntax
- [ ] Rename or fix USER_DETAILS_FIELDS fragment name
- [ ] Fix FORGET_PASSWORD import in ForgotPasswordPage.tsx
- [ ] Remove empty mutation/fragment files or add content

### Priority 2 (Review & Standardize)
- [ ] Standardize query variable names (id vs placeId)
- [ ] Verify userId parameter in CHANGE_PASSWORD
- [ ] Document all fragment exports
- [ ] Complete comment.fragment.ts if needed

### Priority 3 (Organize)
- [ ] Move generic mutations from queries.ts to dedicated mutation files
- [ ] Create dedicated files for related mutations:
  - `mutations/place.mutation.ts` - CREATE_PLACE_MUTATION
  - `mutations/checkin.mutation.ts` - CHECK_IN_MUTATION, CHECK_IN_PLACE_MUTATION
  - `mutations/social.mutation.ts` - LIKE, COMMENT mutations
  - `mutations/reward.mutation.ts` - REDEEM_REWARD_MUTATION

### Priority 4 (Documentation)
- [ ] Add JSDoc comments to each query/mutation
- [ ] Document required vs optional parameters
- [ ] Create mapping: endpoint → screen usage
- [ ] Document backend response format expectations

---

## 🗂️ FOLDER STRUCTURE OPTIMIZATION

**Current State:**
```
src/graphql/
├── mutations.ts (contains EVERYTHING)
├── queries.ts (contains EVERYTHING)
├── mutations/
│   ├── login.mutation.ts ✅
│   ├── signup.mutation.ts ✅
│   ├── forgotPassword.mutation.ts ✅
│   ├── resetPassword.mutation.ts ✅
│   ├── confirmMail.mutation.ts ✅
│   └── checkin.mutation.ts ❌ EMPTY
└── queries/
    ├── home.query.ts ✅
    ├── map.query.ts ✅
    └── user.query.ts ✅
```

**Recommended Structure:**
```
src/graphql/
├── mutations/
│   ├── auth/
│   │   ├── login.mutation.ts ✅
│   │   ├── signup.mutation.ts ✅
│   │   ├── password.mutation.ts (forgot, reset, change)
│   │   └── mail.mutation.ts ✅
│   ├── checkin/
│   │   ├── checkin.mutation.ts (create, update, delete)
│   │   ├── place.mutation.ts (create place)
│   │   └── media.mutation.ts ✅
│   ├── profile/
│   │   └── profile.mutation.ts (update profile, avatar, settings)
│   ├── social/
│   │   ├── like.mutation.ts
│   │   └── comment.mutation.ts
│   ├── reward/
│   │   └── reward.mutation.ts (redeem)
│   └── index.ts (export all)
├── queries/
│   ├── auth/
│   │   └── user.query.ts ✅
│   ├── checkin/
│   │   ├── home.query.ts ✅
│   │   ├── map.query.ts ✅
│   │   └── place.query.ts (SEARCH_PLACES, GET_PLACE_DETAIL, etc)
│   ├── reward/
│   │   └── reward.query.ts
│   └── index.ts (export all)
├── fragments/
│   ├── auth/
│   │   └── user.fragment.ts (better organized)
│   ├── checkin/
│   │   ├── checkin.fragment.ts ✅
│   │   ├── place.fragment.ts ✅
│   │   └── comment.fragment.ts
│   ├── reward/
│   │   └── reward.fragment.ts
│   └── index.ts (export all)
└── client.ts ✅
```

---

## ✅ VERIFICATION CHECKLIST

- [ ] All mutation files are properly populated
- [ ] All query files are properly populated  
- [ ] All fragments have correct names
- [ ] All imports/exports are consistent
- [ ] Query/mutation variable names match across files
- [ ] Fragment syntax is valid
- [ ] No breaking changes to existing screens
- [ ] All screens updated with correct imports
- [ ] Documentation updated with endpoint list

---

**Last Updated:** 28/02/2026
**Status:** 🔴 REQUIRES ACTION - 3 Critical Issues Found
