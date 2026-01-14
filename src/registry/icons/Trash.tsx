
import { Trash2 as LucideTrash } from "lucide-react";
import { ThreeDIcon } from "./ThreeDIcon";

export function Trash({ color = "#71717a", size = 24, depth = 4, ...props }) {
    return (
        <ThreeDIcon color={color} size={size} depth={depth} {...props}>
            <LucideTrash size={size} />
        </ThreeDIcon>
    );
}
