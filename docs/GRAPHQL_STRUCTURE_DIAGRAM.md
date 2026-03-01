# GraphQL Endpoint Structure Diagram

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│            Application Components                        │
│  (Screens, Pages, Components)                           │
└─────────────────────────────────┬───────────────────────┘
                                  │
                    ┌─────────────▼──────────────┐
                    │   Apollo Client Wrapper    │
                    │   (ApolloWrapper.tsx)      │
                    └─────────────┬──────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
        ▼                         ▼                         ▼
  ┌──────────┐          ┌─────────────────┐       ┌─────────────────┐
  │ QUERIES  │          │   MUTATIONS     │       │    FRAGMENTS    │
  └──────────┘          └─────────────────┘       └─────────────────┘
        │                         │                         │
   ┌────┴─────────────┐      ┌────┴─────────────┐      ┌───┴────────────┐
   │                  │      │                  │      │                │
   ▼                  ▼      ▼                  ▼      ▼                ▼
queries/         queries/   mutations/     mutations/ fragments/  fragments/
home.query   place.query  profile.mutation social.mutation user.fragment
map.query    reward.query checkin.mutation reward.mutation place.fragment
user.query            place.mutation       comment.fragment
             auth/              auth/       
             (login,etc)        (login,etc)
```

## Queries Organization

```
queries/
├── index.ts (centralized exports)
├── home.query.ts
│   └── GET_HOME_DATA
│
├── map.query.ts  
│   ├── GET_NEARBY_PLACES
│   └── GET_CHECKIN_FEED
│
├── user.query.ts
│   ├── GET_USER_PROFILE
│   ├── GET_USER_PROFILE_SIMPLE
│   ├── GET_USER_STATS
│   ├── GET_MY_FRIENDS
│   └── GET_MY_FOLLOWINGS
│
├── place.query.ts
│   ├── GET_PLACE_DETAIL
│   ├── GET_PLACE_DETAIL_FULL
│   ├── GET_PLACE_CHECKINS
│   └── SEARCH_PLACES
│
└── reward.query.ts
    ├── GET_REWARD_PAGE
    ├── GET_USER_REWARDS
    ├── GET_REWARD_DETAIL
    ├── GET_REDEEM_HISTORY
    ├── GET_REWARDS_BY_CATEGORY
    └── GET_POPULAR_REWARDS
```

## Mutations Organization

```
mutations/
├── index.ts (centralized exports)
│
├── auth/
│   ├── login.mutation.ts
│   │   ├── LOGIN_MUTATION
│   │   └── REFRESH_TOKEN
│   ├── signup.mutation.ts
│   │   └── SIGNUP_MUTATION
│   ├── forgotPassword.mutation.ts
│   │   ├── FORGOT_PASSWORD_MUTATION
│   │   └── FORGET_PASSWORD (alias)
│   ├── resetPassword.mutation.ts
│   │   └── CHANGE_PASSWORD
│   └── confirmMail.mutation.ts
│       └── RESEND_RESET_EMAIL
│
├── checkin.mutation.ts
│   ├── CHECK_IN_PLACE_MUTATION
│   ├── CHECK_IN_MUTATION
│   ├── UPDATE_CHECKIN_MUTATION
│   └── DELETE_CHECKIN_MUTATION
│
├── place.mutation.ts
│   ├── CREATE_PLACE_MUTATION
│   ├── UPDATE_PLACE_MUTATION
│   └── DELETE_PLACE_MUTATION
│
├── profile.mutation.ts
│   ├── UPDATE_PROFILE_MUTATION
│   ├── UPDATE_USER_AVATAR_MUTATION
│   ├── UPDATE_NOTIFICATION_SETTINGS_MUTATION
│   ├── UPDATE_PRIVACY_SETTINGS_MUTATION
│   ├── CHANGE_PASSWORD_MUTATION
│   ├── DELETE_ACCOUNT_MUTATION
│   └── LOGOUT_MUTATION
│
├── social.mutation.ts
│   ├── LIKE_CHECKIN_MUTATION
│   ├── UNLIKE_CHECKIN_MUTATION
│   ├── COMMENT_CHECKIN_MUTATION
│   ├── DELETE_COMMENT_MUTATION
│   ├── LIKE_COMMENT_MUTATION
│   ├── FOLLOW_USER_MUTATION
│   ├── UNFOLLOW_USER_MUTATION
│   ├── SEND_FRIEND_REQUEST_MUTATION
│   ├── ACCEPT_FRIEND_REQUEST_MUTATION
│   └── DECLINE_FRIEND_REQUEST_MUTATION
│
└── reward.mutation.ts
    ├── REDEEM_REWARD_MUTATION
    ├── LIKE_REWARD_MUTATION
    ├── UNLIKE_REWARD_MUTATION
    └── SHARE_REWARD_MUTATION
```

## Fragments Organization

```
fragments/
├── index.ts (centralized exports)
│
├── user.fragment.ts
│   ├── USER_BASIC_FIELDS
│   ├── USER_DETAILS_FIELDS (FIXED: was UserBasicFields)
│   ├── USER_SETTINGS_FIELDS
│   ├── USER_RELATIONS_FIELDS
│   ├── NOTIFICATION_SETTINGS_FIELDS
│   ├── PRIVACY_SETTINGS_FIELDS
│   ├── SECURITY_SETTINGS_FIELDS
│   └── ACCESS_TOKEN_FIELDS
│
├── place.fragment.ts
│   ├── PLACE_FIELDS
│   └── MAP_PLACE_FIELDS
│
├── checkin.fragment.ts
│   └── CHECKIN_FIELDS
│
└── comment.fragment.ts (POPULATED: was empty)
    ├── COMMENT_BASIC_FIELDS
    ├── COMMENT_FIELDS
    └── COMMENT_WITH_REPLIES_FIELDS
