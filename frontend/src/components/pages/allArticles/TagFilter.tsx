import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { Tag } from "@/lib/definitions";

interface TagFilterProps {
  allTags: Tag[];
  selectedTags: Tag[];
  handleTagToggle: (tag: Tag) => void;
}

export default function TagFilter({
  allTags,
  selectedTags,
  handleTagToggle,
}: TagFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          Filter by tags
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div className="p-4 space-y-2">
          {allTags.map((tag) => (
            <div key={tag._id} className="flex items-center space-x-2">
              <Checkbox
                id={tag._id}
                checked={selectedTags.includes(tag)}
                onCheckedChange={() => handleTagToggle(tag)}
              />
              <label
                htmlFor={tag.name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {tag.name}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
