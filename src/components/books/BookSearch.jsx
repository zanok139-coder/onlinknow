import React from "react";
import { Search, X } from "lucide-react";

export default function BookSearch({ value, onChange, onClear, onSearch, inputRef }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearch?.();
      }}
      className="mx-auto flex w-full max-w-[750px] items-center gap-1.5 rounded-full bg-white p-1.5 pl-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] ring-1 ring-black/5"
    >
      <Search className="h-5 w-5 shrink-0 text-navy/45" />

      <input
        ref={inputRef}
        id="book-search-input"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyUp={(event) => onChange(event.target.value)}
        placeholder="Search any book... e.g. As a Man Thinketh"
        aria-label="Search any book"
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent py-3 text-[16px] text-navy outline-none placeholder:text-navy/40 sm:text-[18px]"
      />

      {value ? (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-navy/50 transition-colors hover:bg-navy/5 hover:text-navy"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}

      <button
        type="submit"
        className="shrink-0 rounded-full bg-navy px-4 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-navy-soft sm:px-6 sm:text-[14px]"
      >
        Search
      </button>
    </form>
  );
}