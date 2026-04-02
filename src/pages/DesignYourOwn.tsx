import { useCallback, useId, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { DESIGN_REFERENCES } from '../data/designReferences'
import { formatDesignLayout } from '../lib/designAi'
import {
  loadPublicImageAsBase64,
  requestDesignPreviewImages,
} from '../lib/designPreviewApi'

export function DesignYourOwn() {
  const previewRef = useRef<HTMLElement | null>(null)
  const sectionId = useId()

  const [referenceId, setReferenceId] = useState(DESIGN_REFERENCES[0]!.id)
  const [usCity, setUsCity] = useState('California')
  const [homeCity, setHomeCity] = useState('Pune')
  const [previewBusy, setPreviewBusy] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)

  const selectedRef = useMemo(
    () => DESIGN_REFERENCES.find((r) => r.id === referenceId) ?? DESIGN_REFERENCES[0]!,
    [referenceId]
  )

  const liveLayout = useMemo(
    () => formatDesignLayout(usCity, homeCity, ''),
    [usCity, homeCity]
  )

  const scrollToPreview = useCallback(() => {
    previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const selectReference = useCallback((id: string) => {
    setReferenceId(id)
    setGeneratedImage(null)
  }, [])

  const handlePreviewDesign = useCallback(async () => {
    setPreviewBusy(true)
    try {
      const { data, mime } = await loadPublicImageAsBase64(selectedRef.image)
      const result = await requestDesignPreviewImages(
        {
          garment: selectedRef.previewGarment,
          baseColorLabel: 'Custom',
          baseColorHex: selectedRef.previewColorHex,
          fitLabel: 'Relaxed',
          usCity,
          homeCity,
          showTagline: false,
          layout: liveLayout,
          referenceId: selectedRef.id,
          referenceImageBase64: data,
          referenceImageMime: mime,
        },
        { textOnDark: selectedRef.previewTextOnDark }
      )
      const first = result.images[0]
      if (first) {
        setGeneratedImage(first)
      }
    } catch {
      /* keep previous preview */
    }
    setPreviewBusy(false)
    scrollToPreview()
  }, [selectedRef, usCity, homeCity, liveLayout, scrollToPreview])

  const previewSrc = generatedImage ?? selectedRef.image

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        Elsewhere Lab
      </p>
      <h1 className="font-display mt-4 text-4xl font-bold tracking-tight md:text-5xl">
        Design your own
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Pick a style from the <em>Roots Remain</em> drop as the template, add your two cities,
        and we generate a new product still — same art direction and print layout, your place
        names swapped in.
      </p>

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-16">
        <div className="space-y-10">
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-widest text-muted">
              Template <span className="font-normal normal-case">(from our drop)</span>
            </legend>
            <p className="mt-2 max-w-xl text-sm text-muted">
              One photo per product. Your preview starts from this template until you generate.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {DESIGN_REFERENCES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => selectReference(r.id)}
                  className={[
                    'group overflow-hidden rounded-lg border-2 text-left transition-colors',
                    referenceId === r.id
                      ? 'border-ink ring-2 ring-ink/15'
                      : 'border-cream-dark hover:border-ink/25',
                  ].join(' ')}
                >
                  <div className="aspect-square bg-cream-dark/15">
                    <img
                      src={r.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <p className="border-t border-cream-dark bg-cream px-2 py-2 text-[10px] font-semibold uppercase leading-snug tracking-wide text-ink">
                    {r.label}
                  </p>
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor={`${sectionId}-us`}
              className="text-xs font-semibold uppercase tracking-widest text-muted"
            >
              Sister city <span className="font-normal normal-case text-muted">(crossed out)</span>
            </label>
            <input
              id={`${sectionId}-us`}
              type="text"
              value={usCity}
              onChange={(e) => setUsCity(e.target.value)}
              maxLength={48}
              className="mt-3 w-full border border-cream-dark bg-cream px-4 py-3 text-ink outline-none transition-colors focus:border-ink"
              placeholder="e.g. New York"
              autoComplete="address-level2"
            />
          </div>

          <div>
            <label
              htmlFor={`${sectionId}-home`}
              className="text-xs font-semibold uppercase tracking-widest text-muted"
            >
              Home city <span className="font-normal normal-case text-muted">(main graphic)</span>
            </label>
            <input
              id={`${sectionId}-home`}
              type="text"
              value={homeCity}
              onChange={(e) => setHomeCity(e.target.value)}
              maxLength={48}
              className="mt-3 w-full border border-cream-dark bg-cream px-4 py-3 text-ink outline-none transition-colors focus:border-ink"
              placeholder="e.g. Mumbai"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handlePreviewDesign}
              disabled={previewBusy}
              className="min-h-[52px] border border-ink bg-ink px-8 py-3 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-cream hover:text-ink disabled:opacity-50"
            >
              {previewBusy ? 'Generating…' : 'Generate design'}
            </button>
            <Link
              to="/contact"
              className="inline-flex min-h-[52px] items-center justify-center border border-cream-dark px-8 py-3 text-center text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:border-ink"
            >
              Looks good? Join waitlist
            </Link>
          </div>
        </div>

        <section
          ref={previewRef}
          id="design-preview"
          className="h-fit border border-ink/10 bg-cream-dark/15 p-6 md:sticky md:top-28 md:p-8"
          aria-labelledby={`${sectionId}-preview-title`}
        >
          <h2
            id={`${sectionId}-preview-title`}
            className="font-street text-xs font-normal uppercase tracking-[0.2em] text-muted"
          >
            Preview
          </h2>
          <p className="mt-2 text-xs text-muted">
            {generatedImage ? 'Your generated still.' : 'Template from'}{' '}
            <strong className="font-medium text-ink">{selectedRef.label}</strong>
            {!generatedImage ? '.' : ''}
          </p>

          <div className="relative mx-auto mt-8 max-w-sm overflow-hidden border border-ink/10 bg-cream">
            <img
              src={previewSrc}
              alt=""
              className="aspect-[3/4] h-full w-full object-cover object-top"
            />
            {previewBusy && (
              <div className="absolute inset-0 flex items-center justify-center bg-cream/85 backdrop-blur-[2px]">
                <p className="px-4 text-center text-sm font-medium text-ink">
                  Generating your design...
                </p>
              </div>
            )}
          </div>

          <Link
            to="/shop"
            className="mt-8 block text-center text-xs font-semibold uppercase tracking-widest text-ink underline-offset-4 hover:underline"
          >
            Shop the Roots Remain drop
          </Link>
        </section>
      </div>
    </div>
  )
}
