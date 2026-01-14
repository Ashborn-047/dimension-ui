
import { Search as LucideSearch } from "lucide-react";
import { ThreeDIcon } from "./ThreeDIcon";

export function Search({ color = "#3b82f6", size = 24, depth = 4, ...props }) {
    return (
        <ThreeDIcon color={color} size={size} depth={depth} {...props}>
            <LucideSearch size={size} />
        </ThreeDIcon>
    );
}
