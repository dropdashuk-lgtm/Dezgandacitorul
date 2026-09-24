export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
}

// Master Plan §22 — Ghiduri SEO
export const guides: Guide[] = [
  {
    slug: "cum-iti-dai-seama-daca-ai-plosnite",
    title: "Cum îți dai seama dacă ai ploșnițe",
    excerpt: "Semnele timpurii ale unei infestări cu ploșnițe și cum le deosebești de alte insecte.",
    content: [
      "Ploșnițele lasă urme specifice: mușcături grupate sau în linie, de obicei pe zonele expuse ale pielii în timpul somnului.",
      "Pe saltea sau cearșaf pot apărea pete mici, roșiatice sau maronii — resturi de sânge sau excremente.",
      "În cusăturile saltelei sau în spatele tăbliei patului pot fi vizibile ouă albicioase sau cochilii.",
      "Dacă observi oricare dintre aceste semne, cea mai sigură confirmare este o evaluare profesională — poți trimite și o fotografie pentru un diagnostic inițial.",
    ],
  },
  {
    slug: "de-unde-apar-plosnitele",
    title: "De unde apar ploșnițele",
    excerpt: "Cele mai frecvente surse de infestare și cum poți reduce riscul.",
    content: [
      "Cel mai frecvent, ploșnițele ajung în locuință prin bagaje, haine sau mobilier second-hand.",
      "Un alt caz frecvent este migrarea din apartamente vecine infestate, prin instalații sau spații comune.",
      "Verifică bagajele după călătorii și inspectează mobilierul second-hand înainte de a-l aduce în casă.",
    ],
  },
  {
    slug: "cum-scapi-de-plosnite",
    title: "Cum scapi de ploșnițe",
    excerpt: "Pașii unui tratament eficient împotriva ploșnițelor.",
    content: [
      "Un tratament eficient începe cu o evaluare corectă a nivelului de infestare.",
      "Urmează pregătirea camerei conform instrucțiunilor primite, apoi primul tratament profesional.",
      "Recomandăm monitorizare și, în majoritatea cazurilor, un al doilea tratament pentru eliminare completă.",
    ],
  },
  {
    slug: "de-ce-reapar-gandacii",
    title: "De ce reapar gândacii",
    excerpt: "Cauzele frecvente ale reinfestării și cum le previi.",
    content: [
      "Gândacii reapar de obicei din cauza surselor de hrană și apă rămase accesibile.",
      "Infestările din apartamentele vecine sau spațiile comune pot readuce problema, chiar și după un tratament corect.",
      "Sigilarea punctelor de acces și igienizarea constantă reduc semnificativ riscul de recidivă.",
    ],
  },
  {
    slug: "ce-atrage-gandacii-in-apartament",
    title: "Ce atrage gândacii în apartament",
    excerpt: "Factorii care favorizează apariția gândacilor.",
    content: [
      "Resturile alimentare lăsate la vedere sunt principala sursă de atracție pentru gândaci.",
      "Umezeala din bucătărie și baie creează un mediu favorabil dezvoltării lor.",
      "Ambalajele de carton stocate mult timp pot deveni ascunzători și locuri de reproducere.",
    ],
  },
  {
    slug: "cum-identifici-urmele-de-soareci",
    title: "Cum identifici urmele de șoareci",
    excerpt: "Semnele care indică prezența rozătoarelor în locuință.",
    content: [
      "Excrementele mici și alungite, de regulă în cămară sau pod, sunt cel mai clar semn.",
      "Zgomotele din pereți sau plafon, mai ales noaptea, indică frecvent activitate de rozătoare.",
      "Urmele de roadere pe cabluri sau ambalaje sunt un alt indiciu important.",
    ],
  },
  {
    slug: "diferenta-dintre-deratizare-si-dezinsectie",
    title: "Diferența dintre deratizare și dezinsecție",
    excerpt: "Ce presupune fiecare serviciu și când ai nevoie de ele.",
    content: [
      "Deratizarea vizează rozătoarele (șoareci, șobolani) și presupune de regulă stații de intoxicare și monitorizare.",
      "Dezinsecția vizează insectele (gândaci, furnici, ploșnițe, țânțari etc.) și folosește tratamente specifice fiecărei specii.",
      "În multe cazuri, mai ales la firme și spații agricole, cele două servicii sunt combinate într-un plan comun.",
    ],
  },
  {
    slug: "ce-trebuie-facut-inainte-de-dezinsectie",
    title: "Ce trebuie făcut înainte de dezinsecție",
    excerpt: "Checklist de pregătire pentru o intervenție eficientă.",
    content: [
      "Eliberează accesul în zonele afectate și în spatele mobilierului, acolo unde este posibil.",
      "Spală textilele indicate de tehnician, conform instrucțiunilor primite.",
      "Nu muta obiectele din zona infestată în alte camere, pentru a evita răspândirea problemei.",
    ],
  },
  {
    slug: "ce-trebuie-facut-dupa-dezinsectie",
    title: "Ce trebuie făcut după dezinsecție",
    excerpt: "Recomandări pentru perioada de după tratament.",
    content: [
      "Respectă timpul de așteptare recomandat înainte de a reveni în zona tratată.",
      "Aerisește spațiul conform instrucțiunilor primite de la tehnician.",
      "Monitorizează zona în perioada următoare și anunță-ne dacă observi în continuare activitate.",
    ],
  },
  {
    slug: "cum-protejezi-un-restaurant-de-daunatori",
    title: "Cum protejezi un restaurant de dăunători",
    excerpt: "Bune practici pentru spații HoReCa.",
    content: [
      "Un plan de inspecție periodică reduce semnificativ riscul unei infestări active.",
      "Depozitarea corectă a materiilor prime și igienizarea constantă a zonelor de lucru sunt esențiale.",
      "Recomandăm un contract recurent, cu raport lunar și reminder automat pentru vizitele următoare.",
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find((g) => g.slug === slug);
}
