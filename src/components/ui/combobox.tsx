"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"

export interface ComboboxItem {
  value: string;
  label: string;
}

export interface ComboboxProps {
  items: ComboboxItem[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  className?: string;
}

const Combobox: React.FC<ComboboxProps> = ({ 
  items, 
  value, 
  onChange, 
  placeholder = "Seçiniz...", 
  emptyText = "Sonuç bulunamadı.",
  className = ''
}) => {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(0)
  
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  
  const filteredItems = React.useMemo(() => {
    if (!search) return items
    return items.filter(item => 
      item.label.toLowerCase().includes(search.toLowerCase())
    )
  }, [items, search])

  React.useEffect(() => {
    setActiveIndex(0)
  }, [search])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault()
        setOpen(true)
      }
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setActiveIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setActiveIndex(prev => (prev > 0 ? prev - 1 : prev))
        break
      case "Enter":
        e.preventDefault()
        if (filteredItems[activeIndex]) {
          onChange(filteredItems[activeIndex].value)
          setOpen(false)
          setSearch("")
        }
        break
      case "Escape":
        e.preventDefault()
        setOpen(false)
        break
    }
  }

  const selectedItem = items.find(item => item.value === value)

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <div 
        className="flex h-10 w-full items-center justify-between rounded-md border border-ate-border bg-ate-bg px-3 py-2 text-sm text-ate-white cursor-pointer focus-within:ring-2 focus-within:ring-ate-red"
        onClick={() => setOpen(!open)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <span className={selectedItem ? "text-ate-white" : "text-ate-muted"}>
          {selectedItem ? selectedItem.label : placeholder}
        </span>
        <ChevronsUpDown className="h-4 w-4 text-ate-muted opacity-50" />
      </div>

      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 max-h-60 w-full overflow-hidden rounded-md border border-ate-border bg-ate-panel shadow-md">
          <div className="flex items-center border-b border-ate-border px-3">
            <Search className="mr-2 h-4 w-4 text-ate-muted shrink-0" />
            <input
              type="text"
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-ate-muted text-ate-white"
              placeholder="Ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
          <div className="max-h-[200px] overflow-y-auto p-1">
            {filteredItems.length === 0 ? (
              <div className="py-6 text-center text-sm text-ate-muted">
                {emptyText}
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <div
                  key={item.value}
                  className={`flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors ${
                    index === activeIndex ? "bg-ate-surface text-ate-white" : "text-ate-white hover:bg-ate-surface"
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    onChange(item.value)
                    setOpen(false)
                    setSearch("")
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      value === item.value ? "opacity-100 text-ate-red" : "opacity-0"
                    }`}
                  />
                  {item.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export { Combobox }
