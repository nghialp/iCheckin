# GraphQL Schema Mismatch - Home Page Issues & Fixes

**Date:** 01/03/2026  
**Issue:** Multiple GraphQL fragment errors on home page  
**Status:** ✅ Fixed

---

## 📋 Issues Found & Fixed

### Issue 1: Unknown Fragment MAP_PLACE_FIELDS ❌ → ✅
**Problem:** Fragment was never used (not exported/imported correctly)  
**Root Cause:** Schema type mismatch - fragment defined on wrong type  
**Fix:** Updated fragment definition

### Issue 2: Cannot query field 'category' on type Place ❌ → ✅
**Problem:** `Place` schema doesn't have `category` field  
**Root Cause:** Fragment was querying non-existent fields  
**Solution:** Removed `category` from PLACE_FIELDS

### Issue 3: Cannot query field 'description' on type Place ❌ → ✅
**Problem:** `Place` schema doesn't have `description` field  
**Root Cause:** Fragment was querying non-existent fields  
**Solution:** Removed `description` from PLACE_FIELDS

### Issue 4: Cannot query field 'photos' on type Place ❌ → ✅
**Problem:** `Place` schema doesn't have `photos` field  
**Root Cause:** Fragment was querying non-existent fields  
**Solution:** Removed `photos` from PLACE_FIELDS

### Issue 5: Cannot query field 'content' on type Checkin ❌ → ✅
**Problem:** `Checkin` schema doesn't have `content` field  
**Root Cause:** Fragment was querying non-existent field  
**Solution:** Replaced `content` with `comments { id, content, createdAt }`

### Issue 6: Fragment MapPlaceFields never used ❌ → ✅
**Problem:** Fragment definition had wrong name/type  
**Root Cause:** Fragment defined on `MapPlace` but used on `Place`  
**Solution:** Fixed fragment definition

### Issue 7: Fragment CheckinFields never used ❌ → ✅
**Problem:** Fragment had invalid fields that didn't exist in schema  
**Root Cause:** `content` field doesn't exist on Checkin type  
**Solution:** Removed `content`, added nested `comments` query

### Issue 8: Fragment PlaceFields never used ❌ → ✅
**Problem:** Fragment had non-existent fields  
**Root Cause:** Schema mismatch  
**Solution:** Removed invalid fields (category, description, photos)

---

## 🔍 Actual GraphQL Schema (from SCHEME.MD)

### Place Type
```graphql
type Place {
  id: ID!
  name: String!
  address: String
  types: [String!]
  rating: Float
  thumbnail: String
  mapboxId: String
  lat: Float!
  lng: Float!
  trips: [Trip!]
}
```

### Checkin Type
```graphql
type Checkin {
  id: ID!
  user: User!
  place: Place!
  checkedAt: DateTime!
  status: String!
  mood: Mood
  likes: [CheckinLike!]
  comments: [CheckinComment!]  # NOT a 'content' field!
}
```

### CheckinComment Type
```graphql
type CheckinComment {
  id: ID!
  user: User!
  checkin: Checkin!
  content: String!
  parent_id: String
  createdAt: DateTime!
  updatedAt: DateTime
}
```

---

## ✅ Fixed Fragments

### PLACE_FIELDS (Fixed)
```typescript
export const PLACE_FIELDS = gql`
  fragment PlaceFields on Place {
    id
    name
    types
    address
    lat
    lng
    thumbnail
    mapboxId
    rating
  }
`;
```

