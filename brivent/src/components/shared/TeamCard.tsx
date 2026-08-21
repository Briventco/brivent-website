import Image from "next/image";
import { TeamMember } from "@/types/team";
import { ExternalLink } from "lucide-react";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group bg-white border border-border rounded-xl p-6 text-center hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1">
      <div className="relative w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-accent/20 group-hover:border-accent/50 transition-colors">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
            <span className="text-white text-sm font-bold tracking-wide">
              {initials(member.name)}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-base font-bold text-foreground">{member.name}</h3>
      <p className="text-sm text-accent mb-1">{member.role}</p>
      {member.bio && (
        <p className="text-xs text-muted leading-relaxed mt-2 line-clamp-3">
          {member.bio}
        </p>
      )}
      {(member.linkedin || member.twitter) && (
        <div className="flex justify-center gap-3 mt-4">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label={`${member.name} on LinkedIn`}
            >
              <ExternalLink size={16} />
            </a>
          )}
          {member.twitter && (
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label={`${member.name} professional link`}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}