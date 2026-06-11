import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import Profil from "@/components/sections/Profil";
import MengapaTiska from "@/components/sections/MengapaTiska";
import Sejarah from "@/components/sections/Sejarah";

/* Beranda — urutan section sesuai docs/04.
   Fase 2 tahap 2: + Mengapa Tiska & Sejarah. Sisanya menyusul. */

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Profil />
        <MengapaTiska />
        <Sejarah />
      </main>
    </>
  );
}
