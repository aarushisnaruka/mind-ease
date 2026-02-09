const navItems = ['Home', 'Profile', 'Contact Us', 'Log out']

export default function Sidebar({ onHome, onProfile, onContact, onLogout }) {
    return (
        <aside className="hidden h-screen w-56 flex-col gap-6 bg-[#204060] px-6 py-8 text-[#FFF4DE] lg:flex">
            <div className="flex flex-col items-center gap-3">
                {/* Logo Replaced Here */}
                <img 
                    src="/Dash/logo_white.png" 
                    alt="MindEase" 
                    className="h-16 w-auto object-contain"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                    MindEase
                </p>
            </div>
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => {
                            if (item === 'Home') onHome?.()
                            if (item === 'Profile') onProfile?.()
                            if (item === 'Contact Us') onContact?.()
                            if (item === 'Log out') onLogout?.()
                        }}
                        className="rounded-xl px-3 py-2 text-left transition hover:bg-[#0E1D2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF4DE]"
                    >
                        {item}
                    </button>
                ))}
            </nav>
        </aside>
    )
}