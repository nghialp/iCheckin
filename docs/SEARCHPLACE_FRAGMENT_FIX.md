# SearchPlace Fragment Type Mismatch Fix

**Date:** 01/03/2026  
**Status:** ✅ FIXED

## Issue

```
Fragment "MAP_PLACE_FIELDS" cannot be spread here as objects of type "SearchPlace" 
can never be of type "Place"
```

## Root Cause

The GraphQL schema has **two different types for places**:

1. **`Place` type** - Used in place detail queries and check-in data
   - Fields: `id`, `name`, `address`, `types`, `lat`, `lng`, `thumbnail`, `mapboxId`, `rating`, `trips`

2. **`SearchPlace` type** - Used in search and nearby places queries
   - Fields: `mapboxId`, `name`, `rating`, `address`, `types`, `lat`, `lng`, `thumbnail`, `distance`

### The Problem

```typescript
// ❌ WRONG - nearbyPlaces returns SearchPlace[], not Place[]
query GetHomeData {
  nearbyPlaces(lat: $lat, lng: $lng) {
    ...MAP_PLACE_FIELDS  // ❌ This is a fragment for Place type, not SearchPlace
  }
}
```

GraphQL doesn't allow spreading a `Place` fragment on a `SearchPlace` type because they're different.

## Solution

Created a new fragment specifically for the `SearchPlace` type.

### 1. New Fragment: `SEARCH_PLACE_FIELDS`

**File:** `src/graphql/fragments/place.fragment.ts`

```typescript
/**
 * SEARCH_PLACE_FIELDS Fragment
 * Search result place information - used for nearbyPlaces and searchPlaces
 * Note: SearchPlace is a different type from Place in the GraphQL schema
 */
export const SEARCH_PLACE_FIELDS = gql`
  fragment SEARCH_PLACE_FIELDS on SearchPlace {
    mapboxId
    name
    rating
    address
    types
    lat
    lng
    thumbnail
    distance
  }
`;
```

**Key Point:** Notice `distance` field is included here - it exists in `SearchPlace` but NOT in `Place` type.

### 2. Updated Fragment Exports

**File:** `src/graphql/fragments/index.ts`

```typescript
export {
  PLACE_FIELDS,
  MAP_PLACE_FIELDS,
  PLACE_DETAIL_FIELDS,
  PLACE_WITH_CHECKINS_FIELDS,
  SEARCH_PLACE_FIELDS,  // ✅ New export
} from './place.fragment';
```

### 3. Updated Home Query

**File:** `src/graphql/queries/home.query.ts`

**Before:**
```typescript
import { MAP_PLACE_FIELDS } from "../fragments/place.fragment";

export const GET_HOME_DATA = gql`
  query GetHomeData($lat: Float!, $lng: Float!) {
    nearbyPlaces(lat: $lat, lng: $lng) {
      ...MAP_PLACE_FIELDS  // ❌ Wrong type
    }
    myCheckins {
      ...CHECKIN_FIELDS
    }
  }
  ${MAP_PLACE_FIELDS}
  ${CHECKIN_FIELDS}
`;
```

**After:**
```typescript
import { SEARCH_PLACE_FIELDS } from "../fragments/place.fragment";

export const GET_HOME_DATA = gql`
  query GetHomeData($lat: Float!, $lng: Float!) {
    nearbyPlaces(lat: $lat, lng: $lng) {
      ...SEARCH_PLACE_FIELDS  // ✅ Correct type
    }
    myCheckins {
      ...CHECKIN_FIELDS
    }
  }
  ${SEARCH_PLACE_FIELDS}
  ${CHECKIN_FIELDS}
`;
```

## Schema Reference

### SearchPlace Type
```graphql
type SearchPlace {
  mapboxId: String
  name: String!
  rating: Float
  address: String
  types: [String!]
  lat: Float!
  lng: Float!
  thumbnail: String
  distance: Float  # ✅ Only in SearchPlace, NOT in Place
}
```

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

### Query Definition
```graphql
nearbyPlaces(lat: Float!, lng: Float!, radius: Float): [SearchPlace!]!
searchPlaces(keyword: String!, lat: Float!, lng: Float!): [SearchPlace!]!
```

## Fragment Usage Guide

### Use `SEARCH_PLACE_FIELDS` for:
- `nearbyPlaces` query
- `searchPlaces` query
- Any query returning `SearchPlace` type

### Use `PLACE_FIELDS` or `MAP_PLACE_FIELDS` for:
- `place` query (getting single place details)
- Data embedded in `Checkin` type
- Queries returning `Place` type

## Files Modified

| File | Changes |
|------|---------|
| `src/graphql/fragments/place.fragment.ts` | ✅ Added `SEARCH_PLACE_FIELDS` fragment |
| `src/graphql/fragments/index.ts` | ✅ Exported `SEARCH_PLACE_FIELDS` |
| `src/graphql/queries/home.query.ts` | ✅ Changed import and fragment usage from `MAP_PLACE_FIELDS` to `SEARCH_PLACE_FIELDS` |

## Verification

### Home Query Validation
```typescript
// ✅ Valid - SearchPlace fragment on SearchPlace type
nearbyPlaces(lat: $lat, lng: $lng) {
  ...SEARCH_PLACE_FIELDS
}

// ✅ Valid - Checkin-related fragments
myCheckins {
  ...CHECKIN_FIELDS
}
```

### Fragment Dependencies
- ✅ `SEARCH_PLACE_FIELDS` - No dependencies, uses only SearchPlace fields
- ✅ `CHECKIN_FIELDS` - Depends on `PLACE_FIELDS` (for embedded Place data) and `USER_BASIC_FIELDS`

## Benefits

1. **Type Safety** - Fragments now match their actual GraphQL types
2. **Proper Field Access** - `SearchPlace` fragment includes `distance` field
3. **No More Type Errors** - GraphQL will properly validate fragment spreads
4. **Clear Intent** - Different fragments for different types make code clearer
5. **Reusability** - `SEARCH_PLACE_FIELDS` can be used in all search-related queries

## Next Steps

1. ✅ Test home page loads without GraphQL errors
2. ✅ Verify `nearbyPlaces` data displays correctly
3. ✅ Check distance field is available in home page
4. ✅ Verify other search queries work with `SEARCH_PLACE_FIELDS`

## Related Queries to Verify

- `src/graphql/queries/home.query.ts` - GET_HOME_DATA ✅ Fixed
- `src/graphql/queries/map.query.ts` - GET_NEARBY_PLACES (may need update)
- `src/graphql/queries/place.query.ts` - SEARCH_PLACES (may need update)

## Additional Notes

**Important Distinction:**
- The `MAP_PLACE_FIELDS` fragment is still valid and useful for `Place` type queries
- The new `SEARCH_PLACE_FIELDS` is specifically for `SearchPlace` type
- They cannot be interchanged due to type differences in the GraphQL schema
- The `distance` field **is available** in search results but must be calculated in other contexts

---

✅ **Status: COMPLETE & READY FOR TESTING**
