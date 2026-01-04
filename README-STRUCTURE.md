Tổ chức thư mục cho ứng dụng iCheckin

Mục đích: scaffold cơ bản cho các màn hình (pages) chính, cấu hình GraphQL client và tích hợp React Native Paper UI.

Cấu trúc chính (mới):

- src/
	- graphql/
		- client.ts            # Apollo Client (http link + cache). Cấu hình endpoint bằng env var
	- hooks/
		- useAuth.ts           # Hook auth nhỏ dùng để demo (login/logout). Thay bằng auth thực sau
	- navigation/
		- RootNavigator.tsx    # Navigation root: chọn giữa Auth flow và App flow
	- screens/
		- Home.tsx
		- LoginRegister.tsx
		- Checkin.tsx
		- Profile.tsx
		- History.tsx
		- HotPlace.tsx
		- MapScreen.tsx
		- Sponsor.tsx
		- Settings.tsx
		- Badges.tsx
	- theme/
		- index.ts             # Theme cho React Native Paper

Giao tiếp GraphQL
- File `src/graphql/client.ts` khởi tạo ApolloClient. Thay `process.env.GRAPHQL_ENDPOINT` hoặc sửa URL mặc định bằng endpoint thực tế.

UI
- Dùng React Native Paper cho Appbar, Card, Buttons, Lists, v.v. Các màn hình mẫu dùng Paper để nhanh prototyping.

Navigation & Auth
- `RootNavigator` dùng hook `useAuth()` để chọn hiển thị màn hình đăng nhập (Auth) khi chưa login, hoặc stack màn hình chính khi đã login.
- `useAuth.ts` hiện là demo — cần bổ sung gọi mutation GraphQL để login, lưu token (AsyncStorage) và refresh token.

Dependencies cần cài (chạy trong thư mục dự án):

```bash
# navigation
pnpm add @react-navigation/native @react-navigation/native-stack
pnpm add react-native-screens react-native-safe-area-context

# apollo
pnpm add @apollo/client graphql

# paper
pnpm add react-native-paper

# optional: async storage, maps
pnpm add @react-native-async-storage/async-storage react-native-maps
```

Lưu ý
- File này chỉ scaffold cơ bản. Bạn cần:
	- Cài các package trên và làm các bước linked / native setup cho React Native như cài pods cho iOS.
	- Thay hook auth bằng logic thực, gọi mutation login, lưu token và attach Authorization header (ví dụ bằng Apollo Link).
	- Tích hợp react-native-maps nếu cần bản đồ.

Hãy nói nếu muốn: thêm GraphQL queries / mutations ví dụ, tích hợp AsyncStorage, hoặc thêm typescript types cho navigation.
