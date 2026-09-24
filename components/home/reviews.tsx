import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getApprovedReviews } from "@/lib/data/db-reviews";

export async function Reviews() {
  const reviews = await getApprovedReviews();

  if (reviews.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold">Ce spun clienții</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.id}>
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              {review.comment && <p className="mt-3 text-sm text-foreground/80">&ldquo;{review.comment}&rdquo;</p>}
              {review.author_name && <p className="mt-3 text-sm font-semibold">{review.author_name}</p>}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
