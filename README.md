<div align="center">
  <br />
  <h1>⚽ Kheil Clan</h1>
  <strong>Find a game. Show up. Play. Leave with your clip.</strong>
  <br />
  <br />

  [![React Native](https://img.shields.io/badge/React_Native-Expo_51+-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
  [![NativeWind](https://img.shields.io/badge/NativeWind-v4__TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://nativewind.dev/)
  [![Zustand](https://img.shields.io/badge/Zustand-State_Management-764ABC?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
  [![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)](https://firebase.google.com/)

</div>

<br />

Kheil Clan is a managed sports community platform operating in Delhi NCR that bridges the gap between recreational players and perfectly coordinated games. Kheil Clan manages the entire game experience—handling slot bookings, match logistics, Razorpay payments, and most importantly: **delivering 720p HD post-game action clips directly to the player**.

This repository serves as Phase 1 of the **React Native Player Mobile Application**.

---

## ⚡ Tech Stack (Phase 1)

* **Framework:** React Native managed by [Expo SDK 54](https://expo.dev/)
* **Routing:** Expo Router (File-based navigation)
* **Styling Engine:** `NativeWind v4` bringing Tailwind CSS capabilities
* **State Management:** `Zustand` 
* **Backend Integration:** Firebase Web SDK bindings (Auth, Firestore, Storage)
* **Storage / Caching:** `@react-native-async-storage/async-storage`
* **Icons:** `lucide-react-native`
* **Typography:** `@expo-google-fonts` utilizing *Plus Jakarta Sans*, *Inter*, and *JetBrains Mono*.

---

## 🎨 Official Design System

The application styling follows strict design tokens configured natively in `tailwind.config.js`:

| Token | Hex String | Utility Usage | Application |
|-------|------------|---------------|-------------|
| **Primary** | `#1D6A36` | `bg-primary` / `text-primary` | Primary CTA, Header Accents, Active Nav |
| **Gold** | `#D4860A` | `<Button variant="gold" />` | Check-out CTAs, Add-on Badges |
| **Success** | `#1D9E75` | `text-success` / `bg-success` | Positive UI (Slot Meter Full, Confirmed) |
| **Black** | `#1A1A1A` | `text-black` | Core Headings (`h1`, `h2`, `h3`) |
| **Muted** | `#F2F7F4` | `bg-muted` | Screen Backgrounds, Zebra Cards |
| **Gray** | `#4A4A4A` | `text-gray-600` | Standard UI Body copy |

---

## 📂 Project Architecture

```raw
/KhelClan mobile
├── app/
│   ├── (auth)/             # Phone OTP flow, profile setup
│   ├── (tabs)/             # Central Bottom Tab Navigation
│   │   ├── _layout.tsx     # Base App navigation mapping
│   │   ├── index.tsx       # 🏠 Home view / Live feeds
│   │   ├── explore.tsx     # 🔍 Games search functionality
│   │   ├── my-games.tsx    # 📅 Attendance & upcoming schedule 
│   │   ├── clips.tsx       # ▶️ Post-game cloud action clips
│   │   └── profile.tsx     # 👤 User metrics & settings
│   ├── game/
│   │   └── [id].tsx        # Match details & check-out configuration
│   └── booking/
│       └── [id].tsx        # Razorpay confirmation receipt routing
├── components/
│   ├── ui/                 # Atomic design (Typography.tsx, Button.tsx, etc.)
│   └── game/               # Micro components (GameCard.tsx, SlotMeter.tsx)
├── constants/              # Asset definitions and primitive styles
├── lib/                    # SDK configs (firebase.ts, razorpay.ts)
├── store/                  # Zustand slices (authStore.ts)
└── tailwind.config.js      # Global layout tokens 
```

---

## 🚀 Quick Setup & Run Instructions

```bash
# 1. Clone the repository
git clone https://github.com/JayantOlhyan/khel-clan-app.git

# 2. Navigate to directory
cd "khel-clan-app" 

# 3. Install packages
npm install

# 4. Prepare local Environment variables
# Populate `.env.local` using the keys below (if you have them provisioned)
EXPO_PUBLIC_FIREBASE_API_KEY=YOUR_KEY
EXPO_PUBLIC_FIREBASE_PROJECT_ID=kheil-clan-dev

# 5. Start Expo Server
npm start
```
You can preview the interface directly downloading the **Expo Go** app on your iOS or Android device and scanning the QR code emitted in the terminal.

---

## 📝 Current MVP Progress

- [x] **Base Build:** Complete React Native Setup matching explicit WRD config requirements.
- [x] **Tailwind Sync:** Fully established Nativewind engine with custom typographies mapping.
- [x] **Component Library Toolkit:** `<Typography>`, `<Button>`, `<SlotMeter>` built from scratch and globally typed. 
- [x] **Screen Mapping:** Completed routing matrix integrating nested file-system stacks and `lucide` icons.
- [x] **Store Bootstrapping:** Active state slice integration handling Firebase instances.
