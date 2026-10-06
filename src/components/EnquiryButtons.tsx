import { MessageCircle, Phone } from "lucide-react";
import { getSettings } from "@/lib/queries";

// WhatsApp-enquiry + call buttons. Numbers come from admin → Contact & Banners.
export default async function EnquiryButtons({ product, className = "" }: { product?: string; className?: string }) {
  const settings = await getSettings();
  const whatsapp = settings.whatsapp_number?.replace(/\D/g, "");
  const phone = settings.contact_phone ?? "";
  const tel = phone.replace(/[^\d+]/g, "");
  if (!whatsapp && !tel) return null;

  const text = product
    ? `Hello Marvel Fountains, I am interested in "${product}". Please share more details and a quote.`
    : "Hello Marvel Fountains, I would like to know more about your fountains.";
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition-all hover:-translate-y-0.5 active:translate-y-0";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} bg-[#25D366] text-white shadow-[0_10px_24px_rgba(37,211,102,0.3)] hover:shadow-[0_14px_30px_rgba(37,211,102,0.45)]`}
        >
          <MessageCircle size={17} /> Enquire on WhatsApp
        </a>
      )}
      {tel && (
        <a
          href={`tel:${tel}`}
          className={`${base} border border-cyan text-cyan hover:bg-cyan/10`}
        >
          <Phone size={16} /> Call {phone}
        </a>
      )}
    </div>
  );
}
