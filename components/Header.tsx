import { cn } from '@/lib/utils'
import Link from 'next/link'

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header bg-white/90 backdrop-blur-md border-b border-pink-100 px-6 py-3 shadow-sm", className)}>
      <Link href='/' className="flex items-center gap-3 group md:flex-1">
        <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
          </svg>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-black tracking-tight text-slate-900">Do<span className="text-pink-600">collabs</span></span>
        </div>
      </Link>
      {children}
    </div>
  )
}

export default Header