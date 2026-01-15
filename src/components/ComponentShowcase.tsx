import { useState, useEffect } from "react";
import { Button } from "@/registry/components/Button";
import { Alert } from "@/registry/components/Alert";
import { Card } from "@/registry/components/Card";
import { Switch } from "@/registry/components/Switch";
import { Checkbox } from "@/registry/components/Checkbox";
import { RadioGroup } from "@/registry/components/RadioGroup";
import { Dialog } from "@/registry/components/Dialog";
import { Badge } from "@/registry/components/Badge";
import { BadgeShimmer } from "@/registry/components/BadgeShimmer";
import { Accordion } from "@/registry/components/Accordion";
import { Avatar } from "@/registry/components/Avatar";
import { Progress } from "@/registry/components/Progress";
import { Label } from "@/registry/components/Label";
import { Separator } from "@/registry/components/Separator";
import { AspectRatio } from "@/registry/components/AspectRatio";
import { Breadcrumb } from "@/registry/components/Breadcrumb";
import { Popover } from "@/registry/components/Popover";
import { InputOTP } from "@/registry/components/InputOTP";
import { Select } from "@/registry/components/Select";
import { Toggle } from "@/registry/components/Toggle";
import { Skeleton, SkeletonCard, SkeletonAvatar } from "@/registry/components/Skeleton";
import { ToastContainer, useToast } from "@/registry/components/Toast";
import { HoverCard } from "@/registry/components/HoverCard";
import { Sheet } from "@/registry/components/Sheet";
import { Input } from "@/registry/components/Input";
import { Slider } from "@/registry/components/Slider";
import { Tooltip } from "@/registry/components/Tooltip";
import { AlertDialog } from "@/registry/components/AlertDialog";
import { Command } from "@/registry/components/Command";
import { Search, Home, Settings, User, Trash, Check } from "lucide-react";


import { cn } from "@/lib/utils";

import { ThreeDIcon } from "@/registry/icons/ThreeDIcon";
import { Calendar } from "@/registry/components/Calendar";

export function IconShowcase() {
  return (
    <div className="flex gap-12 group p-8">
      <ThreeDIcon size={48} color="rgba(0,0,0,0.8)"><Search size={48} /></ThreeDIcon>
      <ThreeDIcon size={48} color="rgba(0,0,0,0.7)"><Home size={48} /></ThreeDIcon>
      <ThreeDIcon size={48} color="rgba(0,0,0,0.8)"><Settings size={48} /></ThreeDIcon>
      <ThreeDIcon size={48} color="rgba(0,0,0,0.7)"><User size={48} /></ThreeDIcon>
      <ThreeDIcon size={48} color="rgba(0,0,0,0.9)"><Trash size={48} /></ThreeDIcon>
    </div>
  );
}
import { Form, FormItem, FormLabel, FormControl, FormDescription } from "@/registry/components/Form";
import { Textarea } from "@/registry/components/Textarea";
import { Carousel } from "@/registry/components/Carousel";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/registry/components/Menubar";
import { NavigationMenu, NavigationMenuItem, NavigationMenuTrigger } from "@/registry/components/NavigationMenu";
import { Pagination } from "@/registry/components/Pagination";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/registry/components/Table";
import { Chart } from "@/registry/components/Chart";
import { Drawer } from "@/registry/components/Drawer";
import { DropdownMenu, DropdownMenuItem } from "@/registry/components/DropdownMenu";
import { Sonner, SonnerToast } from "@/registry/components/Sonner";
import { Resizable, ResizablePanel, ResizableHandle } from "@/registry/components/Resizable";
import { ScrollArea } from "@/registry/components/ScrollArea";
import { Collapsible } from "@/registry/components/Collapsible";
import { Combobox } from "@/registry/components/Combobox";
import { ContextMenu, ContextMenuItem } from "@/registry/components/ContextMenu";
import { DataTable } from "@/registry/components/DataTable";
import { DatePicker } from "@/registry/components/DatePicker";

export function ButtonShowcase() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Button>Default Button</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

export function CardShowcase() {
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Interactive 3D Card</h3>
          <p className="text-muted-foreground">
            Move your mouse around to see the 3D tilt effect. The card rotates based on your cursor position.
          </p>
          <div className="flex gap-2">
            <Button size="sm">Action</Button>
            <Button size="sm" variant="secondary">Cancel</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function SwitchShowcase() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Switch checked={checked} onChange={setChecked} />
        <span className="text-sm">Toggle me!</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch />
        <span className="text-sm">Uncontrolled switch</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch disabled />
        <span className="text-sm text-muted-foreground">Disabled</span>
      </div>
    </div>
  );
}

