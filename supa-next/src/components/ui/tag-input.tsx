"use client"

import { X } from "lucide-react"
import { useState, KeyboardEvent } from "react"
import { cn } from "@/lib/utils"

interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
  maxLength?: number
  className?: string
}

export function TagInput({
  tags,
  onTagsChange,
  placeholder = "أضف مهارة...",
  maxTags = 10,
  maxLength = 30,
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("")

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (
      trimmedTag &&
      !tags.includes(trimmedTag) &&
      tags.length < maxTags
    ) {
      onTagsChange([...tags, trimmedTag])
      setInputValue("")
    }
  }

  const removeTag = (indexToRemove: number) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue)
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="min-h-[42px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 rounded-md bg-primary/20 px-2.5 py-1 text-sm font-medium text-foreground"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="inline-flex items-center justify-center rounded-sm hover:bg-primary/30 transition-colors"
                aria-label={`إزالة ${tag}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {tags.length < maxTags && (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.slice(0, maxLength))}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder={tags.length === 0 ? placeholder : ""}
              className="flex-1 min-w-[120px] outline-none bg-transparent text-right placeholder:text-muted-foreground"
            />
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="text-xs text-muted-foreground">
          {tags.length}/{maxTags} مهارات
        </p>
        <p className="text-xs text-muted-foreground">
          اضغط Enter أو اكتب الفاصلة لإضافة مهارة
        </p>
      </div>
    </div>
  )
}

