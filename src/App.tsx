import { useState, useRef, useEffect, useMemo, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Search, Copy, Check, Menu, Github, ChevronRight, Terminal, Box, Layers, Image as ImageIcon, FileCode, Layout, ArrowRight, Zap, Globe, Shield, Twitter, CircleDashed, Construction, MousePointer, ToggleLeft, CheckSquare, Circle, MessageSquare, Square, Heart, ChevronDown, User } from "lucide-react";

import { ComponentPageRenderer, isComponentImplemented } from "./components/ComponentPageRenderer";

import { cn } from "@/lib/utils";

// --- DATA: 3D TABS DEMO ---
type Tab = {
  id: number;
  label: string;
  type: "video" | "image";
  url: string;
  initial_url?: string;
};

const demoTabs: Tab[] = [
  {
    id: 0,
    label: "Homes",
    type: "video",
    url: "https://a0.muscache.com/videos/search-bar-icons/webm/house-selected.webm",
    initial_url: "https://a0.muscache.com/videos/search-bar-icons/webm/house-twirl-selected.webm",
  },
  {
    id: 1,
    label: "Experiences",
    type: "video",
    url: "https://a0.muscache.com/videos/search-bar-icons/webm/balloon-selected.webm",
    initial_url: "https://a0.muscache.com/videos/search-bar-icons/webm/balloon-twirl.webm",
  },
  {
    id: 2,
    label: "Services",
    type: "video",
    url: "https://a0.muscache.com/videos/search-bar-icons/webm/consierge-selected.webm",
    initial_url: "https://a0.muscache.com/videos/search-bar-icons/webm/consierge-twirl.webm",
  },
  {
    id: 3,
    label: "OMG!",
    type: "image",
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Alien%20Monster.png",
  },
];

// --- DATA: ASSET LIBRARY ---
const CATEGORIES = ["All", "Smilies", "Hand Signs", "People", "Animals", "Food", "Travel", "Objects"];

