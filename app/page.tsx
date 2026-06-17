import { HeroSection } from "@/components/home/HeroSection";
import { PainPoints } from "@/components/home/PainPoints";
import { CaseStudiesFeatured } from "@/components/home/CaseStudiesFeatured";
import { TrifectaMarketing } from "@/components/home/TrifectaMarketing";
import { ServicesObjective } from "@/components/home/ServicesObjective";
import { WhyMote } from "@/components/home/WhyMote";
import { ClientsSection } from "@/components/home/ClientsSection";
import { StatsSection } from "@/components/home/StatsSection";
import { StartHere } from "@/components/home/StartHere";
import { CTASection } from "@/components/home/CTASection";


export default function Home() {
  return (
    <>
      <HeroSection />
      {/* yellow → cream — langsung relate dengan pain */}

      <PainPoints />

      {/* cream — bukti naik ke atas: "masalah kamu → ini hasil yang kami bikin" */}
      <CaseStudiesFeatured />

      {/* cream → dark — diferensiasi: bukan cuma ads */}
      <TrifectaMarketing />

      {/* dark → cream */}
      <ServicesObjective />

      {/* cream → dark — kenapa pilih Mote */}
      <WhyMote />

      {/* dark → cream — social proof volume */}
      <ClientsSection />
      <StatsSection />

      {/* cream — cocok untuk + 3 langkah mulai (prime konversi) */}
      <StartHere />

      {/* cream → yellow */}
      <CTASection />
    </>
  );
}
