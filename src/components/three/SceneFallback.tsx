/**
 * Shown when WebGL is unavailable or the visitor prefers reduced motion:
 * the same composition, built from DOM primitives. Keeps the hero from
 * ever looking empty.
 */
export default function SceneFallback({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[min(78vw,720px)]">
          {/* glow */}
          <div className="absolute -inset-x-16 -inset-y-20 rounded-[50%] bg-accent/12 blur-[90px]" />

          {/* monitor */}
          <div className="relative rounded-[10px] border border-line bg-ink/90 p-3 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2 px-1">
              <span className="size-2 rounded-full bg-raise" />
              <span className="size-2 rounded-full bg-raise" />
              <span className="size-2 rounded-full bg-raise" />
              <span className="ml-3 font-mono text-[10px] tracking-[0.14em] text-dim">
                mevo-school / dashboard.tsx
              </span>
            </div>
            <pre className="overflow-hidden rounded-[6px] bg-void/80 p-4 font-mono text-[10px] leading-[1.75] text-mute sm:text-xs">
              <code>
                <span className="text-violet-300">export function </span>
                <span className="text-accent-soft">SchoolDashboard</span>
                {'() {\n'}
                {'  '}
                <span className="text-violet-300">const </span>
                {'{ students, loading } = '}
                <span className="text-accent-soft">useStudents</span>
                {'(classId)\n'}
                {'  '}
                <span className="text-faint">// one record → class list, profile + results</span>
                {'\n  '}
                <span className="text-violet-300">return </span>
                {'<Panel title="Class 8 — Section A">\n'}
                {'    <StudentTable rows={filtered} />\n'}
                {'  </Panel>\n}'}
              </code>
            </pre>
          </div>

          {/* stand */}
          <div className="mx-auto h-8 w-3 bg-raise/70" />
          <div className="mx-auto h-1.5 w-32 rounded-full bg-raise/70" />
        </div>
      </div>
    </div>
  )
}
