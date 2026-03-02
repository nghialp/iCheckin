# Fragment Quick Reference Guide

**Status:** ✅ COMPLETE - All fragments organized and ready for use

---

## 🚀 Quick Start - Use Fragments in Queries

### Import Fragments
```typescript
import { 
  MAP_PLACE_FIELDS,        // For maps
  PLACE_FIELDS,            // For place lists  
  PLACE_DETAIL_FIELDS,     // For place detail pages
  CHECKIN_FIELDS,          // For check-in feeds
  USER_BASIC_FIELDS,       // For user references
  COMMENT_FIELDS,          // For comments
} from '../../graphql/fragments';
```

### Basic Query with Fragment
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

### Multiple Fragments
```typescript
import { CHECKIN_FIELDS, COMMENT_FIELDS } from '../../graphql/fragments';

export const GET_CHECKIN_WITH_COMMENTS = gql`
  query GetCheckinDetails($id: ID!) {
    checkin(id: $id) {
      ...CHECKIN_FIELDS
      comments {
        ...COMMENT_FIELDS
      }
    }
  }
  ${CHECKIN_FIELDS}
  ${COMMENT_FIELDS}
`;
```

---

## 📚 Fragment Library

### 🗺️ Place Fragments

| Fragment | Use Case | Fields |
|----------|----------|--------|
| `PLACE_FIELDS` | General place references | id, name, types, category, address, lat, lng, thumbnail, description, mapboxId, photos |
| `MAP_PLACE_FIELDS` | Map markers & displays | name, types, address, lat, lng, thumbnail, mapboxId, **distance** |
| `PLACE_DETAIL_FIELDS` | Place detail pages | id, name, type, address, city, image, rating, hours, isOpenNow, description, lat, lng, distance, totalCheckIns |
| `PLACE_WITH_CHECKINS_FIELDS` | Places + statistics | All PLACE_FIELDS + totalCheckIns + rating |

### 👤 User Fragments

| Fragment | Use Case | Fields |
|----------|----------|--------|
| `USER_BASIC_FIELDS` | User references | id, name, email, avatar, interests, country |
| `USER_DETAILS_FIELDS` | Full user profiles | All basic + bio, phone, dateOfBirth, gender, location, hobby |
| `USER_SETTINGS_FIELDS` | User preferences | notificationSettings, privacySettings, securitySettings |
| `USER_RELATIONS_FIELDS` | Social connections | friendRequests, followers, followings, likes, etc. |
| `NOTIFICATION_SETTINGS_FIELDS` | Notification prefs | pushNotifications, emailNotifications, smsNotifications, etc. |
| `PRIVACY_SETTINGS_FIELDS` | Privacy settings | locationAccess, profileVisibility, activityStatus, etc. |
| `SECURITY_SETTINGS_FIELDS` | Security config | twoFactorEnabled, loginHistory, connectedDevices |
| `ACCESS_TOKEN_FIELDS` | Auth tokens | accessToken, refreshToken |

### ✓ Check-in Fragments

| Fragment | Use Case | Fields |
|----------|----------|--------|
| `CHECKIN_FIELDS` | Check-in feeds | id, mood, status, checkedAt, content, place (PLACE_FIELDS), user (USER_BASIC_FIELDS) |

### 💬 Comment Fragments

| Fragment | Use Case | Fields |
|----------|----------|--------|
| `COMMENT_BASIC_FIELDS` | Simple comments | id, content, createdAt, user (USER_BASIC_FIELDS) |
| `COMMENT_FIELDS` | Full comments | All basic + updatedAt, parent_id, likes, liked |
| `COMMENT_WITH_REPLIES_FIELDS` | Nested comments | All COMMENT_FIELDS + replies (COMMENT_FIELDS) |

---

## 🎯 Common Use Cases

### 1. Home Page - Nearby Places + Check-ins
```typescript
import { MAP_PLACE_FIELDS, CHECKIN_FIELDS } from '../../graphql/fragments';

export const GET_HOME_DATA = gql`
  query GetHomeData($lat: Float!, $lng: Float!) {
    nearbyPlaces(lat: $lat, lng: $lng) {
      ...MAP_PLACE_FIELDS
    }
    myCheckins {
      ...CHECKIN_FIELDS
    }
  }
  ${MAP_PLACE_FIELDS}
  ${CHECKIN_FIELDS}
`;
```

### 2. Map Page - Map Markers
```typescript
import { MAP_PLACE_FIELDS } from '../../graphql/fragments';

export const GET_MAP_PLACES = gql`
  query GetMapPlaces($lat: Float!, $lng: Float!, $radius: Float!) {
    placesNearby(lat: $lat, lng: $lng, radius: $radius) {
      ...MAP_PLACE_FIELDS
    }
  }
  ${MAP_PLACE_FIELDS}
`;
```

### 3. Place Detail Page
```typescript
import { PLACE_DETAIL_FIELDS, CHECKIN_FIELDS, COMMENT_FIELDS } from '../../graphql/fragments';

export const GET_PLACE_DETAIL = gql`
  query GetPlaceDetail($id: ID!) {
    place(id: $id) {
      ...PLACE_DETAIL_FIELDS
      recentCheckins {
        ...CHECKIN_FIELDS
      }
      comments {
        ...COMMENT_FIELDS
      }
    }
  }
  ${PLACE_DETAIL_FIELDS}
  ${CHECKIN_FIELDS}
  ${COMMENT_FIELDS}
