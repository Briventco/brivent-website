import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export type HeroStat = { label: string; value: number | string };

export function SectionHero({
    icon: Icon,
    eyebrow,
    title,
    description,
    tone,
    stats,
    children,
}: {
    icon: LucideIcon;
    eyebrow: string;
    title: string;
    description: string;
    tone: string;
    stats: HeroStat[];
    children?: ReactNode;
}) {
    return (
        <header className={`sec-hero sec-${tone}`}>
            <div className="sec-hero-main">
                <span className="sec-icon">
                    <Icon size={22} />
                </span>
                <div>
                    <p className="eyebrow">{eyebrow}</p>
                    <h1>{title}</h1>
                    <p className="sec-desc">{description}</p>
                </div>
            </div>
            <div className="sec-stats">
                {stats.map((stat) => (
                    <div className="sec-stat" key={stat.label}>
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                    </div>
                ))}
            </div>
            {children && <div className="sec-extra">{children}</div>}
        </header>
    );
}