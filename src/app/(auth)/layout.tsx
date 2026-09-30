import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D00000]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md z-10 flex flex-col items-center">
        <Link href="/" className="mb-8 flex items-center gap-3 group">
          <div className="relative w-12 h-12 overflow-hidden rounded-md">
            <Image src="/ate-logo.png" alt="ATE Logo" fill className="object-contain" />
          </div>
          <span className="font-heading font-bold text-2xl tracking-tight text-white group-hover:text-[#D00000] transition-colors">ATE</span>
        </Link>
        
        <div className="w-full bg-[#111114] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8">
          {children}
        </div>
        
        <p className="mt-8 text-sm text-[#99999F]">
          &copy; {new Date().getFullYear()} Alanya Taudra E-Sports
        </p>
      </div>
    </div>
  );
}
