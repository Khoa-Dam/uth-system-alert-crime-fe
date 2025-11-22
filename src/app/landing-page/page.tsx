import { Features } from "./components/features";
import { Hero } from "./components/hero";
import { IconCloudShowcase } from "./components/icon-cloud-showcase";
import { Stats } from "./components/stats";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <Stats />
      <IconCloudShowcase />
      <Features />
    </div>
  );
}
