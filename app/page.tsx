import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import Profil from "@/components/sections/Profil";

/* Beranda — urutan section sesuai docs/04.
   Fase 2 tahap 1: Nav + Hero + Profil. Section berikutnya menyusul. */

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Profil />
      </main>
    </>
  );
}
