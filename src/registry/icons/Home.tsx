
import { Home as LucideHome } from "lucide-react";
import { ThreeDIcon } from "./ThreeDIcon";

export function Home({ color = "#10b981", size = 24, depth = 4, ...props }) {
    return (
        <ThreeDIcon color={color} size={size} depth={depth} {...props}>
            <LucideHome size={size} />
        </ThreeDIcon>
    );
}
