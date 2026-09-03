"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

function formatDate(date: string | Date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export default function BlogCard({ post }: BlogCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full perspective-1000">
      <motion.article
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
        }}
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-100 h-full flex flex-col"
      >
        <div className="relative aspect-[16/10] overflow-hidden" style={{ transform: "translateZ(40px)" }}>
          <img
            src={post.coverImage || "/images/blog/placeholder.jpg"}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-accent text-white text-[10px] font-semibold px-3 py-1 rounded-full tracking-wider uppercase">
              {post.category}
            </span>
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-1" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <span className="font-medium text-gray-700">{post.author}</span>
            <span>•</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-accent text-[10px] tracking-wider uppercase font-semibold">
              {post.category}
            </span>
            {post.readingTime && (
              <span className="text-xs text-gray-500">{post.readingTime}</span>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}