import type { PreviewKind } from '@/data/projects'
import { cn } from '@/lib/utils'

/**
 * Stylised interface composition used as a project preview.
 * These are design mock-ups — abstract UI studies of each product's
 * interface — not screenshots of live products.
 */

function Chrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-[1.2cqw] border-b border-line-soft bg-ink/70 px-[2.4cqw] py-[1.6cqw]">
      <div className="flex items-center gap-[0.8cqw]">
        <span className="pv-dot bg-raise" />
        <span className="pv-dot bg-raise" />
        <span className="pv-dot bg-raise" />
      </div>
      <div className="mx-auto truncate rounded-full border border-line-soft px-[2cqw] py-[0.6cqw] font-mono pv-micro text-faint">
        {url}
      </div>
    </div>
  )
}

function Tile({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-[clamp(2px,0.8cqw,6px)] border px-[1.8cqw] py-[1.6cqw]',
        accent ? 'border-accent/25 bg-accent/[0.06]' : 'border-line-soft bg-panel/70',
      )}
    >
      <p className="pv-micro uppercase text-faint">{label}</p>
      <p
        className={cn(
          'mt-[0.8cqw] pv-title font-medium tabular-nums',
          accent ? 'text-accent-soft' : 'text-chalk',
        )}
      >
        {value}
      </p>
    </div>
  )
}

function Bar({ width, className }: { width: string; className?: string }) {
  return <div className={cn('pv-bar', className ?? 'bg-raise')} style={{ width }} />
}

/* ------------------------------------------------------------------ */

