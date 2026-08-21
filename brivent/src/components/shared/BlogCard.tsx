import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white border border-border rounded-xl overflow-hidden hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/9] bg-gradient-to-br from-accent/10 to-surface overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] text-accent font-semibold tracking-widest uppercase">
            {post.category}
          </span>
          <span className="text-muted-light text-[10px]">•</span>
          <span className="text-[10px] text-muted-light">
            {formatDate(post.publishedAt)}
          </span>
        </div>
        <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4 text-[10px] text-muted-light">
          <span>{post.author}</span>
          {post.readingTime && <span>{post.readingTime}</span>}
        </div>
      </div>
    </Link>
  );
}