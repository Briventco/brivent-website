import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/constants";

const infoRows = [
  {
    icon: Phone,
    label: "Call Us",
    value: siteConfig.phone || "To be confirmed",
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "To be confirmed",
  },
];

export default function ContactInfoCard() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-8 h-full flex flex-col">
      <p className="text-[10px] text-muted-light tracking-widest uppercase font-semibold mb-6">
        Get in Touch
      </p>
      <div className="divide-y divide-border flex-1">
        {infoRows.map((row) => (
          <div key={row.label} className="flex items-center gap-4 py-5 first:pt-0">
            <div className="w-11 h-11 rounded-xl bg-white border border-border flex items-center justify-center flex-shrink-0">
              <row.icon size={18} className="text-accent" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[10px] text-muted-light tracking-widest uppercase mb-1">
                {row.label}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {row.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted leading-relaxed">
          We typically respond within 1–2 business days.
        </p>
      </div>
    </div>
  );
}