function School() {
  return (
    <div className="flex h-full">
      <div className="flex w-[16%] flex-col gap-[1.4cqw] border-r border-line-soft bg-void/60 px-[1.6cqw] py-[2cqw]">
        <div className="mb-[1cqw] h-[2.2cqw] w-[2.2cqw] rounded-[3px] bg-accent/70" />
        {[80, 62, 70, 54, 66, 48].map((w, i) => (
          <Bar key={i} width={`${w}%`} className={i === 0 ? 'bg-accent/60' : 'bg-raise'} />
        ))}
      </div>

      <div className="flex-1 pv-pad">
        <div className="flex items-center justify-between">
          <div>
            <Bar width="38%" className="bg-chalk/60" />
            <div className="mt-[1cqw]">
              <Bar width="22%" />
            </div>
          </div>
          <div className="rounded-full border border-accent/30 px-[1.6cqw] py-[0.5cqw] font-mono pv-micro text-accent-soft">
            Class 8 · A
          </div>
        </div>

        <div className="mt-[2.4cqw] grid grid-cols-3 pv-gap">
          <Tile label="Students" value="1,248" accent />
          <Tile label="Teachers" value="64" />
          <Tile label="Sections" value="A · B · C" />
        </div>

        <div className="mt-[2.4cqw] rounded-[clamp(2px,0.8cqw,6px)] border border-line-soft">
          <div className="flex items-center gap-[1.4cqw] border-b border-line-soft px-[1.8cqw] py-[1.2cqw]">
            <span className="pv-micro uppercase text-faint">Student</span>
            <span className="pv-micro ml-auto uppercase text-faint">Status</span>
          </div>
          {[
            ['#4c8dff', 'Enrolled'],
            ['#5bd6a0', 'Promoted'],
            ['#4c8dff', 'Enrolled'],
            ['#e5b567', 'Pending'],
          ].map(([color, status], i) => (
            <div
              key={i}
              className="flex items-center gap-[1.4cqw] border-b border-line-soft/60 px-[1.8cqw] py-[1.4cqw] last:border-0"
            >
              <span className="pv-avatar" style={{ background: `${color}44` }} />
              <Bar width={`${42 - i * 4}%`} className="bg-chalk/30" />
              <span
                className="ml-auto rounded-full px-[1.2cqw] py-[0.3cqw] pv-micro"
                style={{ color, background: `${color}18` }}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Expense() {
  const bars = [38, 62, 44, 78, 52, 68, 34]
  return (
    <div className="pv-pad">
      <div className="flex items-end justify-between">
        <div>
          <p className="pv-micro uppercase text-faint">This month</p>
          <p className="mt-[0.8cqw] pv-title font-medium tabular-nums text-chalk">৳ 12,480</p>
        </div>
        <div className="rounded-[4px] bg-accent px-[2cqw] py-[1cqw] pv-micro font-medium text-void">
          + Add
        </div>
      </div>

      <div className="mt-[2.6cqw] flex items-end justify-between gap-[1.4cqw] border-b border-line-soft pb-[1.4cqw]">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-full rounded-t-[2px]"
            style={{
              height: `${h * 0.42}cqw`,
              background: i === 3 ? '#4c8dff' : '#22222b',
            }}
          />
        ))}
      </div>

      <div className="mt-[2cqw] space-y-[1.4cqw]">
        {[
          ['Lunch', '৳ 120', '#4c8dff'],
          ['Transport', '৳ 60', '#5bd6a0'],
          ['Books', '৳ 850', '#e5b567'],
        ].map(([label, amount, color]) => (
          <div key={label} className="flex items-center gap-[1.4cqw]">
            <span className="pv-dot" style={{ background: color }} />
            <span className="pv-body text-mute">{label}</span>
            <span className="hairline flex-1" />
            <span className="pv-body tabular-nums text-chalk">{amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="pv-pad">
      <div className="grid grid-cols-4 pv-gap">
        {[
          ['Students', '1,248'],
          ['Classes', '24'],
          ['Sections', '72'],
          ['Avg GPA', '3.82'],
        ].map(([l, v], i) => (
          <Tile key={l} label={l} value={v} accent={i === 0} />
        ))}
      </div>

      <div className="mt-[2.4cqw] rounded-[clamp(2px,0.8cqw,6px)] border border-line-soft bg-panel/50 p-[2cqw]">
        <div className="flex items-center justify-between">
          <span className="pv-micro uppercase text-faint">Academic trend</span>
          <span className="pv-micro uppercase text-accent/70">Term 2</span>
        </div>
        <svg viewBox="0 0 100 34" className="mt-[1.6cqw] w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pv-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4c8dff" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#4c8dff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,26 L14,20 L28,23 L42,12 L56,16 L70,8 L84,11 L100,4 L100,34 L0,34 Z"
            fill="url(#pv-grad)"
          />
          <path
            d="M0,26 L14,20 L28,23 L42,12 L56,16 L70,8 L84,11 L100,4"
            fill="none"
            stroke="#4c8dff"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      <div className="mt-[2cqw] grid grid-cols-2 pv-gap">
        <div className="rounded-[clamp(2px,0.8cqw,6px)] border border-line-soft p-[1.8cqw]">
          <span className="pv-micro uppercase text-faint">Promotion queue</span>
          <div className="mt-[1.4cqw] space-y-[1.2cqw]">
            {[70, 54, 62].map((w, i) => (
              <div key={i} className="flex items-center gap-[1.2cqw]">
                <span className="pv-avatar bg-accent/25" />
                <Bar width={`${w}%`} />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[clamp(2px,0.8cqw,6px)] border border-line-soft p-[1.8cqw]">
          <span className="pv-micro uppercase text-faint">Recent</span>
          <div className="mt-[1.4cqw] space-y-[1.2cqw]">
            {[82, 66, 74].map((w, i) => (
              <Bar key={i} width={`${w}%`} className={i === 0 ? 'bg-accent/50' : 'bg-raise'} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Health() {
  return (
    <div className="pv-pad">
      <div className="flex items-center gap-[1.2cqw]">
        {[
          ['Scheduled', '#4c8dff'],
          ['Completed', '#5bd6a0'],
          ['Pending', '#e5b567'],
        ].map(([label, color]) => (
          <span
            key={label as string}
            className="rounded-full px-[1.6cqw] py-[0.6cqw] pv-micro"
            style={{ color, background: `${color}16`, border: `1px solid ${color}33` }}
          >
            {label}
          </span>
        ))}
        <span className="ml-auto pv-micro text-faint">Mon 14</span>
      </div>

      <div className="mt-[2.4cqw] space-y-[1.4cqw]">
        {[
          ['09:30', 72, '#4c8dff'],
          ['10:15', 58, '#5bd6a0'],
          ['11:00', 64, '#e5b567'],
        ].map(([time, w, color]) => (
          <div
            key={time as string}
            className="flex items-center gap-[1.6cqw] rounded-[clamp(2px,0.8cqw,6px)] border border-line-soft px-[1.8cqw] py-[1.4cqw]"
          >
            <span className="pv-micro tabular-nums text-dim">{time}</span>
            <span className="pv-dot" style={{ background: color }} />
            <Bar width={`${w}%`} />
            <span className="h-[2.4cqw] w-px bg-line-soft" />
            <Bar width="12%" className="bg-chalk/25" />
          </div>
        ))}
      </div>

      <div className="mt-[2.4cqw] rounded-[clamp(2px,0.8cqw,6px)] border border-line-soft p-[1.8cqw]">
        <span className="pv-micro uppercase text-faint">Week</span>
        <div className="mt-[1.4cqw] grid grid-cols-7 pv-gap">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="h-[1.6cqw] rounded-[2px]"
              style={{ background: i % 4 === 0 ? '#4c8dff66' : '#1d1d24' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Booking() {
  return (
    <div className="flex h-full flex-col pv-pad">
      <div className="relative flex-[1.4] overflow-hidden rounded-[clamp(2px,0.9cqw,8px)] border border-line-soft bg-gradient-to-br from-[#1b1f2b] via-[#121419] to-[#0d0d11]">
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div className="absolute bottom-[1.8cqw] left-[1.8cqw] rounded-[3px] border border-white/10 bg-void/60 px-[1.4cqw] py-[0.6cqw] font-mono pv-micro text-mute backdrop-blur-sm">
          Deluxe · Room 04
        </div>
        <div className="absolute right-[1.8cqw] top-[1.8cqw] flex gap-[0.8cqw]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="pv-dot"
              style={{ background: i === 0 ? '#4c8dff' : '#2a2a33' }}
            />
          ))}
        </div>
      </div>

      <div className="mt-[2cqw] flex flex-[1] gap-[2cqw]">
        <div className="flex-1 space-y-[1.4cqw]">
          <Bar width="76%" className="bg-chalk/55" />
          <Bar width="52%" />
          <div className="flex gap-[1cqw] pt-[0.6cqw]">
            {['#4c8dff', '#5bd6a0', '#e5b567'].map((c) => (
              <span key={c} className="pv-dot" style={{ background: `${c}55` }} />
            ))}
          </div>
        </div>
        <div className="w-[34%] rounded-[clamp(2px,0.8cqw,6px)] border border-line-soft p-[1.6cqw]">
          <span className="pv-micro uppercase text-faint">From</span>
          <p className="mt-[0.6cqw] pv-title font-medium text-chalk">৳ 4,200</p>
          <div className="mt-[1.4cqw] rounded-[3px] bg-chalk px-[1.4cqw] py-[0.9cqw] text-center pv-micro font-medium text-void">
            Book
          </div>
        </div>
      </div>
    </div>
  )
}

function Commerce() {
  return (
    <div className="pv-pad">
      <div className="flex items-center gap-[1.6cqw] border-b border-line-soft pb-[1.6cqw]">
        <Bar width="18%" className="bg-chalk/60" />
        <span className="pv-micro uppercase text-dim">New</span>
        <span className="pv-micro uppercase text-dim">Men</span>
        <span className="pv-micro uppercase text-dim">Sale</span>
        <span className="ml-auto rounded-full border border-line-soft px-[1.4cqw] py-[0.4cqw] pv-micro text-mute">
          Cart 2
        </span>
      </div>

      <div className="mt-[2cqw] grid grid-cols-3 pv-gap">
        {[
          ['from-[#20242f] to-[#12141a]', '৳ 1,290'],
          ['from-[#241f2b] to-[#141118]', '৳ 980'],
          ['from-[#1d2422] to-[#101413]', '৳ 1,650'],
        ].map(([gradient, price], i) => (
          <div key={i}>
            <div
              className={cn(
                'relative aspect-[3/4] overflow-hidden rounded-[clamp(2px,0.8cqw,6px)] border border-line-soft bg-gradient-to-br',
                gradient,
              )}
            >
              {i === 0 ? (
                <span className="absolute left-[1.2cqw] top-[1.2cqw] rounded-[2px] bg-accent px-[1cqw] py-[0.3cqw] pv-micro font-medium text-void">
                  New
                </span>
              ) : null}
            </div>
            <div className="mt-[1.2cqw]">
              <Bar width="72%" />
              <div className="mt-[0.8cqw] flex items-center justify-between">
                <span className="pv-body tabular-nums text-chalk">{price}</span>
                <span className="pv-micro text-faint">COD</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Mess() {
  return (
    <div className="pv-pad">
      <div className="flex items-center justify-between">
        <div>
          <p className="pv-micro uppercase text-faint">Month · Meal count</p>
          <p className="mt-[0.6cqw] pv-title font-medium tabular-nums text-chalk">248</p>
        </div>
        <div className="rounded-full border border-accent/30 px-[1.6cqw] py-[0.5cqw] pv-micro text-accent-soft">
          Due ৳ 3,400
        </div>
      </div>

      <div className="mt-[2.2cqw] grid grid-cols-7 pv-gap">
        {Array.from({ length: 21 }).map((_, i) => (
          <span
            key={i}
            className="h-[2.4cqw] rounded-[2px] border border-line-soft/70"
            style={{ background: i % 5 === 0 ? '#4c8dff33' : '#14141a' }}
          />
        ))}
      </div>

      <div className="mt-[2.4cqw] space-y-[1.4cqw]">
        {[
          ['Member 01', '#4c8dff'],
          ['Member 02', '#5bd6a0'],
          ['Member 03', '#e5b567'],
        ].map(([label, color]) => (
          <div key={label} className="flex items-center gap-[1.4cqw]">
            <span className="pv-avatar" style={{ background: `${color}44` }} />
            <span className="pv-body text-mute">{label}</span>
            <span className="hairline flex-1" />
            <span className="pv-body tabular-nums text-chalk">Paid</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const PREVIEWS: Record<PreviewKind, { url: string; render: () => React.ReactElement }> = {
  school: { url: 'movoschool.com/dashboard', render: () => <School /> },
  expense: { url: 'spendly.app/overview', render: () => <Expense /> },
  dashboard: { url: 'app.schoolms.dev/admin', render: () => <Dashboard /> },
  health: { url: 'doctalk.app/schedule', render: () => <Health /> },
  booking: { url: 'royalstay.com/rooms', render: () => <Booking /> },
  commerce: { url: 'nexora.store/collections', render: () => <Commerce /> },
  mess: { url: 'belalmess.app/members', render: () => <Mess /> },
}

interface Props {
  kind: PreviewKind
  className?: string
  url?: string
  /** Hides the browser chrome for tighter compositions. */
  bare?: boolean
}

export default function InterfacePreview({ kind, className, url, bare = false }: Props) {
  const preset = PREVIEWS[kind]
  return (
    <div
      className={cn(
        'pv relative flex flex-col overflow-hidden rounded-[clamp(4px,1.2cqw,10px)] border border-line bg-abyss shadow-[0_40px_120px_-50px_rgba(0,0,0,0.95)]',
        className,
      )}
    >
      {bare ? null : <Chrome url={url ?? preset.url} />}
      <div className="relative flex-1">{preset.render()}</div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
    </div>
  )
}
