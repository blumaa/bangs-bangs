# Lester Bangs Bangs

Generate passionate, gonzo-style music reviews in the voice of legendary rock critic Lester Bangs.

## Features

- 🎙️ **Text-to-Speech** - Listen to Lester read his reviews aloud
- 🔥 **Firebase Storage** - Reviews are persistently saved in Firestore
- 📱 **Share Anywhere** - Share to Facebook, Twitter, WhatsApp, or Spotify
- ⌨️ **Typewriter Effect** - Watch reviews type out character by character
- 🎨 **70s Aesthetic** - Vintage styling with authentic Creem magazine vibes

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your API keys:
   ```
   # Anthropic API
   VITE_ANTHROPIC_API_KEY=sk-ant-...

   # Firebase Config
   VITE_FIREBASE_API_KEY=your-firebase-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

4. Get your API keys:
   - **Anthropic API**: [console.anthropic.com](https://console.anthropic.com)
   - **Firebase**: Create a project at [firebase.google.com](https://firebase.google.com)

5. Set up Firestore:
   - In Firebase Console, create a Firestore database
   - Start in production mode (or test mode for development)
   - Collection `reviews` will be created automatically

6. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Enter a band or song name in the input field
2. Click "Bang On!" to generate a review
3. Watch as Lester's review types out character by character
4. Click the Play button to hear the review read aloud
5. Recent reviews are saved to Firebase and visible in the sidebar
6. Share reviews on social media or listen on Spotify

## Tech Stack

- **Vite** + **React** + **TypeScript**
- **Framer Motion** for typewriter animation
- **Anthropic Claude API** for review generation
- **Firebase Firestore** for persistent storage
- **Web Speech API** for text-to-speech
- **70s aesthetic** with vintage styling

## Deployment

Deploy to Vercel:

```bash
npm run build
```

Make sure to add all environment variables to your Vercel project settings:
- `VITE_ANTHROPIC_API_KEY`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
# bangs-bangs