export function CheckboxShowcase() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        label="Controlled checkbox"
        checked={checked}
        onChange={setChecked}
      />
      <Checkbox label="Uncontrolled checkbox" />
      <Checkbox label="Accept terms and conditions" />
      <Checkbox label="Disabled" disabled />
    </div>
  );
}

export function RadioShowcase() {
  const [value, setValue] = useState("option1");

  const options = [
    { value: "option1", label: "First Option" },
    { value: "option2", label: "Second Option" },
    { value: "option3", label: "Third Option" },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Selected: {value}</p>
      <RadioGroup
        options={options}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

export function DialogShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        Open Dialog
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="3D Dialog"
        description="This dialog flies in from the screen with a beautiful 3D animation."
      >
        <div className="space-y-4 pt-4">
          <p className="text-sm">
            Notice how the dialog doesn't just fade in - it scales and rotates from the Z-axis, creating a physically realistic entrance.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export function BadgeShowcase() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge animate={false}>No Animation</Badge>
      <BadgeShimmer>Shimmer</BadgeShimmer>
    </div>
  );
}

export function AccordionShowcase() {
  const items = [
    {
      id: "1",
      title: "What is 3D design?",
      content: "3D design uses depth (Z-axis) to communicate hierarchy and interactivity. It's not about making everything spin, but using physical metaphors to make interfaces more intuitive."
    },
    {
      id: "2",
      title: "How does it work?",
      content: "We use CSS 3D transforms (transform-style: preserve-3d) and Motion spring physics to create realistic depth effects without heavy WebGL."
    },
    {
      id: "3",
      title: "Is it performant?",
      content: "Yes! By using CSS transforms instead of WebGL, we keep the bundle size small and performance high, even on lower-end devices."
    },
  ];

  return (
    <div className="max-w-2xl">
      <Accordion items={items} />
    </div>
  );
}

export function AvatarShowcase() {
  return (
    <div className="flex flex-wrap gap-6 items-center">
      <Avatar size="sm" status="online" />
      <Avatar size="md" status="away" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Face.png" />
      <Avatar size="lg" status="busy" />
      <Avatar status="offline" />
    </div>
  );
}

export function ProgressShowcase() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <Progress value={progress} />
      {/* Variants and showValue removed as they are not supported by the component yet */}
      <Progress value={75} />
      <Progress value={50} />
      <Progress value={25} />
    </div>
  );
}

export function SkeletonShowcase() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="40%" />
      </div>
      <div className="flex gap-4">
        <Skeleton variant="circle" width="48px" height="48px" />
        <Skeleton variant="rectangular" height="48px" className="flex-1" />
      </div>
      <SkeletonCard />
      <SkeletonAvatar />
    </div>
  );
}

export function ToastShowcase() {
  const { toasts, addToast, dismissToast } = useToast();

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => addToast({
          title: "Default Toast",
          description: "This is a default toast message",
        })}>
          Default
        </Button>
        <Button size="sm" onClick={() => addToast({
          title: "Success!",
          description: "Your changes have been saved",
          variant: "success"
        })}>
          Success
        </Button>
        <Button size="sm" onClick={() => addToast({
          title: "Error",
          description: "Something went wrong",
          variant: "error"
        })}>
          Error
        </Button>
        <Button size="sm" onClick={() => addToast({
          title: "Warning",
          description: "Please review your input",
          variant: "warning"
        })}>
          Warning
        </Button>
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export function HoverCardShowcase() {
  return (
    <div className="flex gap-4">
      <HoverCard
        trigger={<Button size="sm">Hover me!</Button>}
        content={
          <div className="space-y-2">
            <h4 className="font-semibold">3D Hover Card</h4>
            <p className="text-sm text-muted-foreground">
              This card floats above the trigger element with realistic depth and shadows.
            </p>
          </div>
        }
      />
      <HoverCard
        trigger={
          <Avatar
            status="online"
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Robot.png"
          />
        }
        content={
          <div className="space-y-2">
            <h4 className="font-semibold">Robot User</h4>
            <p className="text-sm text-muted-foreground">Status: Online</p>
            <p className="text-xs text-muted-foreground">
              A 3D avatar with floating status indicator
            </p>
          </div>
        }
      />
    </div>
  );
}