```

## Data Flow Example

### User Login Flow
```
ForgotPasswordPage.tsx
        │
        ▼
useApolloMutationWrapper()
        │
        ▼
FORGOT_PASSWORD_MUTATION
        │
        ▼
mutations/forgotPassword.mutation.ts
        │
        ▼
Apollo Client
        │
        ▼
GraphQL Server
        │
        ▼
Response (success, message)
        │
        ▼
useApolloMutationWrapper Hook
        │
        ▼
Update Local State / Cache
```

### User Profile Query Flow
```
ProfileScreen.tsx
        │
        ▼
useApolloQueryWrapper()
        │
        ▼
GET_USER_PROFILE
        │
        ▼
queries/user.query.ts
        │
        ├─▶ USER_DETAILS_FIELDS
        ├─▶ NOTIFICATION_SETTINGS_FIELDS
        ├─▶ PRIVACY_SETTINGS_FIELDS
        └─▶ SECURITY_SETTINGS_FIELDS
        │
        ▼
Apollo Client Cache
        │
        ▼
GraphQL Server
        │
        ▼
User Data with all nested fields
```

## Import Path Examples

### Recommended (New Way)
```typescript
// Direct from feature file
import { GET_HOME_DATA } from '../graphql/queries/home.query';
import { GET_NEARBY_PLACES } from '../graphql/queries/map.query';
import { LOGIN_MUTATION } from '../graphql/mutations/auth/login.mutation';
import { UPDATE_PROFILE_MUTATION } from '../graphql/mutations/profile.mutation';
import { USER_DETAILS_FIELDS } from '../graphql/fragments/user.fragment';

// From index files
import { 
  GET_HOME_DATA, 
  GET_NEARBY_PLACES 
} from '../graphql/queries';

import { 
  LOGIN_MUTATION, 
  UPDATE_PROFILE_MUTATION 
} from '../graphql/mutations';

import { USER_DETAILS_FIELDS } from '../graphql/fragments';
```

### Backward Compatible (Old Way)
```typescript
// Still works - re-exported from root
import { GET_HOME_DATA } from '../graphql/queries';
import { LOGIN_MUTATION } from '../graphql/mutations';
```

## Circular Dependency Resolution

```
✅ queries/index.ts 
   ├─ No imports from queries.ts (root)
   └─ Only exports from subdirectories

✅ mutations/index.ts
   ├─ No imports from mutations.ts (root)
   └─ Only exports from subdirectories

✅ fragments/index.ts
   ├─ No circular imports
   └─ Only exports from subdirectories

✅ queries.ts (root)
   ├─ Imports from queries/home.query, queries/map.query, etc.
   ├─ Does NOT import from queries/index.ts
   └─ Re-exports for backward compatibility

✅ mutations.ts (root)
   ├─ Imports from mutations/index.ts
   └─ Re-exports for backward compatibility
```

## File Statistics

```
┌──────────────────────┬────────┐
│ Category             │ Count  │
├──────────────────────┼────────┤
│ Mutation Files       │   11   │
│ Query Files          │    6   │
│ Fragment Files       │    5   │
│ Total GraphQL Files  │   22   │
├──────────────────────┼────────┤
│ Mutations Defined    │   50+  │
│ Queries Defined      │   25+  │
│ Fragments Defined    │   18   │
├──────────────────────┼────────┤
│ Files Created        │    9   │
│ Files Modified       │    7   │
│ Issues Fixed         │    3   │
└──────────────────────┴────────┘
```

## Query-Mutation-Fragment Relationship Map

```
┌─────────────────────────────────────────────────────────────┐
│ FEATURE: Check-in                                           │
├─────────────────────────────────────────────────────────────┤
│ Queries:      GET_CHECKIN_FEED, GET_PLACE_CHECKINS         │
│ Mutations:    CHECK_IN_MUTATION, CHECK_IN_PLACE_MUTATION   │
│ Fragments:    CHECKIN_FIELDS, COMMENT_FIELDS              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FEATURE: User Profile                                       │
├─────────────────────────────────────────────────────────────┤
│ Queries:      GET_USER_PROFILE, GET_USER_STATS            │
│ Mutations:    UPDATE_PROFILE, UPDATE_AVATAR               │
│ Fragments:    USER_DETAILS_FIELDS, NOTIFICATION_SETTINGS  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FEATURE: Rewards                                            │
├─────────────────────────────────────────────────────────────┤
│ Queries:      GET_USER_REWARDS, GET_REWARD_DETAIL         │
│ Mutations:    REDEEM_REWARD, LIKE_REWARD                  │
│ Fragments:    (reward-specific fragments)                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FEATURE: Social                                             │
├─────────────────────────────────────────────────────────────┤
│ Queries:      (defined in multiple query files)            │
│ Mutations:    LIKE_CHECKIN, COMMENT_CHECKIN, FOLLOW_USER │
│ Fragments:    COMMENT_FIELDS, USER_BASIC_FIELDS           │
└─────────────────────────────────────────────────────────────┘
```

---

**Last Updated:** 28/02/2026  
**Status:** ✅ All endpoints properly organized and documented
