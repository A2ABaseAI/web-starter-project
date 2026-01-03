# Bun Landing Page Template

A modern, mobile-first landing page template built with Bun, React, TypeScript, and Tailwind CSS v4. Perfect for building beautiful websites quickly.

## 🚀 Features

- ⚡ **Bun Runtime** - Fastest JavaScript runtime
- 📱 **Mobile-First Design** - Responsive on all devices
- 🎨 **Modern UI** - Beautiful gradient designs with Tailwind CSS
- 🔧 **TypeScript** - Full type safety
- 🚀 **Vite** - Lightning-fast development
- 📦 **Zero Config** - Works out of the box

## 📋 Prerequisites

- [Bun](https://bun.sh) (latest version)

Install Bun:
```bash
curl -fsSL https://bun.sh/install | bash
```

## 🛠️ Installation

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

## 📁 Project Structure

```
.
├── src/
│   ├── components/
│   │   └── LandingPage.tsx    # Main landing page component
│   ├── App.tsx                 # Root component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles & Tailwind
├── index.html                 # HTML template
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── vite.config.ts            # Vite configuration
└── package.json              # Dependencies
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  primary: {
    500: '#your-color',
    // ...
  },
}
```

### Content

Edit `src/components/LandingPage.tsx` to customize:
- Hero section text
- Features list
- Stats
- Footer links

### Styling

All styles use Tailwind CSS utility classes. Modify classes directly in components or extend the theme in `tailwind.config.js`.

## 📦 Building for Production

```bash
bun run build
```

Output will be in the `dist/` directory, ready to deploy to any static hosting service.

## 🌐 Deployment

### Vercel

```bash
bunx vercel
```

### Netlify

```bash
bunx netlify deploy --prod
```

### Cloudflare Pages

```bash
bunx wrangler pages deploy dist
```

## 📚 Resources

- [Bun Documentation](https://bun.sh/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Vite Documentation](https://vite.dev)

## 📄 License

MIT License - feel free to use this template for your projects!

---

**Built with ❤️ using Bun**

