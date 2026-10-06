import { Link } from 'react-router-dom'
import { navItems, profile } from '@/data/profile'
import { isPlaceholder } from '@/data/profile'
import { cn } from '@/lib/utils'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-line-soft">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-[15px] font-semibold tracking-[0.14em] text-chalk">
              {profile.displayName}
            </p>
            <p className="mt-4 max-w-[34ch] font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
              {profile.positioning}
            </p>
            <p className="mt-6 max-w-[36ch] text-[13.5px] leading-relaxed text-faint">
              {profile.education.program} · {profile.education.semester} ·{' '}
              {profile.education.institute}
            </p>
            <p className="mt-2 text-[13.5px] text-faint">{profile.location}</p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer navigation">
            <p className="label">Menu</p>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-[13.5px] text-mute transition-colors duration-500 hover:text-chalk"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="label">Elsewhere</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13.5px] text-mute transition-colors duration-500 hover:text-chalk"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={
                    isPlaceholder('linkedin')
                      ? 'Placeholder — replace this in src/data/profile.ts'
                      : undefined
                  }
                  className={cn(
                    'text-[13.5px] text-mute transition-colors duration-500 hover:text-chalk',
                    isPlaceholder('linkedin') && 'border-b border-dashed border-faint',
                  )}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.contact.email}`}
                  title={
                    isPlaceholder('email')
                      ? 'Placeholder — replace this in src/data/profile.ts'
                      : undefined
                  }
                  className={cn(
                    'text-[13.5px] text-mute transition-colors duration-500 hover:text-chalk',
                    isPlaceholder('email') && 'border-b border-dashed border-faint',
                  )}
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line-soft pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            © {year} {profile.name}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            React · TypeScript · Tailwind CSS · React Three Fiber · Framer Motion
          </p>
        </div>
      </div>

      {/* watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden px-4"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, #000 60%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 60%)',
        }}
      >
        <p className="translate-y-[0.14em] text-center text-[19vw] font-semibold leading-[0.8] tracking-[0.02em] text-chalk/[0.035]">
          {profile.displayName}
        </p>
      </div>
    </footer>
  )
}
