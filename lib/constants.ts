// Date de contact — actualizează cu valorile reale înainte de lansare.
export const SITE = {
  name: "Dezgandacitorul.ro",
  domain: "dezgandacitorul.ro",
  phone: "0700 000 000",
  phoneHref: "tel:+40700000000",
  whatsappNumber: "40700000000",
  email: "contact@dezgandacitorul.ro",
};

export const WHATSAPP_MESSAGE =
  "Bună ziua. Am o problemă cu dăunători și aș dori o evaluare.";

export function getWhatsappHref(message: string = WHATSAPP_MESSAGE) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
