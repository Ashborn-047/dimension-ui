
import { User as LucideUser } from "lucide-react";
import { ThreeDIcon } from "./ThreeDIcon";

export function User({ color = "#f43f5e", size = 24, depth = 4, ...props }) {
    return (
        <ThreeDIcon color={color} size={size} depth={depth} {...props}>
            <LucideUser size={size} />
        </ThreeDIcon>
    );
}
