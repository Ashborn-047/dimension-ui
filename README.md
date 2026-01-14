# Dimension UI

![Dimension UI Banner](https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3)

> **Make your interface pop with 3D.**  
> A collection of production-ready 3D components and assets. Built with React, Framer Motion, and Tailwind CSS.

## 🌟 Overview

Dimension UI is not just another component library; it's a curated set of re-usable components designed to bring depth and delight to your user interfaces. Leveraging the power of 3D assets (WebM & PNG) and smooth animations, these components are ready to copy and paste directly into your projects.

**Key Features:**
- **Instant Setup**: Copy and paste components. No complex build steps or heavy core libraries.
- **Universal Assets**: Uses standard web formats ensuring compatibility across all modern browsers.
- **Type Safe**: Written in TypeScript for a robust development experience.
- **Beautifully Designed**: Modern, aesthetic, and accessible default styles.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed in your project:

- React
- Tailwind CSS
- Framer Motion
- Lucide React

### Installation

1.  **Install Utilities**  
    We use `clsx` and `tailwind-merge` for conditional class management, along with `framer-motion` for animations.

    ```bash
    npm install clsx tailwind-merge framer-motion lucide-react tailwindcss-animate
    ```

2.  **Add Utility Helper**  
    Create a `lib/utils.ts` file in your project:

    ```ts
    import { clsx, type ClassValue } from "clsx";
    import { twMerge } from "tailwind-merge";

    export function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }
    ```

3.  **Update Tailwind Configuration**  
    Ensure your `tailwind.config.js` is set up to scan your component files and includes necessary plugins (like `tailwindcss-animate`).

## 🧩 Usage

Components in Dimension UI are designed to be dropped into your `components/ui` or similar folder.

**Example: 3D Tabs**

1. Copy the `HeroTabs` component code into your project.
2. Import and use it:

```tsx
import { HeroTabs } from "@/components/HeroTabs";

export default function MyPage() {
  return (
    <div>
      <HeroTabs />
    </div>
  );
}
```

## 📦 Components

The library includes a wide range of components, enhanced with 3D or high-quality motion effects:

- **Layout**: Aspect Ratio, Card, Separator, Resizable, Scroll Area
- **Navigation**: Breadcrumb, Menubar, Navigation Menu, Pagination, Tabs (3D)
- **Form Elements**: Checkbox, Form, Input, Slider, Switch, Textarea, Combobox
- **Feedback**: Alert, Dialog, Drawer, Toast, Tooltip, Hover Card
- **Data Display**: Avatar, Progress, Skeleton, Table, Chart, Calendar

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **3D Assets**: [Animated Fluent Emojis](https://github.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
