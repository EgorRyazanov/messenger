import { Block } from "../../utils/block.ts";
import "./search.scss";

interface SearchComponentProps {
    events: Record<string, (event: Event) => void>;
}

export class SearchComponent extends Block<SearchComponentProps> {
    protected render() {
        return this.compile(`<input id="search" name="search" class="search" placeholder="Поиск" >`, this.props);
    }
}