export function SheetShowcase() {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<"left" | "right" | "top" | "bottom">("right");

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <Button size="sm" onClick={() => { setSide("left"); setOpen(true); }}>
          Left
        </Button>
        <Button size="sm" onClick={() => { setSide("right"); setOpen(true); }}>
          Right
        </Button>
        <Button size="sm" onClick={() => { setSide("top"); setOpen(true); }}>
          Top
        </Button>
        <Button size="sm" onClick={() => { setSide("bottom"); setOpen(true); }}>
          Bottom
        </Button>
      </div>

      <Sheet
        open={open}
        onOpenChange={setOpen}
        side={side}
        title="3D Sheet"
        description="A physical layer sliding over with depth separation via shadow."
      >
        <div className="space-y-4">
          <p className="text-sm">
            The sheet slides in from the {side} with a realistic shadow, creating a sense of physical layering.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Sheet>
    </div>
  );
}

export function InputShowcase() {
  return (
    <div className="space-y-4 max-w-md">
      <Input placeholder="Enter your email" label="Email" />
      <Input placeholder="Search..." icon={<Search size={18} />} />
      <Input
        placeholder="Password"
        type="password"
        label="Password"
      />
      <Input
        placeholder="Invalid input"
        label="Username"
        error="This field is required"
      />
      <Input placeholder="Disabled" disabled />
    </div>
  );
}

export function SliderShowcase() {
  const [value, setValue] = useState(50);

  return (
    <div className="space-y-6 max-w-md">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Value: {value}</p>
        <Slider
          value={[value]}
          onValueChange={(vals) => setValue(vals[0])}
        />
      </div>
      <Slider value={[75]} />
      <Slider
        min={0}
        max={10}
        step={1}
        value={[5]}
      />
    </div>
  );
}

export function TooltipShowcase() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Tooltip content="Top tooltip" side="top">
        <Button size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left">
        <Button size="sm">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <Button size="sm">Right</Button>
      </Tooltip>
      <Tooltip content="This is a longer tooltip with more information">
        <Button variant="secondary" size="sm">Hover for details</Button>
      </Tooltip>
    </div>
  );
}

export function AlertDialogShowcase() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Alert Dialog</Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        variant="destructive"
        actionText="Delete Account"
      />
    </div>
  );
}

export function CommandShowcase() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open Command Menu
      </Button>
      <p className="text-xs text-muted-foreground">Tip: Press ⌘K to open it anywhere</p>
      <Command open={open} onOpenChange={setOpen} />
    </div>
  );
}


export function AlertShowcase() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <Alert title="Default Alert">
        This is a standard information alert with a 3D effect.
      </Alert>
      <Alert variant="success" title="Success Alert">
        Your changes have been saved successfully.
      </Alert>
      <Alert variant="warning" title="Warning Alert">
        Please review your information before proceeding.
      </Alert>
      <Alert variant="destructive" title="Error Alert">
        Something went wrong while processing your request.
      </Alert>
    </div>
  );
}

export function LabelShowcase() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="space-y-2">
        <Label required>Email Address</Label>
        <Input placeholder="Enter your email" />
      </div>
      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input placeholder="John Doe" />
      </div>
    </div>
  );
}

export function SeparatorShowcase() {
  return (
    <div className="w-full max-w-md bg-card rounded-xl border p-6 space-y-4">
      <div>
        <h4 className="text-sm font-semibold leading-none">3D Design System</h4>
        <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
      </div>
      <Separator />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>GitHub</div>
      </div>
    </div>
  );
}

export function AspectRatioShowcase() {
  return (
    <div className="w-[300px]">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcd20f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  );
}

export function BreadcrumbShowcase() {
  const items = [
    { label: "Home", href: "/", icon: <Home size={14} /> },
    { label: "Components", href: "/components" },
    { label: "3D Breadcrumb" },
  ];
  return <Breadcrumb items={items} />;
}

export function PopoverShowcase() {
  return (
    <Popover
      trigger={<Button variant="outline">Open Popover</Button>}
    >
      <div className="space-y-4">
        <h4 className="font-bold">Dimensions</h4>
        <p className="text-sm text-muted-foreground">Set the width and height of the element.</p>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label>Width</Label>
            <Input className="col-span-2 h-8" value="100%" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label>Height</Label>
            <Input className="col-span-2 h-8" value="300px" />
          </div>
        </div>
      </div>
    </Popover>
  );
}

export function InputOTPShowcase() {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="space-y-2 text-center">
        <h4 className="font-bold">Enter Verification Code</h4>
        <p className="text-sm text-muted-foreground">Please enter the 6-digit code sent to your phone.</p>
      </div>
      <InputOTP maxLength={6} value={value} onChange={setValue} />
      <Button variant="default" disabled={value.length < 6}>Verify Code</Button>
    </div>
  );
}

