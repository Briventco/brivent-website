import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

const statusStyles: Record<Product["status"], string> = {
  Live: "bg-emerald-50 text-emerald-600",
  "In Development": "bg-amber-50 text-amber-600",
  Pilot: "bg-accent/10 text-accent",
  "Coming Soon": "bg-slate-100 text-muted",
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={product.href}
      className="group block bg-white border border-border rounded-xl overflow-hidden hover:border-accent hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/9] bg-gradient-to-br from-accent/10 to-surface overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-accent/20">
              {product.name}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] text-muted-light tracking-widest uppercase">
            {product.category}
          </p>
          <span
            className={`text-[10px] font-semibold px-2 py-1 rounded-full ${statusStyles[product.status]}`}
          >
            {product.status}
          </span>
        </div>
        <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-accent font-medium mb-3">{product.tagline}</p>
        <p className="text-sm text-muted leading-relaxed line-clamp-3">
          {product.description}
        </p>
        <span className="inline-flex items-center gap-1 mt-4 text-[10px] text-accent font-medium tracking-widest uppercase">
          Explore
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}