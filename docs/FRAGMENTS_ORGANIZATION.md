# GraphQL Fragments - Organization & Reusability Guide

**Date:** 01/03/2026  
**Purpose:** Ensure all fragments are properly organized and reusable

---

## 🎯 Fragment Organization

### User Fragments (user.fragment.ts)
```
USER_BASIC_FIELDS
├─ id, name, email, avatar, interests, country
└─ Use in: List views, profile previews

USER_DETAILS_FIELDS
├─ All basic fields + bio, phone, dateOfBirth, gender, location, hobby
└─ Use in: Profile pages, user detail views

NOTIFICATION_SETTINGS_FIELDS
├─ pushNotifications, emailNotifications, smsNotifications, etc.
└─ Use in: Settings pages

PRIVACY_SETTINGS_FIELDS
├─ locationAccess, profileVisibility, activityStatus, etc.
└─ Use in: Privacy settings pages

SECURITY_SETTINGS_FIELDS
├─ twoFactorEnabled, loginHistory, connectedDevices
└─ Use in: Security settings

ACCESS_TOKEN_FIELDS
├─ accessToken, refreshToken
└─ Use in: Login/logout mutations

USER_SETTINGS_FIELDS
├─ notificationSettings + privacySettings + securitySettings
└─ Use in: Complete settings queries

USER_RELATIONS_FIELDS
├─ friendRequests, followers, followings, likes, etc.
└─ Use in: Social/connection features
```

### Place Fragments (place.fragment.ts) ✅ REORGANIZED
```
PLACE_FIELDS (Standard)
├─ id, name, types, category, address, lat, lng, thumbnail, description, mapboxId, photos
└─ Use in: Place lists, general place references

MAP_PLACE_FIELDS (For Map Display)
├─ name, types, address, lat, lng, thumbnail, mapboxId, distance
└─ Use in: Map pages, nearby places queries, location-based features

PLACE_DETAIL_FIELDS (For Detail Pages) ✨ NEW
├─ id, name, type, address, city, image, rating, hours, isOpenNow, description, lat, lng, distance, totalCheckIns
└─ Use in: Place detail pages, full place information

PLACE_WITH_CHECKINS_FIELDS (Place + Check-in Count) ✨ NEW
├─ All PLACE_FIELDS + totalCheckIns + rating
└─ Use in: Queries that need both place and check-in statistics
```

### Check-in Fragments (checkin.fragment.ts)
```
CHECKIN_FIELDS
├─ id, mood, status, checkedAt, content, place {...PlaceFields}, user {...UserBasicFields}
└─ Use in: Feed queries, check-in lists, check-in details

(Reuses: PLACE_FIELDS, USER_BASIC_FIELDS)
```

### Comment Fragments (comment.fragment.ts)
```
COMMENT_BASIC_FIELDS
├─ id, content, createdAt, user {...UserBasicFields}
└─ Use in: Comment previews, simple comment lists

COMMENT_FIELDS
├─ All basic fields + updatedAt, parent_id, likes, liked
└─ Use in: Comment threads, detailed comment displays

COMMENT_WITH_REPLIES_FIELDS
├─ All COMMENT_FIELDS + replies {...CommentFields}
└─ Use in: Nested comment threads with replies

(Reuses: USER_BASIC_FIELDS, COMMENT_FIELDS)
```

---

## ✅ Fragment Dependencies Map

```
┌─────────────────────────────────────────────┐
│         ROOT FRAGMENTS                      │
│  (No dependencies)                          │
├─────────────────────────────────────────────┤
│ • USER_BASIC_FIELDS                         │
│ • PLACE_FIELDS                              │
│ • ACCESS_TOKEN_FIELDS                       │
└────────────┬────────────────────────────────┘
             │
             ├─→ CHECKIN_FIELDS
             │   ├─ Uses: PLACE_FIELDS
             │   └─ Uses: USER_BASIC_FIELDS
             │
             ├─→ COMMENT_BASIC_FIELDS
             │   └─ Uses: USER_BASIC_FIELDS
             │
             ├─→ COMMENT_FIELDS
             │   └─ Uses: USER_BASIC_FIELDS
             │
             ├─→ COMMENT_WITH_REPLIES_FIELDS
             │   └─ Uses: COMMENT_FIELDS
             │
             └─→ PLACE_WITH_CHECKINS_FIELDS
                 └─ Uses: PLACE_FIELDS
```

