import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

// Recenzii placeholder — vor fi înlocuite cu recenzii reale (Master Plan §36).
const reviews = [
  { name: "Andreea M.", text: "Intervenție rapidă și profesionistă pentru ploșnițe. Recomand!", rating: 5 },
  { name: "Mihai P.", text: "Am programat online în câteva minute, iar echipa a fost punctuală.", rating: 5 },
  { name: "Restaurant Bucuresti", text: "Colaborăm recurent pentru dezinsecție și deratizare. Servicii de încredere.", rating: 5 },
];

export function Reviews() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold">Ce spun clienții</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.name}>
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm text-foreground/80">&ldquo;{review.text}&rdquo;</p>
              <p className="mt-3 text-sm font-semibold">{review.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
