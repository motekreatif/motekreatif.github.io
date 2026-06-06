import { HeroSection } from "@/components/home/HeroSection";
import { CustomerJourney } from "@/components/home/CustomerJourney";
import { TrifectaMarketing } from "@/components/home/TrifectaMarketing";
import { PainPoints } from "@/components/home/PainPoints";
import { ServicesObjective } from "@/components/home/ServicesObjective";
import { CaseStudiesFeatured } from "@/components/home/CaseStudiesFeatured";
import { WhyMote } from "@/components/home/WhyMote";
import { ProductsPreview } from "@/components/home/ProductsPreview";
import { ClientsSection } from "@/components/home/ClientsSection";
import { CTASection } from "@/components/home/CTASection";


export default function Home() {
  return (
    <>
      <HeroSection />
      {/* dark → cream */}
      

      <CustomerJourney />
      {/* cream → dark */}
      

      <TrifectaMarketing />
      {/* dark → warm white */}
      

      <PainPoints />
      <ServicesObjective />
      <CaseStudiesFeatured />

      {/* warm white → dark */}
      

      <WhyMote />

      {/* dark → cream */}


      <ProductsPreview />
      <ClientsSection />

      {/* warm white → yellow */}
      

      <CTASection />
    </>
  );
}
