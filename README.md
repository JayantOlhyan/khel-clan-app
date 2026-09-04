<div align="center">
  <br />
  <h1>⚽ KhelClan (Mobile App)</h1>
  <strong>Find a game. Show up. Play. Leave with your clip.</strong>
  <br />
  <br />

  [![React Native](https://img.shields.io/badge/React_Native-Expo_54-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
  [![NativeWind](https://img.shields.io/badge/NativeWind-v4__TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://nativewind.dev/)
  [![Zustand](https://img.shields.io/badge/Zustand-State_Management-764ABC?style=for-the-badge)](https://zustand-demo.pmnd.rs/)

</div>

<br />

## ⚠️ Project Status: Frontend Prototype (Phase 1)

**KhelClan** is currently implemented as a **frontend UI prototype** built with React Native and Expo. 

While the interface is fully fleshed out with complex styling and navigation logic, **the core business logic, database, authentication, and payment gateways are currently mocked.** 
- **Authentication** uses a mock Zustand store rather than real phone OTP verification.
- **Payments (Razorpay)** are simulated via `setTimeout` delays.
- **Data (Courts, Games)** is hardcoded in the frontend files.
- **Firebase** is initialized in `lib/firebase.ts` but is not actively used for data fetching or authentication yet.

---

## 🎯 Overview

KhelClan is a managed sports community platform operating in Delhi NCR that bridges the gap between recreational players and perfectly coordinated games. The application targets two primary users:
1. **Players:** Can search for fields, book slots, compete in matches, and view their post-game action clips.
2. **Coordinators:** Can manage turfs, run match play, and upload actions.

---

## ⚡ Tech Stack (Verified)

### Frontend
* **Framework:** React Native managed by [Expo SDK 54.0.33](https://expo.dev/)
* **Routing:** Expo Router (File-based navigation v6)
* **Styling:** `NativeWind v4` (Tailwind CSS v3 engine)
* **State Management:** `Zustand v5.0.12`
* **Icons:** `lucide-react-native`
* **Fonts:** `@expo-google-fonts` (Inter, JetBrains Mono, Plus Jakarta Sans)

### Services (Configured but Unused/Mocked)
* **Firebase:** App, Auth, Firestore, Storage SDKs are present (`v12.12.0`).
* **Storage:** `@react-native-async-storage/async-storage`

---

## 📂 Repository Structure

```text
/
├── app/                  # Expo Router file-based routing
│   ├── (auth)/           # Phone OTP flow (Mocked)
│   ├── (player)/         # Player Role Layout & Screens (Explore, Games, Clips, Profile)
│   ├── (coordinator)/    # Coordinator Role Layout & Screens (Games, Upload, Handbook)
│   ├── booking/          # Booking confirmation screens
│   ├── checkout/         # Mocked Razorpay payment flow
│   ├── game/             # Game detail view
│   └── _layout.tsx       # Root Navigation Layout
├── assets/               # Local static images (fonts, icons, mock turfs)
├── components/           # UI Components (Buttons, Modals, Typography, Game cards)
├── constants/            # Styling constants and theme configuration
├── lib/                  # SDK configs (firebase.ts initialized)
├── store/                # Zustand global state (authStore.ts)
├── package.json          # Dependency definitions
└── tailwind.config.js    # Global Tailwind/NativeWind layout tokens 
```

---

## 🔐 Authentication & Authorization

**Status: MOCKED**

The application has a UI flow for Phone Authentication (OTP) in `app/(auth)/index.tsx`, but it does not execute real Firebase Auth calls. 
Entering any 10-digit number and any OTP will advance the flow, injecting a hardcoded `uid: 'mock-user'` into the `useAuthStore` Zustand state.

Roles are defined in `store/authStore.ts`:
- `player`
- `coordinator`

The UI adapts routing to either `/(player)` or `/(coordinator)` based on the selected role during the mock login.

---

## 💳 Payments & Razorpay

**Status: PLANNED / MOCKED**

The UI displays Razorpay integration on the `app/checkout/[id].tsx` screen, but this is entirely simulated. 
Clicking "Pay" triggers a 2-second `setTimeout` before redirecting to the booking confirmation screen. No actual Razorpay SDK (`react-native-razorpay`) is installed in `package.json`.

---

## 🛠 Prerequisites

* **Node.js:** v18+ (Recommended)
* **Package Manager:** npm
* **Expo CLI:** Expo Go app installed on your physical device, or an iOS/Android emulator.

---

## 🚀 Installation & Local Development

1. **Clone the repository & navigate:**
   ```bash
   git clone https://github.com/JayantOlhyan/khel-clan-app.git
   cd khel-clan-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory. These are required by `lib/firebase.ts` to boot without crashing, even if Firebase isn't actively queried.
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the Expo Server:**
   ```bash
   npm start
   # or
   npm run ios     # For iOS Simulator
   npm run android # For Android Emulator
   ```

---

## 🧪 Testing

**Status: NOT IMPLEMENTED**

There is no testing framework actively configured or utilized in this repository. `react-test-renderer` exists in `devDependencies`, and a single boilerplate Expo test file exists at `components/__tests__/StyledText-test.js`, but no test scripts are defined in `package.json`.

---

## 🚧 Known Limitations

* **No Backend Connection:** All game data, courts, clips, and profiles are hardcoded in the component files (e.g., `app/(player)/explore.tsx`). 
* **Mocked Auth:** OTPs are not verified. Phone numbers are not validated beyond being 10 digits.
* **No Real Payments:** Razorpay UI is a facade.
* **No Tests:** Zero test coverage. 

---

## 🗺 Roadmap

### Planned Integration (Phase 2)
* [ ] Implement actual Firebase Phone Authentication (`signInWithPhoneNumber`).
* [ ] Migrate mocked `COURTS` and `MOCK_GAMES` to Firestore collections.
* [ ] Integrate official `react-native-razorpay` SDK for transaction processing.
* [ ] Implement Firebase Cloud Storage uploads for coordinator game clips.
* [ ] Add Jest & React Native Testing Library for component testing.

---

## 🤖 AI / Developer Orientation

If you are expanding upon this repository, use the following orientation to locate and implement missing features:

* **To implement real Authentication:** Modify `app/(auth)/index.tsx` replacing `setUser({uid: 'mock-user'})` with the Firebase `signInWithPhoneNumber` flow from `lib/firebase.ts`. Update `store/authStore.ts` to persist the real user object.
* **To implement dynamic Courts/Games:** Replace the static `COURTS` arrays in `app/(player)/explore.tsx` and `app/(coordinator)/games.tsx` with Firestore `getDocs` or `onSnapshot` queries.
* **To implement real Payments:** Overhaul the `handlePay` timeout function in `app/checkout/[id].tsx` using the `react-native-razorpay` SDK wrapper.
* **To style new components:** Use `NativeWind` class names mapping to tokens in `tailwind.config.js`. Avoid inline `StyleSheet.create` unless absolutely necessary for complex animations or static assets.
