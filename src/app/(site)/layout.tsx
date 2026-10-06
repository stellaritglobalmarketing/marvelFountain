import FloatingContact from "@/components/FloatingContact";
import SmoothScroll from "@/components/SmoothScroll";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      {/* clip, not hidden: stops slide-in animations widening the page on phones without making a scroll container */}
      <div className="overflow-x-clip">{children}</div>
      <FloatingContact />
    </>
  );
}
