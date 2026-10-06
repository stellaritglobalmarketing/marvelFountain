import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/ContactForm";
import EnquiryButtons from "@/components/EnquiryButtons";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { getSettings } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact Us | Marvel Fountains" };

export default async function ContactPage() {
  const settings = await getSettings();
  const phone = settings.contact_phone ?? "";
  const emails = [settings.contact_email, settings.contact_email_2].filter(Boolean) as string[];
  const contactInfo = [
    { Icon: MapPin, label: "Address", value: settings.contact_address, href: undefined },
    { Icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` },
    ...emails.map((e) => ({ Icon: Mail, label: "Email", value: e, href: `mailto:${e}` })),
    ...(settings.whatsapp_number
      ? [{ Icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${settings.whatsapp_number}` }]
      : []),
  ].filter((c) => c.value);

  return (
    <>
      <Header solid title="Contact Us" />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />

      <section className="px-7 max-md:px-4 pb-30">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-17">
          <Reveal variant="fade-left">
            <div className="flex items-center gap-3.5 mb-4.5 text-gold text-xs font-semibold tracking-[3px] uppercase before:content-[''] before:w-8.5 before:h-px before:bg-gold">
              Contact Us
            </div>
            <h3 className="text-ink text-[26px] mb-4.5 font-bold font-serif">Let&apos;s Build Something Beautiful</h3>
            <p className="text-muted mb-6.5 font-light">
              Reach out for product enquiries, custom designs, or installation support.
            </p>
            {contactInfo.map(({ Icon, label, value, href }) => (
              <div key={`${label}-${value}`} className="flex gap-4 mb-5.5 items-start pb-5.5 border-b border-line">
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-deep text-navy-deep shrink-0 shadow-[0_6px_16px_rgba(212,175,55,0.3)]">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <h5 className="text-ink text-sm font-semibold uppercase tracking-wide">{label}</h5>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="mt-1 block text-sm text-muted transition-colors hover:text-gold"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-muted text-sm mt-1">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal variant="fade-right">
            <ContactForm />
            <p className="mt-6 mb-3 text-center text-sm text-muted">Prefer to talk? Message or call us directly:</p>
            <EnquiryButtons className="justify-center" />
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
