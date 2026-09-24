import type { Metadata } from "next";
import { BookingStepper } from "@/components/booking/booking-stepper";

export const metadata: Metadata = {
  title: "Programare intervenție",
  description: "Programează online o intervenție de deratizare, dezinsecție sau dezinfecție în câțiva pași simpli.",
};

export default function ProgramarePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">Programează intervenția</h1>
        <p className="mt-3 text-foreground/70">
          Completează câțiva pași simpli — te contactăm pentru confirmare.
        </p>
      </div>
      <div className="mt-8">
        <BookingStepper />
      </div>
    </div>
  );
}
