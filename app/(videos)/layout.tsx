import { Navbar } from "@/components/ui/navbar";
import { Spotlight } from "@/components/ui/spotlight";

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="bg-black/[0.96] antialiased bg-grid-white/[0.05]">
        <Spotlight 
          className="absolute top-0 left-0 h-[100%]" 
          fill="white" 
        />
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          {children}
        </main>
      </div>
    </div>
  );
} 