const libraryAssets = [
  // --- Smilies ---
  { name: "Grinning", category: "Smilies", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Face.png" },
  { name: "Heart Eyes", category: "Smilies", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Heart-Eyes.png" },
  { name: "Sunglasses", category: "Smilies", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Sunglasses.png" },
  { name: "Ghost", category: "Smilies", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Ghost.png" },
  { name: "Alien", category: "Smilies", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Alien.png" },
  { name: "Robot", category: "Smilies", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Robot.png" },
  { name: "Clown", category: "Smilies", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Clown%20Face.png" },

  // --- Hands ---
  { name: "Waving", category: "Hand Signs", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand.png" },
  { name: "Thumbs Up", category: "Hand Signs", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Thumbs%20Up.png" },
  { name: "Victory", category: "Hand Signs", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Victory%20Hand.png" },
  { name: "Love You", category: "Hand Signs", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Love-You%20Gesture.png" },

  // --- Animals ---
  { name: "Unicorn", category: "Animals", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Unicorn.png" },
  { name: "Dragon", category: "Animals", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Dragon.png" },
  { name: "Cat", category: "Animals", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cat%20Face.png" },
  { name: "Dog", category: "Animals", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Dog%20Face.png" },

  // --- Food ---
  { name: "Burger", category: "Food", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Hamburger.png" },
  { name: "Pizza", category: "Food", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Pizza.png" },
  { name: "Fries", category: "Food", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/French%20Fries.png" },

  // --- Travel ---
  { name: "Rocket", category: "Travel", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" },
  { name: "Island", category: "Travel", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Desert%20Island.png" },

  // --- Objects ---
  { name: "Laptop", category: "Objects", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Laptop.png" },
  { name: "Camera", category: "Objects", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Camera.png" },
  { name: "Gift", category: "Objects", url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Wrapped%20Gift.png" },
];


// --- COMPONENT: HERO TABS (The 3D Component) ---
function NewBadge({ className }: { className?: string }) {
  return (
    <div className={cn("bg-primary px-2 py-1 rounded-t-full rounded-br-full rounded-bl-sm text-[10px] font-bold text-primary-foreground absolute z-50 shadow-sm", className)}>
      NEW
    </div>
  );
}

function HeroTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, demoTabs.length);
  }, []);

  const [tabClicked, setTabClicked] = useState(false);

  const handleTabClick = (newTabId: number) => {
    setTabClicked(true);
    if (newTabId !== activeTab) {
      setActiveTab(newTabId);
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
      const videoElement = videoRefs.current[newTabId];
      if (videoElement) {
        videoElement.currentTime = 0;
        videoElement.play();
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full py-8">
      <div className="flex space-x-2 sm:space-x-6 rounded-full bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/10 p-2 sm:p-4 shadow-xl shadow-neutral-200/50 dark:shadow-none overflow-x-auto max-w-full no-scrollbar backdrop-blur-md">
        {demoTabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "relative px-2 py-1 cursor-pointer transition-colors flex flex-col items-center gap-2 min-w-[70px] sm:min-w-[90px]",
              activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 bg-neutral-100 dark:bg-white/10 rounded-2xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <motion.div
              animate={{ scale: activeTab === tab.id ? 1.1 : 1 }}
              className="relative size-12 sm:size-14 flex items-center justify-center"
            >
              {(tab.id === 3) && <NewBadge className="-top-1 -right-2" />}
              {tab.type === "video" && tab.initial_url ? (
                <>
                  <video
                    ref={(el) => { if (el) videoRefs.current[tab.id] = el; }}
                    muted playsInline autoPlay
                    className={cn("absolute inset-0 w-full h-full object-cover transition-opacity duration-300", tabClicked ? "opacity-0" : "opacity-100")}
                  >
                    <source src={tab.initial_url} type="video/webm" />
                  </video>
                  <video
                    ref={(el) => { if (el) videoRefs.current[tab.id] = el; }}
                    muted playsInline autoPlay
                    className={cn("absolute inset-0 w-full h-full object-cover transition-opacity duration-300", tabClicked ? "opacity-100" : "opacity-0")}
                  >
                    <source src={tab.url} type="video/webm" />
                  </video>
                </>
              ) : (
                <motion.img
                  src={tab.url}
                  alt={tab.label}
                  className="w-full h-full object-contain pointer-events-none drop-shadow-lg"
                  animate={activeTab === tab.id ? { y: [0, -4, 0], transition: { repeat: Infinity, duration: 2 } } : {}}
                />
              )}
            </motion.div>
            <span className="text-xs font-medium">{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: ASSET CARD ---
const AssetCard = forwardRef<HTMLDivElement, { asset: typeof libraryAssets[0] }>(({ asset }, ref) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const isVideo = asset.url.endsWith('.webm');
    const snippet = isVideo
      ? `// Note: Re-host this asset in your local /public folder for production\n<video src="${asset.url}" autoplay loop muted playsinline className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />`
      : `// Note: Re-host this asset in your local /public folder for production\n<img src="${asset.url}" className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" alt="${asset.name}" />`;

    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover:border-primary/50 transition-colors cursor-pointer flex flex-col items-center gap-3"
      onClick={handleCopy}
    >
      <div className="relative size-16 flex items-center justify-center">
        <img
          src={asset.url}
          alt={asset.name}
          className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="text-center w-full">
        <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate">{asset.name}</p>
      </div>
      {copied && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl text-white text-xs font-bold backdrop-blur-sm animate-in fade-in zoom-in">
          Copied!
        </div>
      )}
    </motion.div>
  );
});
AssetCard.displayName = "AssetCard";

// --- SUB-COMPONENT: CODE BLOCK ---
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg bg-neutral-950 dark:bg-black border border-neutral-800 overflow-hidden my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800">
        <div className="flex gap-1.5">
          <div className="size-3 rounded-full bg-red-500/20" />
          <div className="size-3 rounded-full bg-yellow-500/20" />
          <div className="size-3 rounded-full bg-green-500/20" />
        </div>
        <button onClick={handleCopy} className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: SITE HEADER ---
function SiteHeader({ activePage, onNavigate }: { activePage: string, onNavigate: (page: string) => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 sm:px-8 mx-auto flex h-16 items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">3D</div>
          <span className="font-bold hidden sm:inline-block">Dimension UI</span>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button onClick={() => onNavigate('intro')} className={cn("transition-colors hover:text-foreground/80", activePage === 'intro' ? "text-foreground" : "text-foreground/60")}>Documentation</button>
          <button onClick={() => onNavigate('components-index')} className={cn("transition-colors hover:text-foreground/80", activePage === 'components-index' || activePage === 'tabs' ? "text-foreground" : "text-foreground/60")}>Components</button>
          <button onClick={() => onNavigate('icons')} className={cn("transition-colors hover:text-foreground/80", activePage === 'icons' ? "text-foreground" : "text-foreground/60")}>Assets</button>
          <a href="#" className="text-foreground/60 hover:text-foreground transition-colors"><Github size={20} /></a>
        </nav>

        {/* MOBILE TRIGGER */}
        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu size={20} />
        </button>
      </div>

      {/* MOBILE NAV DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background p-4 space-y-4">
          <button onClick={() => { onNavigate('intro'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium">Documentation</button>
          <button onClick={() => { onNavigate('components-index'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium">Components</button>
          <button onClick={() => { onNavigate('icons'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium">Assets</button>
        </div>
      )}
    </header>
  );
}

// --- SUB-COMPONENT: SITE FOOTER ---
function SiteFooter({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container px-8 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="size-6 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs font-bold">3D</div>
              <span className="font-bold">Dimension UI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Beautifully designed 3D components and assets for your next React project. Open source and free to use.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => onNavigate('intro')} className="hover:text-foreground">Documentation</button></li>
              <li><button onClick={() => onNavigate('tabs')} className="hover:text-foreground">Components</button></li>
              <li><button onClick={() => onNavigate('icons')} className="hover:text-foreground">Asset Library</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">GitHub</a></li>
              <li><a href="#" className="hover:text-foreground">Discord</a></li>
              <li><a href="#" className="hover:text-foreground">Twitter</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Dimension UI. All rights reserved.</p>
          <div className="flex gap-4">
            <Github size={18} />
            <Twitter size={18} />
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- SUB-COMPONENT: LANDING PAGE VIEW ---
function LandingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[100px] rounded-full -z-10" />

        <div className="container px-4 md:px-8 mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              v1.0 is now live
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
              High-fidelity 3D <br className="hidden md:block" /> with zero color.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              A collection of production-ready, monochromatic 3D components. Built for maximum pop using depth, shadow, and movement.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={() => onNavigate('intro')}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:opacity-90 transition-all flex items-center gap-2"
              >
                Get Started <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onNavigate('components-index')}
                className="px-8 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full font-medium text-sm transition-all"
              >
                Browse Components
              </button>
            </div>
          </motion.div>

          {/* HERO DEMO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative z-10 p-6 bg-gradient-to-b from-muted/20 to-muted/5 rounded-3xl border border-border shadow-2xl backdrop-blur-sm"
          >
            <HeroTabs />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-muted/20 border-t border-border">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-all duration-300">
              <div className="size-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 flex items-center justify-center mb-4 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Setup</h3>
              <p className="text-muted-foreground">Copy and paste components directly into your project. No npm install required for the core library.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-all duration-300">
              <div className="size-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 flex items-center justify-center mb-4 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Universal Assets</h3>
              <p className="text-muted-foreground">Built on standard web formats (WebM & PNG) ensuring compatibility across all modern browsers.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-all duration-300">
              <div className="size-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 flex items-center justify-center mb-4 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Type Safe</h3>
              <p className="text-muted-foreground">Written in TypeScript with comprehensive type definitions for a robust development experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- DATA: DOCS NAVIGATION ---
const DIMENSION_COMPONENTS = [
  "Accordion", "Alert Dialog", "Alert", "Aspect Ratio", "Avatar", "Badge", "Breadcrumb", "Button", "Calendar", "Card", "Carousel", "Chart", "Checkbox", "Collapsible", "Combobox", "Command", "Context Menu", "Data Table", "Date Picker", "Dialog", "Drawer", "Dropdown Menu", "Form", "Hover Card", "Input", "Input OTP", "Label", "Menubar", "Navigation Menu", "Pagination", "Popover", "Progress", "Radio Group", "Resizable", "Scroll Area", "Select", "Separator", "Sheet", "Skeleton", "Slider", "Sonner", "Switch", "Table", "Textarea", "Toast", "Toggle", "Tooltip"
];

// --- MAIN APP COMPONENT ---
export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  const filteredAssets = useMemo(() => {
    return libraryAssets.filter(asset => {
      const matchesCategory = selectedCategory === "All" || asset.category === selectedCategory;
      const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Sidebar navigation structure
  const DOCS_NAV = [
    {
      section: "Getting Started",
      items: [
        { id: 'intro', label: 'Introduction', icon: Layout },
        { id: 'install', label: 'Installation', icon: Terminal }
      ]
    },
    {
      section: "General",
      items: [
        { id: 'button', label: 'Button', icon: MousePointer },
        { id: 'badge', label: 'Badge', icon: Zap },
        { id: 'icons', label: 'Icons', icon: ImageIcon },
      ]
    },
    {
      section: "Layout",
      items: [
        { id: 'aspect-ratio', label: 'Aspect Ratio', icon: Layout },
        { id: 'card', label: 'Card', icon: Layers },
        { id: 'separator', label: 'Separator', icon: Construction },
        { id: 'resizable', label: 'Resizable', icon: Construction },
        { id: 'scroll-area', label: 'Scroll Area', icon: CircleDashed },
      ]
    },
    {
      section: "Navigation",
      items: [
        { id: 'breadcrumb', label: 'Breadcrumb', icon: ChevronRight },
        { id: 'menubar', label: 'Menubar', icon: Menu },
        { id: 'navigation-menu', label: 'Navigation Menu', icon: Globe },
        { id: 'pagination', label: 'Pagination', icon: ArrowRight },
        { id: 'tabs', label: 'Tabs', icon: Layout },
      ]
    },
    {
      section: "Form Elements",
      items: [
        { id: 'checkbox', label: 'Checkbox', icon: CheckSquare },
        { id: 'form', label: 'Form', icon: Layout },
        { id: 'input', label: 'Input', icon: Terminal },
        { id: 'input-otp', label: 'Input OTP', icon: Shield },
        { id: 'radio-group', label: 'Radio Group', icon: Circle },
        { id: 'select', label: 'Select', icon: ChevronRight },
        { id: 'slider', label: 'Slider', icon: ToggleLeft },
        { id: 'switch', label: 'Switch', icon: ToggleLeft },
        { id: 'textarea', label: 'Textarea', icon: FileCode },
        { id: 'combobox', label: 'Combobox', icon: Search },
        { id: 'date-picker', label: 'Date Picker', icon: Layers },
      ]
    },
    {
      section: "Data Display",
      items: [
        { id: 'avatar', label: 'Avatar', icon: User },
        { id: 'progress', label: 'Progress', icon: CircleDashed },
        { id: 'skeleton', label: 'Skeleton', icon: Layers },
        { id: 'table', label: 'Table', icon: Layout },
        { id: 'data-table', label: 'Data Table', icon: Layout },
        { id: 'chart', label: 'Chart', icon: Layout },
        { id: 'calendar', label: 'Calendar', icon: Layers },
      ]
    },
    {
      section: "Feedback",
      items: [
        { id: 'alert', label: 'Alert', icon: MessageSquare },
        { id: 'alert-dialog', label: 'Alert Dialog', icon: Shield },
        { id: 'dialog', label: 'Dialog', icon: Square },
        { id: 'drawer', label: 'Drawer', icon: Layout },
        { id: 'dropdown-menu', label: 'Dropdown Menu', icon: ChevronDown },
        { id: 'hover-card', label: 'Hover Card', icon: Heart },
        { id: 'popover', label: 'Popover', icon: MessageSquare },
        { id: 'sonner', label: 'Sonner', icon: Zap },
        { id: 'toast', label: 'Toast', icon: MessageSquare },
        { id: 'tooltip', label: 'Tooltip', icon: MessageSquare },
        { id: 'collapsible', label: 'Collapsible', icon: ChevronDown },
        { id: 'command', label: 'Command', icon: Search },
        { id: 'context-menu', label: 'Context Menu', icon: MousePointer },
      ]
    },
  ];

  return (
    <>
      <style>{`
        :root {
          --background: 0 0% 98%;
          --foreground: 0 0% 3.9%;
          --card: 0 0% 100%;
          --card-foreground: 0 0% 3.9%;
          --popover: 0 0% 100%;
          --popover-foreground: 0 0% 3.9%;
          --primary: 0 0% 9%;
          --primary-foreground: 0 0% 98%;
          --secondary: 0 0% 96.1%;
          --secondary-foreground: 0 0% 9%;
          --muted: 0 0% 96.1%;
          --muted-foreground: 0 0% 45.1%;
          --accent: 0 0% 96.1%;
          --accent-foreground: 0 0% 9%;
          --destructive: 0 0% 45%;
          --destructive-foreground: 0 0% 98%;
          --border: 0 0% 89.8%;
          --input: 0 0% 89.8%;
          --ring: 0 0% 3.9%;
          --radius: 0.5rem;
        }
        .dark {
          --background: 0 0% 3.9%;
          --foreground: 0 0% 98%;
          --card: 0 0% 3.9%;
          --card-foreground: 0 0% 98%;
          --popover: 0 0% 3.9%;
          --popover-foreground: 0 0% 98%;
          --primary: 0 0% 98%;
          --primary-foreground: 0 0% 9%;
          --secondary: 0 0% 14.9%;
          --secondary-foreground: 0 0% 98%;
          --muted: 0 0% 14.9%;
          --muted-foreground: 0 0% 63.9%;
          --accent: 0 0% 14.9%;
          --accent-foreground: 0 0% 98%;
          --destructive: 0 0% 45%;
          --destructive-foreground: 0 0% 98%;
          --border: 0 0% 14.9%;
          --input: 0 0% 14.9%;
          --ring: 0 0% 83.1%;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Monochromatic 3D Aesthetic */
        img, video {
          filter: grayscale(1) contrast(1.1);
          transition: filter 0.3s ease;
        }
        img:hover, video:hover {
          filter: grayscale(0.8) contrast(1.1);
        }
        .grayscale-3d {
          filter: grayscale(1) contrast(1.1) brightness(1.1);
        }
      `}</style>

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">

        {/* GLOBAL HEADER */}
        <SiteHeader activePage={activePage} onNavigate={setActivePage} />

        {/* PAGE CONTENT SWITCHER */}
        {activePage === 'home' ? (
          <LandingPage onNavigate={setActivePage} />
        ) : (
          <div className="flex flex-1">
            {/* SIDEBAR - ONLY VISIBLE ON DOCS PAGES */}
            <aside className="hidden lg:block w-64 border-r border-border h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
              <div className="p-6">
                <h4 className="font-bold mb-4 px-2">Documentation</h4>
                <nav className="space-y-6">
                  {DOCS_NAV.map((section) => (
                    <div key={section.section}>
                      <h5 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{section.section}</h5>
                      <ul className="space-y-1">
                        {section.items.map((item) => (
                          <li key={item.id}>
                            <button
                              onClick={() => setActivePage(item.id)}
                              className={cn(
                                "w-full flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md transition-colors",
                                activePage === item.id
                                  ? "bg-secondary text-foreground"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                              )}
                            >
                              {item.icon ? <item.icon size={16} /> : <Box size={16} />}
                              {item.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>
            </aside>
            <main className="flex-1">
              <div className="container px-6 py-10 max-w-4xl mx-auto min-h-screen">

                {/* CONTENT: INTRODUCTION */}
                {activePage === 'intro' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2">
                      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Introduction</h1>
                      <p className="text-xl text-muted-foreground leading-relaxed">
                        Beautifully designed 3D components and assets built with React, Motion, and Tailwind CSS.
                      </p>
                    </div>
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                      <p>
                        This is NOT a component library. It's a collection of re-usable components that you can copy and paste into your apps.
                      </p>
                      <p className="font-bold text-foreground">
                        Our goal is to give engineers full ownership over high-end 3D design logic.
                      </p>
                      <p>
                        By providing <span className="text-primary font-mono">Original Code</span>—zero-dependency, readable logic—we ensure that every component you add is yours to modify, optimize, and scale. No hidden dependencies, no secret CSS files.
                      </p>
                      <p>
                        <strong>Why?</strong> Because 3D assets add delight. They make your interface pop. But they are hard to implement correctly with performance and accessibility in mind.
                      </p>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button onClick={() => setActivePage('install')} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:opacity-90 transition-opacity">
                        Installation
                      </button>
                      <button onClick={() => setActivePage('components-index')} className="px-6 py-2.5 border border-border bg-background rounded-full font-medium text-sm hover:bg-secondary transition-colors">
                        Browse Components
                      </button>
                    </div>
                  </div>
                )}

                {/* CONTENT: INSTALLATION */}
                {activePage === 'install' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-2">
                        CLI First
                      </div>
                      <h1 className="text-3xl font-bold tracking-tight">Installation</h1>
                      <p className="text-lg text-muted-foreground">
                        The easiest way to get started is using our CLI to set up your design system.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-xl">1. Initialize Project</h3>
                      <p className="text-sm text-muted-foreground">Run the init command to setup tailwind config, global styles, and monochromatic variables.</p>
                      <CodeBlock code={`npx dimension-ui init`} />
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-xl">2. Add Components</h3>
                      <p className="text-sm text-muted-foreground">Add components directly to your project. This will drop the "Original Code" into your components/ui folder.</p>
                      <CodeBlock code={`npx dimension-ui add button`} />
                    </div>

                    <div className="space-y-6 pt-8 border-t">
                      <h3 className="font-semibold text-xl">Manual Installation</h3>
                      <p className="text-sm text-muted-foreground">If you prefer not to use the CLI, you can setup the dependencies manually.</p>

                      <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">A. Install Peer Dependencies</h4>
                        <CodeBlock code={`npm install framer-motion lucide-react clsx tailwind-merge`} />
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">B. Setup Utilities</h4>
                        <p className="text-sm text-muted-foreground">Create a `lib/utils.ts` to handle dynamic classes.</p>
                        <CodeBlock code={`import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}`} />
                      </div>
                    </div>

                    <div className="space-y-4 p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-border">
                      <h3 className="font-bold text-xl flex items-center gap-2">
                        <Box size={20} className="text-primary" />
                        How to use 3D Assets
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Our components often use high-fidelity WebM videos or PNGs for that "pop". To use them in your own project:
                      </p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 ml-2">
                        <li><strong>Copy the Code</strong>: Grab the JSX for the component you want.</li>
                        <li><strong>Asset URLs</strong>: Go to the "Asset Library" tab and click any item to copy its URL.</li>
                        <li><strong>3D Settings</strong>: Ensure your container has `perspective-[1000px]` and the element has `transform-style: preserve-3d`.</li>
                      </ul>

                      <div className="mt-6 space-y-4">
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Step-by-Step Integration</h4>
                        <div className="space-y-4 border-l-2 border-neutral-200 dark:border-neutral-800 ml-2 pl-6 py-2">
                          <div className="relative">
                            <div className="absolute -left-[31px] top-0 size-4 rounded-full bg-neutral-900 border-2 border-background" />
                            <p className="text-sm text-muted-foreground"><strong className="text-foreground">Pick</strong>: Navigate to "Asset Library" and click an emoji to copy its direct URL.</p>
                          </div>
                          <div className="relative">
                            <div className="absolute -left-[31px] top-0 size-4 rounded-full bg-neutral-900 border-2 border-background" />
                            <p className="text-sm text-muted-foreground"><strong className="text-foreground">Place</strong>: Paste the URL into an `img` tag or `video` tag in your project.</p>
                          </div>
                          <div className="relative">
                            <div className="absolute -left-[31px] top-0 size-4 rounded-full bg-neutral-900 border-2 border-background" />
                            <p className="text-sm text-muted-foreground"><strong className="text-foreground">Style</strong>: Apply `filter: grayscale(1)` to match the monochromatic vibe.</p>
                          </div>
                        </div>
                        <CodeBlock code={`<img \n  src="COPIED_URL" \n  className="w-16 h-16 grayscale opacity-90 transition-all"\n/>`} />
                      </div>

                      <div className="mt-4 p-4 rounded-lg bg-background border border-border">
                        <p className="text-xs font-medium italic">"The monochromatic look relies on contrast. Use deep blacks and bright whites to make the 3D edges visible."</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* CONTENT: COMPONENTS INDEX */}
                {activePage === 'components-index' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold tracking-tight">Components</h1>
                      <p className="text-lg text-muted-foreground">
                        Here you can find all the components available in the library. We are working on adding more components.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      <button
                        onClick={() => setActivePage('tabs')}
                        className="flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all text-center gap-3"
                      >
                        <Layers size={32} className="text-primary" />
                        <span className="font-medium">3D Tabs</span>
                      </button>
                      {DIMENSION_COMPONENTS.map((name) => (
                        <button
                          key={name}
                          onClick={() => setActivePage(name.toLowerCase().replace(" ", "-"))}
                          className="flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-all text-center gap-3 opacity-60 hover:opacity-100"
                        >
                          <Box size={24} className="text-muted-foreground" />
                          <span className="text-sm font-medium">{name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* CONTENT: 3D TABS COMPONENT */}
                {activePage === 'tabs' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <span className="hover:text-foreground cursor-pointer" onClick={() => setActivePage('components-index')}>Components</span>
                        <ChevronRight size={14} />
                        <span className="text-foreground font-medium">3D Tabs</span>
                      </div>
                      <h1 className="text-3xl font-bold tracking-tight">3D Icon Tabs</h1>
                      <p className="text-lg text-muted-foreground">
                        An interactive tab bar with 3D animated icons that pop on hover and selection.
                      </p>
                    </div>
                    <div className="border border-border rounded-xl overflow-hidden bg-background shadow-sm">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
                        <div className="flex space-x-1 bg-muted/50 p-1 rounded-lg">
                          <button
                            onClick={() => setViewMode('preview')}
                            className={cn("px-3 py-1 rounded-md text-sm font-medium transition-all", viewMode === 'preview' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => setViewMode('code')}
                            className={cn("px-3 py-1 rounded-md text-sm font-medium transition-all", viewMode === 'code' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
                          >
                            Code
                          </button>
                        </div>
                      </div>
                      <div className="relative min-h-[350px] flex items-center justify-center p-8 bg-grid-slate-100 dark:bg-grid-slate-900/50">
                        {viewMode === 'preview' ? (
                          <HeroTabs />
                        ) : (
                          <div className="w-full h-[350px] overflow-auto">
                            <CodeBlock code={`"use client";\n\nimport { useState } from "react";\nimport { motion } from "framer-motion";\n\n// Copy the full component code from the Assets section or demo...`} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Usage</h2>
                      <p className="text-sm text-muted-foreground">The component accepts a list of tabs with video or image URLs.</p>
                    </div>
                  </div>
                )}

                {/* CONTENT: ASSET LIBRARY */}
                {activePage === 'icons' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">Asset Library</h1>
                        <p className="text-muted-foreground">Free 3D assets to use in your components.</p>
                      </div>
                      <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <input
                          type="text"
                          placeholder="Search assets..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pb-2">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                            selectedCategory === cat
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-muted-foreground border-border hover:border-primary/50"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      <AnimatePresence mode="popLayout">
                        {filteredAssets.map(asset => (
                          <AssetCard key={asset.name} asset={asset} />
                        ))}
                      </AnimatePresence>
                      {filteredAssets.length === 0 && (
                        <div className="col-span-full py-12 text-center text-muted-foreground text-sm">No assets found.</div>
                      )}
                    </div>
                  </div>
                )}

                {/* CONTENT: WIP PAGES FOR DIMENSION COMPONENTS */}
                {DIMENSION_COMPONENTS.map(name => name.toLowerCase().replace(" ", "-")).includes(activePage) && (
                  isComponentImplemented(activePage) ? (
                    <ComponentPageRenderer componentId={activePage} onNavigate={setActivePage} />
                  ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <span className="hover:text-foreground cursor-pointer" onClick={() => setActivePage('components-index')}>Components</span>
                          <ChevronRight size={14} />
                          <span className="text-foreground font-medium capitalize">{activePage.replace("-", " ")}</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight capitalize">{activePage.replace("-", " ")}</h1>
                        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 w-fit rounded-full text-xs font-medium border border-yellow-500/20">
                          <Construction size={14} />
                          Work in Progress
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border rounded-xl bg-muted/10">
                        <Construction size={48} className="text-muted-foreground/30 mb-4" />
                        <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
                        <p className="text-muted-foreground max-w-md text-center">
                          We are currently building the 3D version of the <strong>{activePage.replace("-", " ")}</strong> component. Check back later!
                        </p>
                        <button
                          onClick={() => setActivePage('button')}
                          className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90"
                        >
                          Check out 3D Button
                        </button>
                      </div>
                    </div>
                  )
                )}

              </div>
            </main>
          </div>
        )}

        {/* GLOBAL FOOTER */}
        <SiteFooter onNavigate={setActivePage} />

      </div>
    </>
  );
}
