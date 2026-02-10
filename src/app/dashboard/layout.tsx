import { Navbar } from "@/components/shared/Navbar"; 

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Header Utama: Satu-satunya source background & blur */}
      <header className="border-b dark:border-gray-800 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-gray-500 border-t dark:border-gray-800 mt-20 font-mono">
        <p>&copy; {new Date().getFullYear()} Aksamedia Test - Abril Berliando</p>
        <p className="text-[10px] uppercase tracking-[0.2em] mt-2 opacity-50 italic">System_Ready // Authorized_Access_Only</p>
      </footer>
    </div>
  );
}