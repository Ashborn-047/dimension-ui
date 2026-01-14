import React, { useState } from "react";
import { ChevronRight, ExternalLink } from "lucide-react";
import { CodeBlock } from "./ui/CodeBlock";
import {
  ButtonShowcase,
  CardShowcase,
  SwitchShowcase,
  CheckboxShowcase,
  RadioShowcase,
  DialogShowcase,
  BadgeShowcase,
  AccordionShowcase,
  AvatarShowcase,
  ProgressShowcase,
  SkeletonShowcase,
  ToastShowcase,
  HoverCardShowcase,
  SheetShowcase,
  InputShowcase,
  SliderShowcase,
  TooltipShowcase,
  AlertDialogShowcase,
  CommandShowcase,
  IconShowcase,
  AlertShowcase,
  LabelShowcase,
  SeparatorShowcase,
  AspectRatioShowcase,
  BreadcrumbShowcase,
  PopoverShowcase,
  InputOTPShowcase,
  SelectShowcase,
  ToggleShowcase,
  CalendarShowcase,
  FormShowcase,
  TextareaShowcase,
  CarouselShowcase,
  MenubarShowcase,
  NavigationMenuShowcase,
  PaginationShowcase,
  TableShowcase,
  ChartShowcase,
  DrawerShowcase,
  DropdownMenuShowcase,
  SonnerShowcase,
  ResizableShowcase,
  ScrollAreaShowcase,
  CollapsibleShowcase,
  ComboboxShowcase,
  ContextMenuShowcase,
  DataTableShowcase,
  DatePickerShowcase
} from "./ComponentShowcase";

interface ComponentConfig {
  name: string;
  description: string;
  showcase: React.ComponentType;
}

