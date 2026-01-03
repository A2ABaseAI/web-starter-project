# Agent UI - Modern SPA Framework

A clean, modern single-page application built with React, TypeScript, Tailwind CSS v4, and Bun. Mobile-first, accessible, and production-ready.

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) (latest version) - Fast all-in-one JavaScript runtime and package manager

To install Bun:
```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

The app will be available at `http://localhost:3000`

> **Note:** The development server port is configured in `vite.config.ts`. To change it, modify the `server.port` option.

## 📁 Project Structure

```
my-agent-ui/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Seo.tsx         # SEO component for meta tags
│   │   └── ThemeToggle.tsx # Dark mode toggle
│   ├── hooks/              # Custom React hooks
│   │   └── useTheme.ts     # Theme management hook
│   ├── layouts/            # Layout components
│   │   └── SiteLayout.tsx  # Main layout with header/footer
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Home page
│   │   ├── Features.tsx    # Features page
│   │   ├── Docs.tsx        # Documentation page
│   │   ├── Pricing.tsx     # Pricing page
│   │   ├── About.tsx       # About page
│   │   ├── Contact.tsx     # Contact page
│   │   └── NotFound.tsx   # 404 page
│   ├── routes/             # Route configuration
│   │   └── AppRoutes.tsx   # React Router setup
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles & Tailwind
├── public/                 # Static assets
├── index.html             # HTML template
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── vite.config.ts         # Vite configuration (includes server port)
├── bun.lock               # Bun lockfile for dependency management
└── package.json           # Dependencies and scripts
```

## 🎨 How to Modify

### Adding a New Page

1. **Create the page component** in `src/pages/`:

```tsx
// src/pages/NewPage.tsx
export default function NewPage() {
  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          New Page
        </h1>
        {/* Your content */}
      </div>
    </div>
  );
}
```

2. **Add the route** in `src/routes/AppRoutes.tsx`:

```tsx
import { lazy } from "react";
const NewPage = lazy(() => import("../pages/NewPage"));

// In the Routes component:
<Route path="new-page" element={<NewPage />} />
```

3. **Add navigation link** in `src/layouts/SiteLayout.tsx`:

```tsx
<NavLink className={navItem} to="/new-page">New Page</NavLink>
```

### Modifying the Home Page

Edit `src/pages/Home.tsx` to customize:
- Hero section text and buttons
- Features grid items
- Tech stack section
- Call-to-action section

### Changing Colors & Theme

1. **Update Tailwind config** (`tailwind.config.js`):

```js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#...',
          500: '#...',
          900: '#...',
        }
      }
    }
  }
}
```

2. **Modify global styles** in `src/index.css`:

```css
/* Update button colors */
.btn {
  @apply bg-primary-500 hover:bg-primary-600;
}
```

### Customizing Dark Mode

The dark mode is handled by the `useTheme` hook in `src/hooks/useTheme.ts`. 

To customize:
- Modify theme colors in `src/index.css`
- Update dark mode classes throughout components
- Change the default theme in `index.html` script

### Modifying the Header/Navigation

Edit `src/layouts/SiteLayout.tsx`:
- Change logo text/component
- Add/remove navigation items
- Modify mobile menu behavior
- Update header styling

### Modifying the Footer

Edit the footer section in `src/layouts/SiteLayout.tsx`:
- Change copyright text
- Add social links
- Modify footer layout

### Adding New Components

1. Create component in `src/components/`:

```tsx
// src/components/MyComponent.tsx
export default function MyComponent() {
  return (
    <div className="card">
      {/* Component content */}
    </div>
  );
}
```

2. Import and use in pages:

```tsx
import MyComponent from "../components/MyComponent";

export default function MyPage() {
  return (
    <div>
      <MyComponent />
    </div>
  );
}
```

### Styling with Tailwind CSS

This project uses Tailwind CSS v4. Use utility classes directly:

```tsx
<div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
    Title
  </h2>
</div>
```

**Common utility classes:**
- `bg-white dark:bg-gray-900` - Background colors
- `text-gray-900 dark:text-gray-100` - Text colors
- `p-4 sm:p-6 lg:p-8` - Responsive padding
- `rounded-xl` - Border radius
- `hover:shadow-lg` - Hover effects
- `transition-all duration-300` - Animations

### Custom CSS Classes

Add custom classes in `src/index.css`:

```css
.my-custom-class {
  @apply p-4 bg-white dark:bg-gray-900 rounded-lg;
}
```

### Modifying Forms

The contact form in `src/pages/Contact.tsx` shows the pattern:

```tsx
<input
  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
  placeholder="Your input"
/>
```

### Adding Animations

Use Tailwind's transition utilities:

```tsx
<div className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
  {/* Content */}
</div>
```

Or add custom animations in `src/index.css`:

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}
```

## 🎯 Key Features

- **Bun Runtime**: Fast JavaScript runtime and package manager
- **Mobile-First Design**: Responsive on all devices
- **Dark Mode**: System-aware with persistent toggle
- **SPA Routing**: React Router v7 with lazy loading
- **TypeScript**: Full type safety
- **Tailwind CSS v4**: Modern utility-first styling
- **Vite**: Lightning-fast development and HMR

## 🛠️ Development

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier (optional) for formatting
- Functional components with hooks

## 📦 Building for Production

```bash
bun run build
```

Output will be in the `dist/` directory, ready to deploy to any static hosting service.

## 🌐 Deployment

### Vercel

```bash
bunx vercel
# Or install globally: bun install -g vercel
```

### Netlify

```bash
bunx netlify deploy --prod
# Or install globally: bun install -g netlify-cli
```

### GitHub Pages

1. Update `vite.config.ts`:
```ts
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

2. Build and deploy:
```bash
bun run build
# Deploy dist/ folder to GitHub Pages
```

## 🔧 Configuration Files

- **`vite.config.ts`**: Vite build configuration (includes server port: 3000)
- **`tailwind.config.js`**: Tailwind CSS customization
- **`postcss.config.js`**: PostCSS plugins
- **`tsconfig.json`**: TypeScript configuration
- **`eslint.config.js`**: ESLint rules
- **`bun.lock`**: Bun lockfile for reproducible installs
- **`package.json`**: Project dependencies and scripts

## 📝 Best Practices

1. **Component Organization**: Keep components small and focused
2. **Type Safety**: Use TypeScript types for props and state
3. **Responsive Design**: Always test on mobile, tablet, and desktop
4. **Dark Mode**: Ensure all components work in both light and dark modes
5. **Accessibility**: Use semantic HTML and ARIA labels
6. **Performance**: Use lazy loading for routes and large components

## 🐛 Troubleshooting

### Dark mode not working
- Check `index.html` for the theme script
- Verify `useTheme` hook is working
- Check browser console for errors

### Styles not applying
- Ensure Tailwind classes are in the content paths in `tailwind.config.js`
- Check PostCSS configuration
- Restart the dev server

### Build errors
- Run `bun install` to ensure dependencies are installed
- Check TypeScript errors with `bun run build`
- Verify all imports are correct
- Clear cache: `rm -rf node_modules bun.lock && bun install`

### Port already in use
- Change the port in `vite.config.ts` under `server.port`
- Or kill the process using port 3000: `lsof -ti:3000 | xargs kill -9`

## 📚 Resources

- [Bun Documentation](https://bun.sh/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Vite Documentation](https://vite.dev)
- [React Router v7](https://reactrouter.com)

## 📄 License

MIT License - feel free to use this project for your agent interfaces!

---

**Happy Coding! 🚀**
