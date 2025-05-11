
import { Input } from "@/components/ui/input";

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function TimeInput({ value, onChange, disabled = false }: TimeInputProps) {
  return (
    <Input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
}
