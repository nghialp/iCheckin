# GraphQL Endpoints - Complete Reference Guide

**Last Updated:** 28/02/2026  
**Status:** ✅ Production Ready

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **ENDPOINT_COMPLETE_SUMMARY.md** | Comprehensive summary of all changes and new structure |
| **ENDPOINT_AUDIT.md** | Detailed audit of every endpoint with status |
| **GRAPHQL_STRUCTURE_DIAGRAM.md** | Visual diagrams and architecture overview |
| **ENDPOINT_IMPLEMENTATION_SUMMARY.md** | Implementation details and verification |
| **VERIFY_ENDPOINTS.sh** | Bash script to verify endpoint structure |

---

## 🚀 Quick Start

### View All Available Endpoints

```bash
# List all mutation files
ls -la src/graphql/mutations/

# List all query files
ls -la src/graphql/queries/

# List all fragment files
ls -la src/graphql/fragments/
```

### Verify Structure

```bash
# Run verification script
bash VERIFY_ENDPOINTS.sh

# Or manually count
find src/graphql -name '*.ts' -exec grep -l "export const" {} \; | wc -l
```

---

## 📦 Import Examples

### Importing Queries

```typescript
// Option 1: From dedicated file (Recommended)
import { GET_HOME_DATA } from '../../graphql/queries/home.query';
import { GET_PLACE_DETAIL } from '../../graphql/queries/place.query';

// Option 2: From index file
import { 
  GET_HOME_DATA,
  GET_NEARBY_PLACES,
  GET_PLACE_DETAIL 
} from '../../graphql/queries';

// Option 3: From root file (backward compatible)
import { GET_HOME_DATA } from '../../graphql/queries';
```

### Importing Mutations

```typescript
// Option 1: From dedicated file (Recommended)
import { LOGIN_MUTATION } from '../../graphql/mutations/auth/login.mutation';
import { UPDATE_PROFILE_MUTATION } from '../../graphql/mutations/profile.mutation';

// Option 2: From index file
import { 
  LOGIN_MUTATION,
  UPDATE_PROFILE_MUTATION,
  REDEEM_REWARD_MUTATION 
} from '../../graphql/mutations';

// Option 3: From root file (backward compatible)
import { LOGIN_MUTATION } from '../../graphql/mutations';
```

### Importing Fragments

```typescript
// Option 1: From dedicated file
import { USER_DETAILS_FIELDS } from '../../graphql/fragments/user.fragment';
import { CHECKIN_FIELDS } from '../../graphql/fragments/checkin.fragment';

// Option 2: From index file (Recommended)
import { 
  USER_DETAILS_FIELDS,
  CHECKIN_FIELDS,
  COMMENT_FIELDS 
} from '../../graphql/fragments';
```

---

## 📋 Complete Endpoint List

### QUERIES (25+)

#### Home Page
- `GET_HOME_DATA` - Get home feed with nearby places and user check-ins

#### Map Page
- `GET_NEARBY_PLACES` - Get nearby places with location filtering
- `GET_CHECKIN_FEED` - Get check-in feed for a place

#### User/Profile
- `GET_USER_PROFILE` - Get complete user profile with settings
- `GET_USER_PROFILE_SIMPLE` - Get basic user profile
- `GET_USER_STATS` - Get user statistics (points, check-ins, badges)
- `GET_MY_FRIENDS` - Get user's friend list
- `GET_MY_FOLLOWINGS` - Get users that the current user follows

#### Place
- `GET_PLACE_DETAIL` - Get place details
- `GET_PLACE_DETAIL_FULL` - Get full place information
- `GET_PLACE_CHECKINS` - Get paginated check-ins at a place
- `SEARCH_PLACES` - Search places by name and location

#### Reward
- `GET_REWARD_PAGE` - Get rewards page data
- `GET_USER_REWARDS` - Get paginated user rewards
- `GET_REWARD_DETAIL` - Get specific reward details
- `GET_REDEEM_HISTORY` - Get user's redeem history
- `GET_REWARDS_BY_CATEGORY` - Get rewards filtered by category
- `GET_POPULAR_REWARDS` - Get trending/popular rewards

### MUTATIONS (50+)

#### Authentication (6)
- `LOGIN_MUTATION` - User login
- `REFRESH_TOKEN` - Refresh authentication token
- `SIGNUP_MUTATION` - User registration
- `FORGOT_PASSWORD_MUTATION` - Request password reset
- `CHANGE_PASSWORD` - Change user password
- `RESEND_RESET_EMAIL` - Resend password reset email

#### Check-in (4)
- `CHECK_IN_MUTATION` - Create check-in with coordinates
- `CHECK_IN_PLACE_MUTATION` - Create check-in at a place
- `UPDATE_CHECKIN_MUTATION` - Update existing check-in
- `DELETE_CHECKIN_MUTATION` - Delete a check-in

#### Place (3)
- `CREATE_PLACE_MUTATION` - Create new place
- `UPDATE_PLACE_MUTATION` - Update place information
- `DELETE_PLACE_MUTATION` - Delete a place

#### Profile (7)
- `UPDATE_PROFILE_MUTATION` - Update user profile info
- `UPDATE_USER_AVATAR_MUTATION` - Update user avatar
- `UPDATE_NOTIFICATION_SETTINGS_MUTATION` - Update notification preferences
- `UPDATE_PRIVACY_SETTINGS_MUTATION` - Update privacy settings
- `CHANGE_PASSWORD_MUTATION` - Change password
- `DELETE_ACCOUNT_MUTATION` - Delete user account
- `LOGOUT_MUTATION` - User logout

