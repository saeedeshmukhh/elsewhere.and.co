import { useState, type ReactNode } from 'react'

interface Item {
  id: string
  title: string
  content: ReactNode
}

export function Accordion({ items }: { items: Item[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="border-t border-cream-dark">
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id} className="border-b border-cream-dark">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between py-5 text-left text-sm font-semibold uppercase tracking-widest text-ink"
              aria-expanded={isOpen}
            >
              {item.title}
              <span className="text-lg tabular-nums text-muted">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <div className="pb-5 text-sm leading-relaxed text-muted">
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
