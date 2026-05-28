# Smart Care System

An internal office mobile application for reporting problems and requesting assistance. Built with React Native (Expo) and TypeScript.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18+ |
| npm | 9+ |
| Expo CLI | included via `npx` |
| iOS Simulator | Xcode 15+ (macOS only) |
| Android Emulator | Android Studio |
| Maestro | `brew install maestro` (for E2E tests) |

---

## Installation

```bash
git clone <repo-url>
cd tidlor
npm install
```

---

## Running the App

```bash
# Start Expo dev server (scan QR with Expo Go)
npm start

# Build and run on iOS simulator (requires Xcode)
npm run ios

# Build and run on Android emulator (requires Android Studio)
npm run android
```

---

## npm Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Expo dev server |
| `npm run ios` | Native build + run on iOS simulator (requires Xcode) |
| `npm run android` | Native build + run on Android emulator (requires Android Studio) |
| `npm test` | Run Jest unit tests |
| `npm run test:watch` | Run Jest in watch mode |
| `npm run test:coverage` | Run Jest with coverage report |
| `npm run typecheck` | TypeScript strict-mode check (`tsc --noEmit`) |
| `npm run lint` | ESLint check |

---

## Project Structure

```
tidlor/
├── App.tsx                        # Root: Provider + PersistGate + NavigationContainer
├── index.ts                       # Expo entry point
│
├── src/
│   ├── app/
│   │   ├── navigation/            # React Navigation setup
│   │   │   ├── types.ts           # Typed param lists
│   │   │   ├── RootNavigator.tsx  # Auth gate (Login vs Main)
│   │   │   ├── AuthStack.tsx      # Login stack
│   │   │   └── MainStack.tsx      # Main, AddRequest, RequestDetail
│   │   ├── store/
│   │   │   ├── index.ts           # configureStore + persistor
│   │   │   └── rootReducer.ts     # combineReducers (auth + smartCare)
│   │   └── theme/
│   │       ├── ThemeProvider.tsx  # Light/dark context + useAppTheme()
│   │       ├── tokens.ts          # Spacing, radius, typography scale
│   │       └── colors.ts          # Light + dark color palettes
│   │
│   ├── components/                # ATOMIC DESIGN — presentation only
│   │   ├── atoms/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Text/
│   │   │   └── LoadingSpinner/
│   │   ├── molecules/
│   │   │   ├── SearchBar/
│   │   │   ├── FormField/
│   │   │   └── RequestCard/
│   │   ├── organisms/
│   │   │   ├── LoginForm/
│   │   │   ├── AddRequestForm/
│   │   │   └── RequestList/
│   │   └── templates/
│   │       ├── ScreenLayout/      # SafeAreaView + KeyboardAvoidingView
│   │       └── FormLayout/        # Scrollable form wrapper
│   │
│   └── features/                  # FEATURE-BASED vertical slices
│       ├── auth/
│       │   ├── screens/LoginScreen.tsx
│       │   ├── services/authApi.ts      # Mock login (800ms delay)
│       │   ├── store/authSlice.ts
│       │   ├── validation/loginSchema.ts
│       │   ├── hooks/useLogin.ts
│       │   └── types.ts
│       ├── smartCare/
│       │   ├── screens/
│       │   │   ├── MainScreen.tsx
│       │   │   ├── AddRequestScreen.tsx
│       │   │   └── RequestDetailScreen.tsx
│       │   ├── store/smartCareSlice.ts
│       │   ├── validation/requestSchema.ts
│       │   ├── hooks/
│       │   │   ├── useRequests.ts
│       │   │   └── useSearchRequest.ts
│       │   ├── services/mockSeed.ts     # 5 seed requests
│       │   └── types.ts
│       └── shared/
│           ├── utils/formatDate.ts
│           └── hooks/useAppDispatch.ts  # Typed dispatch + selector
│
├── __tests__/                     # Mirrors src tree
│   ├── components/atoms/
│   ├── components/molecules/
│   ├── screens/
│   ├── store/
│   └── validation/
│
├── ios/                           # Generated native iOS project (bare workflow)
│
└── .maestro/                      # Maestro E2E flows (run in order)
    ├── 01-login.yaml
    ├── 02-add-request.yaml
    ├── 03-request-detail.yaml
    └── 04-search-request.yaml
```

---

## Architecture

### Atomic Design

UI components are organized into five levels:

| Level | Description | Examples |
|-------|-------------|---------|
| **Atoms** | Indivisible primitives | `Button`, `Input`, `Text`, `LoadingSpinner` |
| **Molecules** | Composed atoms | `SearchBar`, `FormField`, `RequestCard` |
| **Organisms** | Feature UI sections | `LoginForm`, `AddRequestForm`, `RequestList` |
| **Templates** | Layout wrappers | `ScreenLayout`, `FormLayout` |
| **Pages/Screens** | Full screens (in `features/`) | `LoginScreen`, `MainScreen`, etc. |

