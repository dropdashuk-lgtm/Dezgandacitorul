"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { services } from "@/lib/data/services";
import type { PropertyType, InfestationLevel } from "@/types";

const problemOptions = [
  ...services.filter((s) => s.featured).map((s) => ({ value: s.slug, label: s.shortName })),
  { value: "furnici", label: "Furnici" },
  { value: "purici", label: "Purici" },
  { value: "capuse", label: "Căpușe" },
  { value: "viespi", label: "Viespi" },
  { value: "tantari", label: "Țânțari" },
  { value: "molii", label: "Molii" },
  { value: "dezinfectie", label: "Dezinfecție" },
  { value: "nu-stiu", label: "Nu știu" },
];

const propertyOptions: { value: PropertyType; label: string }[] = [
  { value: "apartament", label: "Apartament" },
  { value: "casa", label: "Casă" },
  { value: "restaurant", label: "Restaurant" },
  { value: "hotel", label: "Hotel" },
  { value: "birou", label: "Birou" },
  { value: "magazin", label: "Magazin" },
  { value: "depozit", label: "Depozit" },
  { value: "asociatie", label: "Asociație de proprietari" },
  { value: "ferma", label: "Fermă" },
  { value: "vie", label: "Vie" },
  { value: "livada", label: "Livadă" },
  { value: "alt-tip", label: "Alt tip" },
];

function getSizeOptions(propertyType: PropertyType | ""): string[] {
  if (propertyType === "apartament") return ["1 cameră", "2 camere", "3 camere", "4+ camere"];
  if (["ferma", "vie", "livada"].includes(propertyType)) return ["< 1 ha", "1-5 ha", "5-20 ha", "20+ ha"];
  if (propertyType === "casa") return ["Casă < 100 m²", "Casă 100-200 m²", "Casă 200+ m²"];
  return ["< 50 m²", "50-150 m²", "150-500 m²", "500+ m²"];
}

const infestationOptions: { value: InfestationLevel; label: string }[] = [
  { value: "1-2-observate", label: "Am observat 1-2" },
  { value: "apar-frecvent", label: "Apar frecvent" },
  { value: "infestare-serioasa", label: "Infestare serioasă" },
  { value: "nu-stiu", label: "Nu știu" },
];

const dateOptions = ["Astăzi", "Mâine", "Această săptămână", "Aleg altă dată"];

const TOTAL_STEPS = 8;

interface FormState {
  problem: string;
  propertyType: PropertyType | "";
  propertySize: string;
  infestationLevel: InfestationLevel | "";
  locationArea: "bucuresti" | "ilfov" | "alta" | "";
  postalCode: string;
  dateChoice: string;
  customDate: string;
  photos: File[];
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

const initialState: FormState = {
  problem: "",
  propertyType: "",
  propertySize: "",
  infestationLevel: "",
  locationArea: "",
  postalCode: "",
  dateChoice: "",
  customDate: "",
  photos: [],
  name: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
};

function OptionGrid<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T | "";
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors",
            value === opt.value
              ? "border-brand bg-brand text-white"
              : "border-black/10 bg-white hover:border-brand/50"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function BookingStepper({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const canGoNext = (() => {
    switch (step) {
      case 1: return !!form.problem;
      case 2: return !!form.propertyType;
      case 3: return !!form.propertySize;
      case 4: return !!form.infestationLevel;
      case 5: return !!form.locationArea;
      case 6: return !!form.dateChoice && (form.dateChoice !== "Aleg altă dată" || !!form.customDate);
      case 7: return true;
      case 8: return !!form.name && !!form.phone && !!form.address;
      default: return false;
    }
  })();

  async function handleSubmit() {
    setStatus("submitting");
    try {
      const fd = new FormData();
      fd.append("serviceSlug", form.problem);
      fd.append("propertyType", form.propertyType);
      fd.append("propertySize", form.propertySize);
      fd.append("infestationLevel", form.infestationLevel);
      fd.append("city", form.locationArea);
      fd.append("postalCode", form.postalCode);
      fd.append(
        "preferredDate",
        form.dateChoice === "Aleg altă dată" ? form.customDate : form.dateChoice
      );
      fd.append("name", form.name);
      fd.append("phone", form.phone);
      fd.append("email", form.email);
      fd.append("address", form.address);
      fd.append("notes", form.notes);
      form.photos.forEach((file) => fd.append("photos", file));

      const res = await fetch("/api/bookings", { method: "POST", body: fd });
      if (!res.ok) throw new Error("request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-brand/20 bg-brand/5 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="font-heading text-xl font-bold">Cerere primită!</h3>
        <p className="text-foreground/70">
          Am primit solicitarea ta. Te contactăm în scurt timp pentru confirmarea programării.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl border border-black/10 bg-white p-5 sm:p-6", compact && "shadow-lg")}>
      <div className="mb-5 flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              i < step ? "bg-brand" : "bg-black/10"
            )}
          />
        ))}
      </div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand">
        Pas {step} din {TOTAL_STEPS}
      </p>

