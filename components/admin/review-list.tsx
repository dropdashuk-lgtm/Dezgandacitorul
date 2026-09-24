"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewRow {
  id: string;
  author_name: string | null;
  rating: number;
  comment: string | null;
  approved: boolean;
}

export function ReviewList({ reviews }: { reviews: ReviewRow[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function toggleApproved(id: string, approved: boolean) {
    setBusyId(id);
    try {
      await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId: id, approved }),
      });
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: string) {
    setBusyId(id);
    try {
      await fetch("/api/admin/reviews", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId: id }),
      });
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  if (reviews.length === 0) {
    return <p className="text-sm text-foreground/60">Nicio recenzie adăugată încă.</p>;
  }

  return (
    <ul className="divide-y divide-black/5 rounded-xl border border-black/10 bg-white">
      {reviews.map((review) => (
        <li key={review.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span className="text-sm font-semibold">{review.author_name}</span>
              <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", review.approved ? "bg-brand/10 text-brand" : "bg-black/5 text-foreground/50")}>
                {review.approved ? "Publicată" : "Nepublicată"}
              </span>
            </div>
            {review.comment && <p className="mt-1 text-sm text-foreground/70">{review.comment}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={busyId === review.id}
              onClick={() => toggleApproved(review.id, !review.approved)}
              className="text-sm font-medium text-brand hover:underline"
            >
              {review.approved ? "Ascunde" : "Publică"}
            </button>
            <button
              type="button"
              disabled={busyId === review.id}
              onClick={() => handleDelete(review.id)}
              className="text-foreground/40 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