All atoms and molecules are **purely presentational** — no Redux, no navigation. Redux integration lives in feature screens only.

### Feature-Based Structure

Each feature (`auth`, `smartCare`) is a self-contained vertical slice:

```
features/<name>/
  screens/      # React Native screen components
  store/        # Redux slice (actions + reducers + selectors)
  services/     # API calls or mock services
  validation/   # Zod schemas
  hooks/        # Feature-specific custom hooks
  types.ts      # TypeScript types
```

### State Management

- **Redux Toolkit** — `createSlice` for reducers, `createAsyncThunk` for async operations
- **redux-persist** + **AsyncStorage** — persists `auth` and `smartCare` slices across app restarts
- **First-run seeding** — if the store is empty after rehydration, 5 sample requests are seeded automatically

### Theme System

```ts
import { useAppTheme } from '@/app/theme/ThemeProvider';

function MyComponent() {
  const { colors, spacing, fontSizes, isDark } = useAppTheme();
  // ...
}
```

Light and dark mode are supported automatically via `useColorScheme()`.

---

## Screens

| Screen | Route | Description |
|--------|-------|-------------|
| **Login** | `/Login` | Enter 13-digit National ID or 10-digit phone number |
| **Main** | `/Main` | List of Smart Care requests + search + add button |
| **Add Request** | `/AddRequest` | Form to create a new request |
| **Request Detail** | `/RequestDetail/:id` | Full details for a single request |

### Login Validation

- Accepts exactly **13 digits** (National ID) or **10 digits** (phone number)
- Submit button is disabled until input is valid
- Loading state shown during the mock 800ms API delay

### Main Screen Search

Search is **not** a list filter — it navigates directly to the detail screen if found, or shows an error message if not found.

---

## Testing

### Unit Tests (Jest + React Native Testing Library)

```bash
npm test                  # run all tests
npm run test:coverage     # with coverage report
```

**Coverage targets:** Redux slices and validation schemas aim for ≥80% coverage.

Test locations:
- `__tests__/store/` — Redux slice reducers and selectors
- `__tests__/validation/` — Zod schema accept/reject matrix
- `__tests__/components/` — Atom and molecule component tests
- `__tests__/screens/` — Screen integration tests (login validation, navigation)

### E2E Tests (Maestro)

Requires Maestro CLI and a running iOS simulator or Android emulator.

```bash
# Install Maestro
brew install maestro   # macOS

# Run all flows
maestro test .maestro/

# Run a single flow
maestro test .maestro/01-login.yaml
```

**E2E flows:**

| Flow | File | What it tests |
|------|------|--------------|
| Login | `01-login.yaml` | Invalid input stays disabled → valid ID submits → navigates to Main |
| Add Request | `02-add-request.yaml` | Empty form disabled → fill fields → submit → new card appears |
| Request Detail | `03-request-detail.yaml` | Tapping card shows ID, title, description, formatted date |
| Search | `04-search-request.yaml` | Bad ID shows error → valid seed ID navigates to detail |

---

## Sample Data

On first launch (or after clearing app data), 5 seed requests are loaded:

| ID | Title |
|----|-------|
| `sc-seed-001` | Air conditioning not working in Room 301 |
| `sc-seed-002` | Printer on 2nd floor out of toner |
| `sc-seed-003` | Wi-Fi connection dropping in open workspace |
| `sc-seed-004` | Coffee machine leaking in pantry |
| `sc-seed-005` | Request for additional monitor at workstation 7 |

---

## Known Limitations

- **No real backend** — authentication is mocked with an 800ms `setTimeout`. All data lives on-device via AsyncStorage.
- **Single user** — no multi-user or role-based access.
- **No push notifications** — request status updates require manual refresh.
- **English only** — i18n not implemented (Thai localisation can be added with `i18next`).
- **No CI/CD** — tests run locally. A GitHub Actions workflow can be added using `expo-github-action`.

---

## Tech Stack

| Concern | Library | Version |
|---------|---------|---------|
| Runtime | Expo SDK | 56 |
| UI | React Native | 0.85 |
| Language | TypeScript | 6 (strict) |
| Navigation | React Navigation | 7 |
| State | Redux Toolkit | 2.12 |
| Persistence | redux-persist | 6 |
| Forms | react-hook-form | 7 |
| Validation | zod | 4 |
| Unit tests | jest-expo + RNTL | 29.7 / 13 |
| E2E tests | Maestro | latest |
| Linting | ESLint + Prettier | 10 / 3 |
