import PageAnimations from "@/components/layout/PageAnimations";
import Footer from "@/components/layout/Footer";

// template (not layout) so animations re-initialise on every navigation
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <PageAnimations>
      <main id="main" className="relative z-10">
        {children}
      </main>
      <Footer />
    </PageAnimations>
  );
}