`;
```

### 4. User Profile Page
```typescript
import { USER_DETAILS_FIELDS, CHECKIN_FIELDS } from '../../graphql/fragments';

export const GET_USER_PROFILE = gql`
  query GetUserProfile($id: ID!) {
    user(id: $id) {
      ...USER_DETAILS_FIELDS
      recentCheckins {
        ...CHECKIN_FIELDS
      }
    }
  }
  ${USER_DETAILS_FIELDS}
  ${CHECKIN_FIELDS}
`;
```

### 5. User Settings Page
```typescript
import { USER_SETTINGS_FIELDS } from '../../graphql/fragments';

export const GET_USER_SETTINGS = gql`
  query GetUserSettings {
    me {
      ...USER_SETTINGS_FIELDS
    }
  }
  ${USER_SETTINGS_FIELDS}
`;
```

### 6. Comment Thread
```typescript
import { COMMENT_WITH_REPLIES_FIELDS } from '../../graphql/fragments';

export const GET_COMMENT_THREAD = gql`
  query GetCommentThread($id: ID!) {
    comment(id: $id) {
      ...COMMENT_WITH_REPLIES_FIELDS
    }
  }
  ${COMMENT_WITH_REPLIES_FIELDS}
`;
```

---

## ⚠️ Common Mistakes to Avoid

### ❌ DON'T - Forget to include fragment in query
```typescript
export const BAD_QUERY = gql`
  query GetPlaces {
    places {
      ...PLACE_FIELDS  // Fragment spread without inclusion
    }
  }
  // Missing: ${PLACE_FIELDS}
`;
```

### ✅ DO - Include all fragment dependencies
```typescript
export const GOOD_QUERY = gql`
  query GetPlaces {
    places {
      ...PLACE_FIELDS
    }
  }
  ${PLACE_FIELDS}  // ✓ Included
`;
```

### ❌ DON'T - Import from individual files
```typescript
// ❌ Avoid this
import { PLACE_FIELDS } from '../../graphql/fragments/place.fragment';
```

### ✅ DO - Import from index file
```typescript
// ✅ Prefer this
import { PLACE_FIELDS } from '../../graphql/fragments';
```

### ❌ DON'T - Duplicate field definitions
```typescript
// ❌ Avoid this
export const MY_QUERY = gql`
  query GetPlaces {
    places {
      id
      name
      address
      lat
      lng
      // ... repeating fields from PLACE_FIELDS
    }
  }
`;
```

### ✅ DO - Use fragment spreads
```typescript
// ✅ Use fragments instead
export const MY_QUERY = gql`
  query GetPlaces {
    places {
      ...PLACE_FIELDS
    }
  }
  ${PLACE_FIELDS}
`;
```

---

## 🔍 How to Add a New Fragment

### Step 1: Create/Edit Fragment File
```typescript
// src/graphql/fragments/your.fragment.ts

import { gql } from '@apollo/client';
import { OTHER_FRAGMENT } from './other.fragment';

/**
 * Your fragment description
 * Used in: specific query/mutation
 */
export const YOUR_FRAGMENT = gql`
  fragment YourFragmentName on Type {
    field1
    field2
    ...OTHER_FRAGMENT
  }
  ${OTHER_FRAGMENT}
`;
```

### Step 2: Export from Index
```typescript
// src/graphql/fragments/index.ts

export { YOUR_FRAGMENT } from './your.fragment';
```

### Step 3: Use in Query
```typescript
import { YOUR_FRAGMENT } from '../../graphql/fragments';

export const MY_QUERY = gql`
  query MyQuery {
    myData {
      ...YOUR_FRAGMENT
    }
  }
  ${YOUR_FRAGMENT}
`;
```

---

## 📋 Fragment Checklist

Before using a fragment, verify:

- [ ] Fragment is exported from `src/graphql/fragments/index.ts`
- [ ] Fragment name matches GraphQL definition name
- [ ] Import statement uses the index file: `from '../../graphql/fragments'`
- [ ] Fragment is included in query: `${FRAGMENT_NAME}`
- [ ] All dependencies are included if fragment uses other fragments
- [ ] Field names match backend schema

---

## 🆘 Troubleshooting

### Issue: "Unknown fragment"
**Solution:** Check fragment is included in query/mutation with `${FRAGMENT_NAME}`

### Issue: "Cannot find module"
**Solution:** Import from index file: `from '../../graphql/fragments'`

### Issue: "Field not found in type"
**Solution:** Check fragment definition matches backend schema fields

### Issue: "Circular dependency"
**Solution:** Check fragments don't reference each other circularly

---

## 📞 Need Help?

1. Check **FRAGMENTS_ORGANIZATION.md** for detailed documentation
2. See **FRAGMENTS_FIX_REPORT.md** for complete implementation details
3. Run **VERIFY_FRAGMENTS.sh** to validate fragment setup
4. Review existing queries in `src/graphql/queries/` for examples

---

## 📊 Fragment Stats

- **Total Fragments:** 17
- **Fragment Files:** 4
- **Organized By:** Domain (user, place, check-in, comment)
- **Status:** ✅ Ready for Production

**Last Updated:** 01/03/2026
