# WHERE Waitlist Landing Page

A gamified React application for the WHERE waitlist landing page, built with Vite and Tailwind CSS. Features pixelated fonts, animated UI, form validation, and a success page. Includes backend integration for form submission.

## Features

- **Pixelated Font**: Uses "Press Start 2P" for a retro gaming feel.
- **Gamified UI**: Gradient backgrounds, glow effects, animations, and interactive elements.
- **Improved UX**: Form validation, loading states, and smooth transitions.
- **Better Form**: Real-time validation, error messages, and enhanced styling.
- **Mock Success Page**: Animated success screen after form submission.
- **Backend Integration**: Submits form data to a FastAPI backend via fetch API.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with:
   ```
   VITE_BASE_URL=http://localhost:8000
   ```
   Replace with your FastAPI backend URL.

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Backend API

The app expects a FastAPI backend with a POST endpoint at `/waitlist` that accepts JSON:

```json
{
  "name": "string",
  "email": "string",
  "profession": "string",
  "preferred_meetup_places": ["string"],
  "how_often": "string",
  "other_interests_or_hobbies": "string",
  "why_join_where": "string"
}
```

## Build

To build for production:
```bash
npm run build
```

## Assets

Place the logo image at `src/assets/logo.png`.

## Technologies Used

- React 19
- Vite 8 (beta)
- Tailwind CSS 3
- Google Fonts (Press Start 2P)
- ESLint

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
