import { Block } from "../../utils/block.ts";
import { avatarTemplate } from "./avatar.tmpl.ts";

interface AvatarProps {
    id: string;
    avatar: string | null;
    isActive: boolean;
    inputContainerClasses: string;
    events?: Record<string, (args: unknown) => void>;
}

export class AvatarComponent extends Block<AvatarProps> {
    protected render() {
        return this.compile(avatarTemplate, this.props);
    }
}
