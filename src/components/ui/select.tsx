"use client";

import * as React from "react";

interface SelectContextType {
  value?: string;
  name?: string;
  required?: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setValue: (value: string, label: string) => void;
  label?: string;
  placeholder?: string;
  setPlaceholder: (placeholder: string) => void;
}

const SelectContext = React.createContext<SelectContextType | null>(null);

export interface SelectProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  children?: React.ReactNode;
  onValueChange?: (value: string) => void;
}

export function Select({ name, value: controlledValue, defaultValue, required, children, onValueChange }: SelectProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const [selectedLabel, setSelectedLabel] = React.useState("");
  const [placeholder, setPlaceholder] = React.useState("Seçiniz");
  const [isOpen, setIsOpen] = React.useState(false);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleSelect = (val: string, lbl: string) => {
    setInternalValue(val);
    setSelectedLabel(lbl);
    onValueChange?.(val);
    setIsOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{
        value,
        name,
        required,
        isOpen,
        setIsOpen,
        setValue: handleSelect,
        label: selectedLabel,
        placeholder,
        setPlaceholder,
      }}
    >
      <div className="relative inline-block w-full">
        {name && (
          <input
            type="hidden"
            name={name}
            value={value}
            required={required}
          />
        )}
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => ctx?.setIsOpen(!ctx.isOpen)}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-[rgba(255,255,255,0.1)] bg-[#050505] px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D00000] ${className}`}
    >
      {children}
      <span className="ml-2 text-neutral-400">▾</span>
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const ctx = React.useContext(SelectContext);
  React.useEffect(() => {
    if (placeholder && ctx?.setPlaceholder) {
      ctx.setPlaceholder(placeholder);
    }
  }, [placeholder, ctx]);

  return <span>{ctx?.label || placeholder || "Seçiniz"}</span>;
}

export function SelectContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(SelectContext);
  if (!ctx?.isOpen) return null;

  return (
    <div
      className={`absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-[rgba(255,255,255,0.1)] bg-[#111114] p-1 text-white shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}

export function SelectItem({ value, children, className = "" }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(SelectContext);
  const isSelected = ctx?.value === value;

  return (
    <div
      onClick={() => ctx?.setValue(value, String(children))}
      className={`relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-[#D00000] hover:text-white ${
        isSelected ? "bg-[#D00000]/20 text-[#FF1F2D] font-medium" : "text-neutral-200"
      } ${className}`}
    >
      {children}
    </div>
  );
}
