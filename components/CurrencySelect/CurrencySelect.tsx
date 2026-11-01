import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { ExchangeRate } from "../../utils/exchangeRates";
import { matchesQuery } from "../../utils/currency";
import {
  Chevron,
  Empty,
  List,
  Option,
  Popover,
  Root,
  Search,
  Trigger,
} from "./CurrencySelect.styles";

export function CurrencySelect({
  rates,
  selected,
  onSelect,
}: {
  rates: ExchangeRate[]
  selected: ExchangeRate
  onSelect: (value: ExchangeRate) => void
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const filtered = rates.filter((rate) => matchesQuery(rate, query));

  function close() {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }

  // Focus after picking is up to the parent (onSelect), e.g. move it to the amount field
  function choose(rate: ExchangeRate) {
    close();
    onSelect(rate);
  }

  // Focus search on open, close on click outside
  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the keyboard-active option visible
  useEffect(() => {
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function onSearchKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (filtered[activeIndex]) choose(filtered[activeIndex]);
        break;
      case "Escape":
        close();
        triggerRef.current?.focus();
        break;
    }
  }

  return (
    <Root ref={rootRef}>
      <Trigger
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Currency: ${selected.code} (${selected.country} ${selected.currency})`}
        onClick={() => (open ? close() : setOpen(true))}
        translate="no"
      >
        {selected.code}
        <Chevron $open={open} viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Chevron>
      </Trigger>

      {open && (
        <Popover>
          <Search
            ref={searchRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={
              filtered[activeIndex] && `${listId}-${filtered[activeIndex].code}`
            }
            placeholder="Search currency or country..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onSearchKeyDown}
          />
          <List ref={listRef} id={listId} role="listbox">
            {filtered.length === 0 && <Empty>No currency found</Empty>}
            {filtered.map((rate, i) => (
              <Option
                key={rate.code}
                id={`${listId}-${rate.code}`}
                role="option"
                aria-selected={rate.code === selected.code}
                $active={i === activeIndex}
                $selected={rate.code === selected.code}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => choose(rate)}
              >
                <span translate="no">{rate.code}</span> – {rate.country} {rate.currency}
              </Option>
            ))}
          </List>
        </Popover>
      )}
    </Root>
  );
}
