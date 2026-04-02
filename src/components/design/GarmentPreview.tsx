import type { DesignLayoutResult } from '../../lib/designAi'

export type GarmentType = 'hoodie' | 't-shirt'

interface GarmentPreviewProps {
  type: GarmentType
  baseColor: string
  layout: DesignLayoutResult
  /** Light garments need dark ink; dark garments need cream ink */
  textOnDark?: boolean
}

function textColor(onDark: boolean) {
  return onDark ? 'text-cream' : 'text-ink'
}

export function GarmentPreview({
  type,
  baseColor,
  layout,
  textOnDark = true,
}: GarmentPreviewProps) {
  const tc = textColor(textOnDark)
  const isHoodie = type === 'hoodie'

  return (
    <div
      className="relative mx-auto w-full max-w-[320px]"
      aria-label="Design preview on garment"
    >
      <div
        className="relative overflow-hidden rounded-b-[42%] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.35)]"
        style={{
          backgroundColor: baseColor,
          aspectRatio: isHoodie ? '3 / 4' : '3 / 3.35',
        }}
      >
        {isHoodie && (
          <>
            <div
              className="absolute left-[10%] right-[10%] top-0 h-[26%] rounded-b-[45%] border border-black/10"
              style={{ backgroundColor: baseColor }}
              aria-hidden
            />
            <div
              className="absolute left-[22%] right-[22%] top-[6%] h-[18%] rounded-t-full border border-black/10"
              style={{ backgroundColor: `${baseColor}ee` }}
              aria-hidden
            />
          </>
        )}

        <div
          className={`absolute flex flex-col items-center justify-center text-center ${
            isHoodie
              ? 'inset-x-[10%] top-[32%] bottom-[18%]'
              : 'inset-x-[12%] top-[28%] bottom-[22%]'
          }`}
        >
          <p
            className={`font-display text-[clamp(0.55rem,2.8vw,0.7rem)] font-semibold uppercase tracking-[0.25em] line-through opacity-80 ${tc}`}
          >
            {layout.usLine}
          </p>
          <p
            className={`font-street mt-2 text-[clamp(1.35rem,7vw,2.25rem)] leading-[0.95] tracking-tight ${tc}`}
          >
            {layout.homeLine}
          </p>
          {layout.tagline ? (
            <p
              className={`font-display mt-3 text-[clamp(0.6rem,3vw,0.75rem)] font-bold uppercase tracking-[0.2em] ${tc} opacity-90`}
            >
              {layout.tagline}
            </p>
          ) : null}
        </div>

        {isHoodie && (
          <div
            className="absolute bottom-0 left-[18%] right-[18%] h-[14%] rounded-t-md border border-black/10"
            style={{ backgroundColor: `${baseColor}cc` }}
            aria-hidden
          />
        )}
      </div>
    </div>
  )
}