const COMPONENT_MAP: Record<string, ComponentConfig> = {
  "button": {
    name: "3D Button",
    description: "A button with physical press depth. The button has visible edges that disappear as it's pressed down.",
    showcase: ButtonShowcase,
  },
  "card": {
    name: "3D Card",
    description: "A premium tactile card with static physical depth and multiple shadow layers for a high-fidelity look.",
    showcase: CardShowcase,
  },
  "switch": {
    name: "3D Switch",
    description: "A physical toggle switch that rocks left/right with 3D rotation.",
    showcase: SwitchShowcase,
  },
  "checkbox": {
    name: "3D Checkbox",
    description: "A recessed cube that fills with a 3D checkmark popping out on the Z-axis.",
    showcase: CheckboxShowcase,
  },
  "aspect-ratio": {
    name: "3D Aspect Ratio",
    description: "A container that maintains its proportions while providing a multi-layer glass depth effect.",
    showcase: AspectRatioShowcase,
  },
  "radio-group": {
    name: "3D Radio Group",
    description: "Convex buttons that become concave (depressed) when selected with shadow inversion.",
    showcase: RadioShowcase,
  },
  "dialog": {
    name: "3D Dialog",
    description: "A dialog that flies in from the screen with scale and rotation animations.",
    showcase: DialogShowcase,
  },
  "badge": {
    name: "3D Badge",
    description: "A floating pill that slowly rotates or shimmers with depth.",
    showcase: BadgeShowcase,
  },
  "breadcrumb": {
    name: "3D Breadcrumb",
    description: "Hierarchical navigation links with physical layering and 3D depth separators.",
    showcase: BreadcrumbShowcase,
  },
  "accordion": {
    name: "3D Accordion",
    description: "Panels that unfold like a folded piece of paper with transform origin animations.",
    showcase: AccordionShowcase,
  },
  "avatar": {
    name: "3D Avatar",
    description: "Profile picture with a floating status indicator orb orbiting with Z-axis manipulation.",
    showcase: AvatarShowcase,
  },
  "progress": {
    name: "3D Progress",
    description: "A tube or bar filling up with liquid/solid volume and shimmer effects.",
    showcase: ProgressShowcase,
  },
  "skeleton": {
    name: "3D Skeleton",
    description: "A shimmering block with depth (like a thick tile) for loading states.",
    showcase: SkeletonShowcase,
  },
  "toast": {
    name: "3D Toast",
    description: "Toasts that stack physically on top of each other like a deck of cards.",
    showcase: ToastShowcase,
  },
  "hover-card": {
    name: "3D Hover Card",
    description: "A card that floats significantly higher than the trigger element with translateZ.",
    showcase: HoverCardShowcase,
  },
  "sheet": {
    name: "3D Sheet",
    description: "A physical layer sliding over with separation via shadow depth and Z-index.",
    showcase: SheetShowcase,
  },
  "label": {
    name: "3D Label",
    description: "An accessible label component with depth-based hierarchy and animated status indicators.",
    showcase: LabelShowcase,
  },
  "popover": {
    name: "3D Popover",
    description: "A content container that floats with perspective-aware scale and rotation animations.",
    showcase: PopoverShowcase,
  },
  "input": {
    name: "3D Input",
    description: "A text input field with a subtle 3D effect.",
    showcase: InputShowcase,
  },
  "slider": {
    name: "3D Slider",
    description: "A slider with a 3D handle that moves along a track.",
    showcase: SliderShowcase,
  },
  "input-otp": {
    name: "3D Input OTP",
    description: "Multi-box digit input with extruded boxes that animate on focus and entry.",
    showcase: InputOTPShowcase,
  },
  "select": {
    name: "3D Select",
    description: "A dropdown menu with physical depth and perspective-aware animations.",
    showcase: SelectShowcase,
  },
  "toggle": {
    name: "3D Toggle",
    description: "A sticky button with a physical pressed state using shadow inversion.",
    showcase: ToggleShowcase,
  },
  "tooltip": {
    name: "3D Tooltip",
    description: "A tooltip that appears with a 3D animation when hovering over an element.",
    showcase: TooltipShowcase,
  },
  "alert": {
    name: "3D Alert",
    description: "A physical information callout with subtle depth and pulsing icons.",
    showcase: AlertShowcase,
  },
  "alert-dialog": {
    name: "3D Alert Dialog",
    description: "A high-fidelity modal with physical thickness and realistic scale-up animation.",
    showcase: AlertDialogShowcase,
  },
  "command": {
    name: "3D Command Menu",
    description: "A command palette with parallax depth and subtle cursor-tracking tilt.",
    showcase: CommandShowcase,
  },
  "icons": {
    name: "3D Icons",
    description: "Standard functional icons extruded into 3D using a multi-layer SVG technique.",
    showcase: IconShowcase,
  },
  "separator": {
    name: "3D Separator",
    description: "A physical divider that creates visual depth between layout sections.",
    showcase: SeparatorShowcase,
  },
  "calendar": {
    name: "3D Calendar",
    description: "A physical desk calendar with floating day tiles and layered depth.",
    showcase: CalendarShowcase,
  },
  "form": {
    name: "3D Form",
    description: "A set of input primitives with physical depth and clear hierarchy.",
    showcase: FormShowcase,
  },
  "textarea": {
    name: "3D Textarea",
    description: "A recessed writing area with inset shadows and physical borders.",
    showcase: TextareaShowcase,
  },
  "carousel": {
    name: "3D Carousel",
    description: "A physical rotating carousel with perspective-aware 3D transitions.",
    showcase: CarouselShowcase,
  },
  "menubar": {
    name: "3D Menubar",
    description: "A desktop-style menu bar with physical triggers and layered depth.",
    showcase: MenubarShowcase,
  },
  "navigation-menu": {
    name: "3D Navigation Menu",
    description: "Physical navigation links with floating animations and depth.",
    showcase: NavigationMenuShowcase,
  },
  "pagination": {
    name: "3D Pagination",
    description: "Physical navigation buttons with Z-axis lift and shadow depth.",
    showcase: PaginationShowcase,
  },
  "table": {
    name: "3D Table",
    description: "A premium data table with layered shadow depth and physical rows.",
    showcase: TableShowcase,
  },
  "chart": {
    name: "3D Chart",
    description: "A 3D bar chart with extruded bars and perspective-aware hover effects.",
    showcase: ChartShowcase,
  },
  "drawer": {
    name: "3D Drawer",
    description: "A physical panel sliding in with perspective-aware rotation and depth.",
    showcase: DrawerShowcase,
  },
  "dropdown-menu": {
    name: "3D Dropdown Menu",
    description: "A content container that floats with scale and rotation animations.",
    showcase: DropdownMenuShowcase,
  },
  "sonner": {
    name: "3D Sonner",
    description: "A physical toast system with layered stacking and Z-depth.",
    showcase: SonnerShowcase,
  },
  "resizable": {
    name: "3D Resizable",
    description: "A layout system with physical handles and recessed containers.",
    showcase: ResizableShowcase,
  },
  "scroll-area": {
    name: "3D Scroll Area",
    description: "A scrollable container with a mimicked 3D physical scrollbar.",
    showcase: ScrollAreaShowcase,
  },
  "collapsible": {
    name: "3D Collapsible",
    description: "An unfolding panel with physical transitions and shadow depth.",
    showcase: CollapsibleShowcase,
  },
  "combobox": {
    name: "3D Combobox",
    description: "A searchable trigger with floating 3D selection animations.",
    showcase: ComboboxShowcase,
  },
  "context-menu": {
    name: "3D Context Menu",
    description: "A floating menu that appears at the cursor with perspective depth.",
    showcase: ContextMenuShowcase,
  },
  "data-table": {
    name: "3D Data Table",
    description: "A comprehensive data grid with physical filtering and pagination.",
    showcase: DataTableShowcase,
  },
  "date-picker": {
    name: "3D Date Picker",
    description: "A physical trigger that reveals a 3D calendar with perspective depth.",
    showcase: DatePickerShowcase,
  },
};

