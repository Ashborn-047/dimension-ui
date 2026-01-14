import React, { useState } from "react";
import { Button3D, Card3D } from "./Button3D";
import { Switch3D } from "./Switch3D";
import { Checkbox3D } from "./Checkbox3D";
import { RadioGroup3D } from "./RadioGroup3D";
import { Dialog3D } from "./Dialog3D";

export function ButtonShowcase() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Button3D>Default Button</Button3D>
      <Button3D variant="secondary">Secondary</Button3D>
      <Button3D variant="destructive">Destructive</Button3D>
      <Button3D size="sm">Small</Button3D>
      <Button3D size="lg">Large</Button3D>
    </div>
  );
}

export function CardShowcase() {
  return (
    <div className="max-w-md mx-auto">
      <Card3D>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Interactive 3D Card</h3>
          <p className="text-muted-foreground">
            Move your mouse around to see the 3D tilt effect. The card rotates based on your cursor position.
          </p>
          <div className="flex gap-2">
            <Button3D size="sm">Action</Button3D>
            <Button3D size="sm" variant="secondary">Cancel</Button3D>
          </div>
        </div>
      </Card3D>
    </div>
  );
}

export function SwitchShowcase() {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Switch3D checked={checked} onChange={setChecked} />
        <span className="text-sm">Toggle me!</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch3D />
        <span className="text-sm">Uncontrolled switch</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch3D disabled />
        <span className="text-sm text-muted-foreground">Disabled</span>
      </div>
    </div>
  );
}

export function CheckboxShowcase() {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="flex flex-col gap-4">
      <Checkbox3D 
        label="Controlled checkbox" 
        checked={checked} 
        onChange={setChecked} 
      />
      <Checkbox3D label="Uncontrolled checkbox" />
      <Checkbox3D label="Accept terms and conditions" />
      <Checkbox3D label="Disabled" disabled />
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
      <RadioGroup3D 
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
      <Button3D onClick={() => setOpen(true)}>
        Open Dialog
      </Button3D>
      
      <Dialog3D
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
            <Button3D variant="secondary" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button3D>
            <Button3D size="sm" onClick={() => setOpen(false)}>
              Confirm
            </Button3D>
          </div>
        </div>
      </Dialog3D>
    </div>
  );
}