      {step === 1 && (
        <div>
          <h3 className="font-heading mb-4 text-lg font-bold">Ce problemă ai?</h3>
          <OptionGrid options={problemOptions} value={form.problem} onChange={(v) => update("problem", v)} />
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="font-heading mb-4 text-lg font-bold">Unde este problema?</h3>
          <OptionGrid options={propertyOptions} value={form.propertyType} onChange={(v) => update("propertyType", v)} />
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="font-heading mb-4 text-lg font-bold">Care este dimensiunea?</h3>
          <OptionGrid
            options={getSizeOptions(form.propertyType).map((v) => ({ value: v, label: v }))}
            value={form.propertySize}
            onChange={(v) => update("propertySize", v)}
          />
        </div>
      )}

      {step === 4 && (
        <div>
          <h3 className="font-heading mb-4 text-lg font-bold">Care este nivelul problemei?</h3>
          <OptionGrid options={infestationOptions} value={form.infestationLevel} onChange={(v) => update("infestationLevel", v)} />
        </div>
      )}

      {step === 5 && (
        <div>
          <h3 className="font-heading mb-4 text-lg font-bold">Unde ești localizat?</h3>
          <OptionGrid
            options={[
              { value: "bucuresti", label: "București" },
              { value: "ilfov", label: "Ilfov" },
              { value: "alta", label: "Altă localitate" },
            ]}
            value={form.locationArea}
            onChange={(v) => update("locationArea", v)}
          />
          <input
            type="text"
            placeholder="Cod poștal / localitate"
            value={form.postalCode}
            onChange={(e) => update("postalCode", e.target.value)}
            className="mt-4 w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none"
          />
        </div>
      )}

      {step === 6 && (
        <div>
          <h3 className="font-heading mb-4 text-lg font-bold">Când dorești intervenția?</h3>
          <OptionGrid
            options={dateOptions.map((v) => ({ value: v, label: v }))}
            value={form.dateChoice}
            onChange={(v) => update("dateChoice", v)}
          />
          {form.dateChoice === "Aleg altă dată" && (
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={form.customDate}
              onChange={(e) => update("customDate", e.target.value)}
              className="mt-4 w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none"
            />
          )}
        </div>
      )}

      {step === 7 && (
        <div>
          <h3 className="font-heading mb-2 text-lg font-bold">Ai poze cu problema?</h3>
          <p className="mb-4 text-sm text-foreground/60">Opțional — maximum 5 imagini (JPG, PNG, HEIC).</p>
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-black/15 px-4 py-8 text-center hover:border-brand/50">
            <Upload className="h-6 w-6 text-brand" />
            <span className="text-sm font-medium">Încarcă fotografii</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/heic"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []).slice(0, 5);
                update("photos", files);
              }}
            />
          </label>
          {form.photos.length > 0 && (
            <p className="mt-2 text-sm text-foreground/60">{form.photos.length} fișier(e) selectate</p>
          )}
        </div>
      )}

      {step === 8 && (
        <div className="space-y-3">
          <h3 className="font-heading mb-1 text-lg font-bold">Datele tale de contact</h3>
          <input
            type="text"
            placeholder="Nume complet"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Telefon"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none"
          />
          <input
            type="text"
            placeholder="Adresă"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none"
          />
          <textarea
            placeholder="Observații (opțional)"
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={3}
            className="w-full rounded-xl border-2 border-black/10 px-4 py-3 text-sm focus:border-brand focus:outline-none"
          />
        </div>
      )}

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">
          A apărut o eroare. Te rugăm încearcă din nou sau sună-ne direct.
        </p>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          className={cn(step === 1 && "invisible")}
        >
          <ChevronLeft className="h-4 w-4" /> Înapoi
        </Button>

        {step < TOTAL_STEPS ? (
          <Button type="button" disabled={!canGoNext} onClick={() => setStep((s) => s + 1)}>
            Continuă <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="button" disabled={!canGoNext || status === "submitting"} onClick={handleSubmit}>
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Se trimite...
              </>
            ) : (
              "Cere confirmarea programării"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