#### Social (10)
- `LIKE_CHECKIN_MUTATION` - Like a check-in
- `UNLIKE_CHECKIN_MUTATION` - Unlike a check-in
- `COMMENT_CHECKIN_MUTATION` - Comment on check-in
- `DELETE_COMMENT_MUTATION` - Delete a comment
- `LIKE_COMMENT_MUTATION` - Like a comment
- `FOLLOW_USER_MUTATION` - Follow a user
- `UNFOLLOW_USER_MUTATION` - Unfollow a user
- `SEND_FRIEND_REQUEST_MUTATION` - Send friend request
- `ACCEPT_FRIEND_REQUEST_MUTATION` - Accept friend request
- `DECLINE_FRIEND_REQUEST_MUTATION` - Decline friend request

#### Reward (4)
- `REDEEM_REWARD_MUTATION` - Redeem a reward
- `LIKE_REWARD_MUTATION` - Like a reward
- `UNLIKE_REWARD_MUTATION` - Unlike a reward
- `SHARE_REWARD_MUTATION` - Share a reward

### FRAGMENTS (18)

#### User Fragments
- `USER_BASIC_FIELDS` - Basic user info (id, name, email, avatar, etc.)
- `USER_DETAILS_FIELDS` - Detailed user info (includes bio, phone, etc.)
- `USER_SETTINGS_FIELDS` - User settings (notifications, privacy, security)
- `USER_RELATIONS_FIELDS` - User relationships (friends, followers, etc.)
- `NOTIFICATION_SETTINGS_FIELDS` - Notification preferences
- `PRIVACY_SETTINGS_FIELDS` - Privacy settings
- `SECURITY_SETTINGS_FIELDS` - Security settings (2FA, login history)
- `ACCESS_TOKEN_FIELDS` - Authentication tokens

#### Place Fragments
- `PLACE_FIELDS` - Standard place information
- `MAP_PLACE_FIELDS` - Place info for map display

#### Check-in Fragments
- `CHECKIN_FIELDS` - Check-in information with related data

#### Comment Fragments
- `COMMENT_BASIC_FIELDS` - Basic comment info
- `COMMENT_FIELDS` - Extended comment information
- `COMMENT_WITH_REPLIES_FIELDS` - Comment with nested replies

---

## 🔍 Finding What You Need

### By Screen/Feature

**Home Screen** → `queries/home.query.ts` → `GET_HOME_DATA`

**Map Screen** → `queries/map.query.ts` → `GET_NEARBY_PLACES`, `GET_CHECKIN_FEED`

**Place Details** → `queries/place.query.ts` → `GET_PLACE_DETAIL*`, `GET_PLACE_CHECKINS`

**User Profile** → `queries/user.query.ts` → `GET_USER_PROFILE*`, `GET_USER_STATS`

**Login** → `mutations/auth/login.mutation.ts` → `LOGIN_MUTATION`

**Profile Settings** → `mutations/profile.mutation.ts` → `UPDATE_PROFILE_MUTATION`, etc.

**Check-in** → `mutations/checkin.mutation.ts` → `CHECK_IN_*_MUTATION`

**Social Features** → `mutations/social.mutation.ts` → `LIKE_*`, `COMMENT_*`, `FOLLOW_*`

**Rewards** → `queries/reward.query.ts` + `mutations/reward.mutation.ts`

---

## 🔧 Working with Endpoints

### Using in React Components

```typescript
import { useApolloQueryWrapper } from '../../hooks/useApolloQueryWrapper';
import { useApolloMutationWrapper } from '../../hooks/useApolloMutationWrapper';
import { GET_HOME_DATA } from '../../graphql/queries/home.query';
import { LOGIN_MUTATION } from '../../graphql/mutations/auth/login.mutation';

function HomeScreen() {
  // Query
  const { data, loading, error } = useApolloQueryWrapper(GET_HOME_DATA, {
    variables: { lat: 10.7622, lng: 106.6601 }
  });

  // Mutation
  const { mutate: login, loading: loginLoading } = useApolloMutationWrapper(
    LOGIN_MUTATION,
    {
      onCompleted: (data) => {
        // Handle success
      },
      onError: (error) => {
        // Handle error
      }
    }
  );

  return (
    // Component JSX
  );
}
```

### Adding New Mutations

1. Create file in appropriate folder:
   ```typescript
   // src/graphql/mutations/myFeature.mutation.ts
   import { gql } from '@apollo/client';
   
   export const MY_NEW_MUTATION = gql`
     mutation MyNewMutation($input: InputType!) {
       myMutation(input: $input) {
         success
         data { ... }
       }
     }
   `;
   ```

2. Export from `mutations/index.ts`:
   ```typescript
   export { MY_NEW_MUTATION } from './myFeature.mutation';
   ```

3. Use in component (see above)

### Adding New Queries

1. Create file in appropriate folder:
   ```typescript
   // src/graphql/queries/myFeature.query.ts
   import { gql } from '@apollo/client';
   
   export const MY_NEW_QUERY = gql`
     query MyNewQuery($id: ID!) {
       myData(id: $id) { ... }
     }
   `;
   ```

2. Export from `queries/index.ts`

3. Use in component

---

## ✅ Quality Checks

- ✅ All mutations organized by feature
- ✅ All queries organized by feature
- ✅ All fragments properly defined
- ✅ No circular imports
- ✅ TypeScript compilation passes
- ✅ All files documented
- ✅ Backward compatible
- ✅ Ready for production

---

## 📞 Support

For questions about specific endpoints, see:

1. **ENDPOINT_AUDIT.md** - Detailed breakdown of each endpoint
2. **GRAPHQL_STRUCTURE_DIAGRAM.md** - Architecture and visual guides
3. Check JSDoc comments in the actual files
4. Look for similar examples in existing screens

---

**Questions?** Check the comprehensive documentation files listed at the top!
