import Link from "next/link";
import { SignOutButton } from "@/components/auth/sign-out-button";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/preturi", label: "Prețuri" },
  { href: "/admin/clienti", label: "Clienți" },
  { href: "/admin/cereri", label: "Cereri urgente" },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <nav className="flex flex-wrap gap-4">
            {adminNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-foreground/70 hover:text-brand">
                {item.label}
              </Link>
            ))}
          </nav>
          <SignOutButton redirectTo="/admin/login" />
        </div>
      </div>
      {children}
    </div>
  );
}