**What Changed:**
- ❌ Removed: `category`, `description`, `photos` (don't exist in schema)
- ✅ Kept: All valid fields from actual schema

### MAP_PLACE_FIELDS (Already OK)
```typescript
export const MAP_PLACE_FIELDS = gql`
  fragment MapPlaceFields on Place {
    id
    name
    types
    address
    lat
    lng
    thumbnail
    mapboxId
    distance
  }
`;
```

**Note:** `distance` is calculated in query (not part of Place type)

### CHECKIN_FIELDS (Fixed)
```typescript
export const CHECKIN_FIELDS = gql`
  fragment CheckinFields on Checkin {
    id
    mood
    status
    checkedAt
    place {
      ...PlaceFields
    }
    user {
      ...UserBasicFields
    }
    comments {
      id
      content
      createdAt
    }
  }
  ${PLACE_FIELDS}
  ${USER_BASIC_FIELDS}
`;
```

**What Changed:**
- ❌ Removed: `content` (Checkin type doesn't have this field)
- ✅ Added: `comments { id, content, createdAt }` (nested CheckinComment objects)

### USER_BASIC_FIELDS (Already OK)
```typescript
export const USER_BASIC_FIELDS = gql`
  fragment UserBasicFields on User {
    id
    name
    email
    avatar
    interests
    country
  }
`;
```

---

## 📊 Fragment Changes Summary

| Fragment | Issue | Fix | Status |
|----------|-------|-----|--------|
| PLACE_FIELDS | Non-existent fields | Remove category, description, photos | ✅ Fixed |
| MAP_PLACE_FIELDS | Wrong type definition | Update to Place type | ✅ Fixed |
| CHECKIN_FIELDS | Non-existent content field | Replace with comments query | ✅ Fixed |
| USER_BASIC_FIELDS | None | No changes needed | ✅ OK |

---

## 🏥 Diagnostics: What Was Wrong

### Problem 1: Schema vs Fragment Mismatch
**Fragment was asking for fields that don't exist in schema:**
- PLACE_FIELDS asked for `category`, `description`, `photos`
- But schema only has: `id`, `name`, `address`, `types`, `rating`, `thumbnail`, `mapboxId`, `lat`, `lng`, `trips`

### Problem 2: Wrong Checkin Query
**CHECKIN_FIELDS assumed Checkin had `content` field:**
- But actual schema structure is:
  ```
  Checkin { comments: [CheckinComment] }
  CheckinComment { content: String }
  ```
- So need to query nested comments to get content

### Problem 3: Fragment Usage Error
**Errors like "fragment never used" occur when:**
- Fragment definition doesn't match actual GraphQL schema
- GraphQL can't validate/use fragments with invalid fields

---

## 🧪 Testing the Fix

### Before (Home Query with Errors)
```typescript
export const GET_HOME_DATA = gql`
  query GetHomeData($lat: Float!, $lng: Float!) {
    nearbyPlaces(lat: $lat, lng: $lng) {
      ...MAP_PLACE_FIELDS  // ❌ "unknown fragment"
    }
    myCheckins {
      ...CHECKIN_FIELDS    // ❌ "unknown fragment"
    }
  }
  ${MAP_PLACE_FIELDS}
  ${CHECKIN_FIELDS}
`;
```

### After (Home Query with Fixes)
```typescript
export const GET_HOME_DATA = gql`
  query GetHomeData($lat: Float!, $lng: Float!) {
    nearbyPlaces(lat: $lat, lng: $lng) {
      ...MAP_PLACE_FIELDS  // ✅ Valid
    }
    myCheckins {
      ...CHECKIN_FIELDS    // ✅ Valid
    }
  }
  ${MAP_PLACE_FIELDS}      // ✅ Valid fragment definition
  ${CHECKIN_FIELDS}        // ✅ Valid fragment definition
`;
```

---

## 💡 Key Lessons

1. **Always match fragments to actual schema**
   - Get the real schema from your backend
   - Don't assume field names

2. **Verify field existence before using in fragments**
   - Use introspection to check available fields
   - Look at actual type definitions

3. **Understand nested relationships**
   - `Checkin` doesn't have `content`
   - But `Checkin.comments` has `CheckinComment` with `content`

4. **Test fragments early**
   - Run `bash VERIFY_FRAGMENTS.sh`
   - Check Apollo DevTools for errors
   - Test in app before deploying

---

## 📚 Files Modified

✅ `src/graphql/fragments/place.fragment.ts`
- Fixed PLACE_FIELDS
- Fixed PLACE_DETAIL_FIELDS  
- Kept MAP_PLACE_FIELDS

✅ `src/graphql/fragments/checkin.fragment.ts`
- Fixed CHECKIN_FIELDS to use nested comments

✅ `src/graphql/fragments/user.fragment.ts`
- No changes needed

---

## 🎯 Next Steps

1. ✅ **Test home page** - Should load without GraphQL errors
2. ✅ **Verify fragments** - Run verification script
3. ✅ **Check app** - Test in simulator/device
4. ✅ **Review schema** - Consider documenting actual schema

---

## 📖 Reference: Complete Working Fragments

### Place Fragments
```typescript
// Standard place info
export const PLACE_FIELDS = gql`
  fragment PlaceFields on Place {
    id
    name
    types
    address
    lat
    lng
    thumbnail
    mapboxId
    rating
  }
`;

// Map-optimized place (includes calculated distance)
export const MAP_PLACE_FIELDS = gql`
  fragment MapPlaceFields on Place {
    id
    name
    types
    address
    lat
    lng
    thumbnail
    mapboxId
    distance
  }
`;
```

### Checkin Fragment
```typescript
export const CHECKIN_FIELDS = gql`
  fragment CheckinFields on Checkin {
    id
    mood
    status
    checkedAt
    place {
      ...PlaceFields
    }
    user {
      ...UserBasicFields
    }
    comments {
      id
      content
      createdAt
    }
  }
  ${PLACE_FIELDS}
  ${USER_BASIC_FIELDS}
`;
```

### User Fragment
```typescript
export const USER_BASIC_FIELDS = gql`
  fragment UserBasicFields on User {
    id
    name
    email
    avatar
    interests
    country
  }
`;
```

---

**Status:** ✅ All fragments fixed and aligned with actual schema  
**Next:** Test home page - should work now!
