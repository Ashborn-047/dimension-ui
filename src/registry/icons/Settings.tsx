
import { Settings as LucideSettings } from "lucide-react";
import { ThreeDIcon } from "./ThreeDIcon";

export function Settings({ color = "#6366f1", size = 24, depth = 4, ...props }) {
    return (
        <ThreeDIcon color={color} size={size} depth={depth} {...props}>
            <LucideSettings size={size} />
        </ThreeDIcon>
    );
}