export function SelectShowcase() {
  const [value, setValue] = useState("");
  const options = [
    { label: "Light Mode", value: "light" },
    { label: "Dark Mode", value: "dark" },
    { label: "System Default", value: "system" },
  ];
  return (
    <div className="space-y-4">
      <Label>Theme Preference</Label>
      <Select
        options={options}
        value={value}
        onValueChange={setValue}
        placeholder="Select a theme"
      />
    </div>
  );
}

export function ToggleShowcase() {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="flex gap-4 items-center">
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        <Check size={14} className={cn("transition-transform", pressed ? "scale-100" : "scale-0")} />
        {pressed ? "Subscribed" : "Subscribe"}
      </Toggle>

      <Toggle pressed={false} disabled>
        Disabled
      </Toggle>
    </div>
  );
}

export function CalendarShowcase() {
  return <Calendar />;
}

export function FormShowcase() {
  return (
    <Form className="w-full max-w-sm">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="shadcn" />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
      </FormItem>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export function TextareaShowcase() {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  );
}

export function CarouselShowcase() {
  const items = [
    <Card key="1" className="flex items-center justify-center h-full"><span className="text-4xl font-bold">1</span></Card>,
    <Card key="2" className="flex items-center justify-center h-full"><span className="text-4xl font-bold">2</span></Card>,
    <Card key="3" className="flex items-center justify-center h-full"><span className="text-4xl font-bold">3</span></Card>,
  ];
  return <Carousel items={items} />;
}

export function MenubarShowcase() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}

export function NavigationMenuShowcase() {
  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Features</NavigationMenuTrigger>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

export function PaginationShowcase() {
  return <Pagination />;
}

export function TableShowcase() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function ChartShowcase() {
  return <Chart data={[12, 19, 3, 5, 2, 3, 10]} />;
}

export function DrawerShowcase() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Drawing Content</h2>
          <p className="text-neutral-500">This is a 3D monochrome drawer.</p>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Drawer>
    </>
  );
}

export function DropdownMenuShowcase() {
  return (
    <DropdownMenu trigger={<Button variant="outline">Open Menu</Button>}>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
    </DropdownMenu>
  );
}

export function SonnerShowcase() {
  const [toasts, setToasts] = useState<SonnerToast[]>([]);
  const addToast = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts([...toasts, { id, title: "Event has been created", description: "Monday, January 1, 2024 at 12:00 AM" }]);
  };
  return (
    <>
      <Button onClick={addToast}>Show Toast</Button>
      <Sonner toasts={toasts} onDismiss={(id) => setToasts(toasts.filter(t => t.id !== id))} />
    </>
  );
}

export function ResizableShowcase() {
  return (
    <div className="h-[200px] w-full max-w-lg mx-auto">
      <Resizable>
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel flex={2}>Two</ResizablePanel>
      </Resizable>
    </div>
  );
}

export function ScrollAreaShowcase() {
  return (
    <ScrollArea className="h-48 w-full max-w-sm rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 p-4 shadow-xl bg-white dark:bg-neutral-900">
      <div className="space-y-4">
        <h4 className="font-bold">Scrollable Content</h4>
        {Array.from({ length: 10 }).map((_, i) => (
          <p key={i} className="text-sm">This is a long piece of content that demonstrates the 3D scrollbar mimic effect in a monochrome aesthetic. {i}</p>
        ))}
      </div>
    </ScrollArea>
  );
}

export function CollapsibleShowcase() {
  return (
    <Collapsible trigger="Is this accessible?">
      Yes. It adheres to the WAI-ARIA design pattern and features a smooth 3D unfolding animation.
    </Collapsible>
  );
}

export function ComboboxShowcase() {
  const options = [
    { label: "Next.js", value: "next" },
    { label: "SvelteKit", value: "svelte" },
    { label: "Nuxt.js", value: "nuxt" },
    { label: "Remix", value: "remix" },
  ];
  return <Combobox options={options} />;
}

export function ContextMenuShowcase() {
  return (
    <ContextMenu trigger={
      <div className="flex h-[150px] w-full max-w-sm items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950/50 text-sm font-bold text-neutral-400">
        Right click here
      </div>
    }>
      <ContextMenuItem>Back</ContextMenuItem>
      <ContextMenuItem>Forward</ContextMenuItem>
      <ContextMenuItem>Reload</ContextMenuItem>
    </ContextMenu>
  );
}

export function DataTableShowcase() {
  const data = [
    { id: "1", amount: 100, status: "pending", email: "m@example.com" },
    { id: "2", amount: 250, status: "success", email: "a@example.com" },
    { id: "3", amount: 150, status: "failed", email: "o@example.com" },
  ];
  return <DataTable data={data} />;
}

export function DatePickerShowcase() {
  return <DatePicker />;
}