---

## 📋 Complete Fragment List by File

### 1. **user.fragment.ts**
| Fragment Name | Used By | Notes |
|---------------|---------|-------|
| USER_BASIC_FIELDS | CHECKIN_FIELDS, COMMENT_*, most queries | Minimal user data |
| USER_DETAILS_FIELDS | GET_USER_PROFILE | Full user profile |
| USER_SETTINGS_FIELDS | GET_USER_PROFILE | User settings |
| USER_RELATIONS_FIELDS | Social queries | Friends, followers, etc. |
| NOTIFICATION_SETTINGS_FIELDS | Settings queries | Notification prefs |
| PRIVACY_SETTINGS_FIELDS | Settings queries | Privacy settings |
| SECURITY_SETTINGS_FIELDS | Settings queries | Security settings |
| ACCESS_TOKEN_FIELDS | Auth mutations | Login/refresh tokens |

### 2. **place.fragment.ts** ✅ REORGANIZED
| Fragment Name | Used By | Notes |
|---------------|---------|-------|
| PLACE_FIELDS | CHECKIN_FIELDS, place lists | Standard place info |
| MAP_PLACE_FIELDS ✅ FIXED | GET_HOME_DATA, map queries | Optimized for maps |
| PLACE_DETAIL_FIELDS ✨ NEW | Place detail queries | Full place details |
| PLACE_WITH_CHECKINS_FIELDS ✨ NEW | Place + stats queries | Place with counts |

### 3. **checkin.fragment.ts**
| Fragment Name | Used By | Notes |
|---------------|---------|-------|
| CHECKIN_FIELDS | Feed queries, lists | Complete check-in data |

### 4. **comment.fragment.ts**
| Fragment Name | Used By | Notes |
|---------------|---------|-------|
| COMMENT_BASIC_FIELDS | Comment lists | Basic comment |
| COMMENT_FIELDS | Comment details | Extended comment |
| COMMENT_WITH_REPLIES_FIELDS | Nested comments | Comments with replies |

---

## 🚀 How to Use Fragments Effectively

### Rule 1: Import Only What You Need
```typescript
// ✅ Good
import { PLACE_FIELDS, USER_BASIC_FIELDS } from '../../graphql/fragments';

// ❌ Avoid
import * from '../../graphql/fragments';
```

### Rule 2: Reuse Existing Fragments in New Fragments
```typescript
// ✅ Good - Reusing existing fragments
export const PLACE_WITH_STATS = gql`
  fragment PlaceWithStats on Place {
    ...PLACE_FIELDS
    totalCheckIns
    averageRating
  }
  ${PLACE_FIELDS}
`;

// ❌ Avoid - Duplicating field definitions
export const PLACE_WITH_STATS = gql`
  fragment PlaceWithStats on Place {
    id
    name
    types
    category
    address
    lat
    lng
    thumbnail
    description
    mapboxId
    photos
    totalCheckIns
    averageRating
  }
`;
```

### Rule 3: Use Fragments in Queries
```typescript
// ✅ Good - Using fragments
import { PLACE_FIELDS, MAP_PLACE_FIELDS } from '../../graphql/fragments';

export const GET_NEARBY_PLACES = gql`
  query GetNearbyPlaces($lat: Float!, $lng: Float!) {
    nearbyPlaces(lat: $lat, lng: $lng) {
      ...MAP_PLACE_FIELDS
    }
  }
  ${MAP_PLACE_FIELDS}
`;

// ❌ Avoid - Repeating fields
export const GET_NEARBY_PLACES = gql`
  query GetNearbyPlaces($lat: Float!, $lng: Float!) {
    nearbyPlaces(lat: $lat, lng: $lng) {
      name
      types
      address
      lat
      lng
      thumbnail
      mapboxId
      distance
    }
  }
`;
```

---

## 🔧 Common Fragment Usage Patterns

