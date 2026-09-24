"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Trash2, Download } from "lucide-react";

interface DocRow {
  id: string;
  title: string;
  doc_type: string;
  created_at: string;
  url: string | null;
}

export function DocumentList({ documents }: { documents: DocRow[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await fetch("/api/admin/documents", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: id }),
      });
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  if (documents.length === 0) {
    return <p className="text-sm text-foreground/60">Niciun document încărcat încă.</p>;
  }

  return (
    <ul className="divide-y divide-black/5 rounded-xl border border-black/10 bg-white">
      {documents.map((doc) => (
        <li key={doc.id} className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 shrink-0 text-brand" />
            <div>
              <p className="font-medium">{doc.title}</p>
              <p className="text-xs uppercase tracking-wide text-foreground/50">{doc.doc_type}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {doc.url && (
              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand-light">
                <Download className="h-4 w-4" />
              </a>
            )}
            <button
              type="button"
              onClick={() => handleDelete(doc.id)}
              disabled={deletingId === doc.id}
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
