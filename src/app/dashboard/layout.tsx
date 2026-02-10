import { Navbar } from "@/components/shared/Navbar"; 

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100">
      {/* Navbar Full Width tapi konten di dalemnya tetep presisi */}
      <header className="border-b dark:border-gray-800 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </header>

      {/* Main content pake max-w yang lebih lega (misal 1440px) */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="py-10 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Aksamedia Test - Abril Berliando</p>
      </footer>
    </div>
  );
}