interface ComponentPageRendererProps {
  componentId: string;
  onNavigate: (page: string) => void;
}

export function ComponentPageRenderer({ componentId, onNavigate }: ComponentPageRendererProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const config = COMPONENT_MAP[componentId];

  if (!config) {
    return null;
  }

  const ShowcaseComponent = config.showcase;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span className="hover:text-foreground cursor-pointer" onClick={() => onNavigate('components-index')}>Components</span>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">{config.name}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{config.name}</h1>
        <p className="text-lg text-muted-foreground">
          {config.description}
        </p>
      </div>

      <div className="border border-border rounded-xl overflow-hidden bg-background shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex space-x-1 bg-muted/50 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${viewMode === 'preview' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Preview
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${viewMode === 'code' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Code
            </button>
          </div>
          <a
            href={`/src/registry/components/${componentId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}.tsx`}
            target="_blank"
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            Registry Source <ExternalLink size={12} />
          </a>
        </div>
        <div className="relative min-h-[350px] flex items-center justify-center p-8">
          {viewMode === 'preview' ? (
            <ShowcaseComponent />
          ) : (
            <div className="w-full h-full max-h-[500px] overflow-y-auto">
              <CodeBlock
                code={`import { ${config.name.replace('3D ', '').replace(' ', '')} } from "@/registry/components/${componentId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}";\n\nexport default function Demo() {\n  return <${config.name.replace('3D ', '').replace(' ', '')} />;\n}`}
                language="tsx"
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Technical Details</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><strong>3D Concept:</strong> {config.description}</p>
          <p><strong>Animation Engine:</strong> Motion (Framer Motion) with spring physics</p>
          <p><strong>Styling:</strong> Tailwind CSS with CSS 3D transforms</p>
        </div>
      </div>
    </div>
  );
}

export function isComponentImplemented(componentId: string): boolean {
  return componentId in COMPONENT_MAP;
}
