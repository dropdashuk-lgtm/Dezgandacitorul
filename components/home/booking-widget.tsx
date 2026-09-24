import { BookingStepper } from "@/components/booking/booking-stepper";

export function BookingWidget() {
  return (
    <section className="mx-auto -mt-10 max-w-3xl px-4 sm:-mt-14">
      <BookingStepper compact />
    </section>
  );
}
