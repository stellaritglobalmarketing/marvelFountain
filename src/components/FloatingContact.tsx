import { MessageCircle, Phone } from "lucide-react";
import { getSettings } from "@/lib/queries";

// Always-visible WhatsApp + call buttons (bottom-right), like the old website had
export default async function FloatingContact() {
  const settings = await getSettings();
  const phone = settings.contact_phone?.replace(/[^\d+]/g, "");
  const whatsapp = settings.whatsapp_number?.replace(/\D/g, "");
  if (!phone && !whatsapp) return null;

  const button = "flex h-13 w-13 items-center justify-center rounded-full text-white shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition-transform hover:scale-110";
  return (
    <div className="fixed right-5 bottom-5 z-[90] flex flex-col gap-3 max-sm:right-3 max-sm:bottom-3">
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hello Marvel Fountains, I would like to know more about your fountains.")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className={`${button} bg-[#25D366]`}
        >
          <MessageCircle size={26} />
        </a>
      )}
      {phone && (
        <a href={`tel:${phone}`} aria-label="Call us" className={`${button} bg-cyan-deep`}>
          <Phone size={22} />
        </a>
      )}
    </div>
  );
}
