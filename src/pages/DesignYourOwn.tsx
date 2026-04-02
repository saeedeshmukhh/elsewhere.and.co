import { useCallback, useId, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GarmentPreview, type GarmentType } from '../components/design/GarmentPreview'
import { formatDesignLayout } from '../lib/designAi'
import { requestDesignPreviewImages } from '../lib/designPreviewApi'
import { waitlistMailto } from '../lib/waitlist'

const GARMENT_OPTIONS: { id: GarmentType; label: string }[] = [
  { id: 'hoodie', label: 'Hoodie' },
  { id: 't-shirt', label: 'T-Shirt' },
]

const BASE_COLORS: { id: string; label: string; hex: string; darkText: boolean }[] = [
  { id: 'black', label: 'Black', hex: '#141414', darkText: false },
  { id: 'white', label: 'White', hex: '#f4f1ea', darkText: true },
  { id: 'beige', label: 'Beige', hex: '#d8cfc0', darkText: true },
  { id: 'forest', label: 'Forest', hex: '#1e2d24', darkText: false },
  { id: 'clay', label: 'Clay', hex: '#8b4a38', darkText: false },
]

const FIT_OPTIONS = [
  { id: 'relaxed', label: 'Relaxed' },
  { id: 'standard', label: 'Standard' },
]

