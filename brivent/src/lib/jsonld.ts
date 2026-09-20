import { siteConfig } from "./constants";

export function organizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logos/brivent/img.png`,
        description: siteConfig.description,
        email: siteConfig.email,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Osogbo",
            addressRegion: "Osun State",
            addressCountry: "NG",
        },
    };
}

export function websiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: "en",
    };
}

export function articleJsonLd(post: {
    title: string;
    description: string;
    slug: string;
    publishedAt?: string;
    image?: string;
    author?: string;
}) {
    const published = post.publishedAt ? new Date(post.publishedAt) : null;
    const validDate = published && !Number.isNaN(published.getTime()) ? published.toISOString() : undefined;

    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        url: `${siteConfig.url}/blog/${post.slug}`,
        mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
        datePublished: validDate,
        dateModified: validDate,
        image: post.image ? [post.image.startsWith("http") ? post.image : `${siteConfig.url}${post.image}`] : undefined,
        author: {
            "@type": post.author ? "Person" : "Organization",
            name: post.author || siteConfig.name,
        },
        publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: {
                "@type": "ImageObject",
                url: `${siteConfig.url}/logos/brivent/img.png`,
            },
        },
    };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${siteConfig.url}${item.path}`,
        })),
    };
}