### Pattern 1: Simple Query with Fragment
```typescript
import { PLACE_FIELDS } from '../../graphql/fragments';

export const GET_PLACES = gql`
  query GetPlaces {
    places {
      ...PLACE_FIELDS
    }
  }
  ${PLACE_FIELDS}
`;
```

### Pattern 2: Nested Fragments
```typescript
import { CHECKIN_FIELDS, PLACE_FIELDS, USER_BASIC_FIELDS } from '../../graphql/fragments';

export const GET_CHECKINS = gql`
  query GetCheckins {
    myCheckins {
      ...CHECKIN_FIELDS
    }
  }
  ${CHECKIN_FIELDS}
  ${PLACE_FIELDS}
  ${USER_BASIC_FIELDS}
`;
```

### Pattern 3: Multiple Fragment Spreads
```typescript
import { 
  CHECKIN_FIELDS, 
  COMMENT_FIELDS,
  PLACE_FIELDS 
} from '../../graphql/fragments';

export const GET_PLACE_DETAILS = gql`
  query GetPlaceDetails($id: ID!) {
    place(id: $id) {
      ...PLACE_FIELDS
      checkins {
        ...CHECKIN_FIELDS
      }
      comments {
        ...COMMENT_FIELDS
      }
    }
  }
  ${PLACE_FIELDS}
  ${CHECKIN_FIELDS}
  ${COMMENT_FIELDS}
`;
```

---

## ✅ Verification Checklist

- [x] All fragment names match their definition names
- [x] All fragments properly exported from index.ts
- [x] No circular fragment dependencies
- [x] Fragment reuse is maximized
- [x] Comments explain fragment purpose
- [x] All used fragments are included in query
- [x] No duplicate field definitions

---

## 📚 Fragment Best Practices

1. **Keep fragments small and focused** - Each fragment should represent a clear domain
2. **Reuse fragments** - Don't repeat field definitions
3. **Document purpose** - Add comments explaining when to use each fragment
4. **Use consistent naming** - Fragment names should match their exported variable names
5. **Include all dependencies** - When using fragments in queries, include all dependencies
6. **Group by domain** - Keep related fragments in the same file

---

## 🎁 New Fragments Added

### PLACE_DETAIL_FIELDS ✨
For queries that need full place information for detail pages:
```typescript
import { PLACE_DETAIL_FIELDS } from '../../graphql/fragments';

export const GET_PLACE_DETAIL = gql`
  query GetPlaceDetail($id: ID!) {
    place(id: $id) {
      ...PLACE_DETAIL_FIELDS
    }
  }
  ${PLACE_DETAIL_FIELDS}
`;
```

### PLACE_WITH_CHECKINS_FIELDS ✨
For queries that need place data combined with check-in statistics:
```typescript
import { PLACE_WITH_CHECKINS_FIELDS } from '../../graphql/fragments';

export const GET_PLACE_WITH_STATS = gql`
  query GetPlaceWithStats($id: ID!) {
    place(id: $id) {
      ...PLACE_WITH_CHECKINS_FIELDS
    }
  }
  ${PLACE_WITH_CHECKINS_FIELDS}
`;
```

---

## 🔍 Fragment Import Quick Reference

### From Dedicated File (Not Recommended)
```typescript
import { PLACE_FIELDS } from '../../graphql/fragments/place.fragment';
```

### From Index File (Recommended) ✅
```typescript
import { PLACE_FIELDS, MAP_PLACE_FIELDS } from '../../graphql/fragments';
```

---

## 📝 Summary of Changes

| Change | File | Status |
|--------|------|--------|
| Fixed MAP_PLACE_FIELDS fragment name issue | place.fragment.ts | ✅ Fixed |
| Added PLACE_DETAIL_FIELDS | place.fragment.ts | ✨ New |
| Added PLACE_WITH_CHECKINS_FIELDS | place.fragment.ts | ✨ New |
| Updated fragments/index.ts exports | fragments/index.ts | ✅ Updated |
| Added JSDoc comments | place.fragment.ts | ✅ Added |

---

**Status:** ✅ All fragments properly organized and ready for reuse!  
**Next:** Use these fragments consistently across all queries and mutations