export function DesignYourOwn() {
  const previewRef = useRef<HTMLElement | null>(null)
  const sectionId = useId()

  const [garment, setGarment] = useState<GarmentType>('hoodie')
  const [colorId, setColorId] = useState(BASE_COLORS[0]!.id)
  const [fitId, setFitId] = useState(FIT_OPTIONS[0]!.id)
  const [usCity, setUsCity] = useState('California')
  const [homeCity, setHomeCity] = useState('Pune')
  const [showTagline, setShowTagline] = useState(true)
  const [previewBusy, setPreviewBusy] = useState(false)
  const [aiImages, setAiImages] = useState<string[]>([])
  const [aiError, setAiError] = useState<string | null>(null)

  const selectedColor = useMemo(
    () => BASE_COLORS.find((c) => c.id === colorId) ?? BASE_COLORS[0]!,
    [colorId]
  )

  const liveLayout = useMemo(
    () =>
      formatDesignLayout(
        usCity,
        homeCity,
        showTagline ? undefined : ''
      ),
    [usCity, homeCity, showTagline]
  )

  const scrollToPreview = useCallback(() => {
    previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handlePreviewDesign = useCallback(async () => {
    setPreviewBusy(true)
    setAiError(null)
    try {
      const fitLabel = FIT_OPTIONS.find((f) => f.id === fitId)?.label ?? 'Relaxed'
      const images = await requestDesignPreviewImages({
        garment,
        baseColorLabel: selectedColor.label,
        baseColorHex: selectedColor.hex,
        fitLabel,
        usCity,
        homeCity,
        showTagline,
        layout: liveLayout,
      })
      setAiImages(images.slice(0, 3))
    } catch (e) {
      setAiImages([])
      setAiError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setPreviewBusy(false)
    }
    scrollToPreview()
  }, [
    garment,
    selectedColor.label,
    selectedColor.hex,
    fitId,
    usCity,
    homeCity,
    showTagline,
    liveLayout,
    scrollToPreview,
  ])

  const waitlistBody = useMemo(() => {
    const fit = FIT_OPTIONS.find((f) => f.id === fitId)?.label ?? fitId
    return [
      'Design Your Own — waitlist',
      `Garment: ${garment}`,
      `Base: ${selectedColor.label}`,
      `Fit: ${fit}`,
      `US city: ${usCity.trim() || '—'}`,
      `Home city: ${homeCity.trim() || '—'}`,
      `Tagline: ${showTagline ? 'Roots Remain!' : 'off'}`,
    ].join('\n')
  }, [garment, selectedColor.label, fitId, usCity, homeCity, showTagline])

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        Elsewhere Lab
      </p>
      <h1 className="font-display mt-4 text-4xl font-bold tracking-tight md:text-5xl">
        Design your own
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Build the same graphic language as the drop — US city crossed out, home city bold,
        optional “Roots Remain!”. Preview updates as you type; ordering stays off until launch.
      </p>

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-16">
        <div className="space-y-10">
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-widest text-muted">
              Product type
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {GARMENT_OPTIONS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGarment(g.id)}
                  className={[
                    'rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors',
                    garment === g.id
                      ? 'border-ink bg-ink text-cream'
                      : 'border-cream-dark text-muted hover:border-ink/30 hover:text-ink',
                  ].join(' ')}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-widest text-muted">
              Base color
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {BASE_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorId(c.id)}
                  className={[
                    'flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors',
                    colorId === c.id
                      ? 'border-ink'
                      : 'border-cream-dark text-muted hover:border-ink/30 hover:text-ink',
                  ].join(' ')}
                >
                  <span
                    className="h-5 w-5 rounded-full border border-ink/15"
                    style={{ backgroundColor: c.hex }}
                  />
                  {c.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-widest text-muted">
              Fit
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {FIT_OPTIONS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFitId(f.id)}
                  className={[
                    'rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors',
                    fitId === f.id
                      ? 'border-ink bg-ink text-cream'
                      : 'border-cream-dark text-muted hover:border-ink/30 hover:text-ink',
                  ].join(' ')}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor={`${sectionId}-us`}
              className="text-xs font-semibold uppercase tracking-widest text-muted"
            >
              US city <span className="font-normal normal-case text-muted">(top, crossed out)</span>
            </label>
            <input
              id={`${sectionId}-us`}
              type="text"
              value={usCity}
              onChange={(e) => setUsCity(e.target.value)}
              maxLength={48}
              className="mt-3 w-full border border-cream-dark bg-cream px-4 py-3 text-ink outline-none transition-colors focus:border-ink"
              placeholder="e.g. California"
              autoComplete="address-level2"
            />
          </div>

          <div>
            <label
              htmlFor={`${sectionId}-home`}
              className="text-xs font-semibold uppercase tracking-widest text-muted"
            >
              Home city <span className="font-normal normal-case text-muted">(main text)</span>
            </label>
            <input
              id={`${sectionId}-home`}
              type="text"
              value={homeCity}
              onChange={(e) => setHomeCity(e.target.value)}
              maxLength={48}
              className="mt-3 w-full border border-cream-dark bg-cream px-4 py-3 text-ink outline-none transition-colors focus:border-ink"
              placeholder="e.g. Pune"
              autoComplete="off"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-charcoal">
            <input
              type="checkbox"
              checked={showTagline}
              onChange={(e) => setShowTagline(e.target.checked)}
              className="h-4 w-4 border-cream-dark accent-ink"
            />
            Show tagline “Roots Remain!”
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handlePreviewDesign}
              disabled={previewBusy}
              className="min-h-[52px] border border-ink bg-ink px-8 py-3 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-cream hover:text-ink disabled:opacity-50"
            >
              {previewBusy ? 'Generating…' : 'Preview design (Gemini)'}
            </button>
            <a
              href={waitlistMailto(waitlistBody)}
              className="inline-flex min-h-[52px] items-center justify-center border border-cream-dark px-8 py-3 text-center text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:border-ink"
            >
              Looks good? Join waitlist
            </a>
          </div>
          <p className="text-xs text-muted">
            Requires <code className="text-[11px]">npm run dev:worker</code> and{' '}
            <code className="text-[11px]">GEMINI_API_KEY</code> in <code className="text-[11px]">.dev.vars</code>{' '}
            (see README).
          </p>
        </div>

        <section
          ref={previewRef}
          id="design-preview"
          className="h-fit border border-ink/10 bg-cream-dark/15 p-8 md:sticky md:top-28"
          aria-labelledby={`${sectionId}-preview-title`}
        >
          <h2
            id={`${sectionId}-preview-title`}
            className="font-street text-xs font-normal uppercase tracking-[0.2em] text-muted"
          >
            Live layout
          </h2>
          <div className="mt-8 flex justify-center py-4">
            <GarmentPreview
              type={garment}
              baseColor={selectedColor.hex}
              layout={liveLayout}
              textOnDark={!selectedColor.darkText}
            />
          </div>
          <p className="mt-8 text-center text-xs text-muted">
            {garment === 'hoodie' ? 'Hoodie' : 'T-shirt'} · {selectedColor.label} ·{' '}
            {FIT_OPTIONS.find((f) => f.id === fitId)?.label}
          </p>

          <div className="mt-12 border-t border-cream-dark pt-10">
            <h3 className="font-street text-xs font-normal uppercase tracking-[0.2em] text-muted">
              AI previews (3 variants)
            </h3>
            {aiError && (
              <p className="mt-4 text-sm text-red-800" role="alert">
                {aiError}
              </p>
            )}
            {previewBusy && (
              <p className="mt-4 text-sm text-muted">Generating with Gemini…</p>
            )}
            {!previewBusy && aiImages.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {aiImages.map((src, i) => (
                  <div
                    key={`${i}-${src.slice(0, 32)}`}
                    className="overflow-hidden border border-ink/10 bg-cream"
                  >
                    <img
                      src={src}
                      alt={`AI-generated design option ${i + 1}`}
                      className="aspect-[3/4] h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            {!previewBusy && aiImages.length === 0 && !aiError && (
              <p className="mt-4 text-xs text-muted">
                Tap “Preview design (Gemini)” to generate three image variants from your cities and
                colors.
              </p>
            )}
          </div>
          <Link
            to="/shop"
            className="mt-6 block text-center text-xs font-semibold uppercase tracking-widest text-ink underline-offset-4 hover:underline"
          >
            Shop the Roots Remain drop
          </Link>
        </section>
      </div>
    </div>
  )
}
