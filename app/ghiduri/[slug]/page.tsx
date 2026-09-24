import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { guides, getGuideBySlug } from "@/lib/data/guides";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/ghiduri/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.excerpt };
}

export default async function GuidePage({ params }: PageProps<"/ghiduri/[slug]">) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold sm:text-4xl">{guide.title}</h1>
      <div className="mt-6 space-y-4 text-foreground/80">
        {guide.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-10 rounded-2xl bg-brand/5 p-6 text-center">
        <p className="font-semibold">Ai o problemă similară?</p>
        <Button href="/programare" className="mt-4">Programează o evaluare</Button>
      </div>
    </article>
  );
}
