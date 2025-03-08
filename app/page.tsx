import onBoardingImage from "@/public/assets/images/onboarding-img.png";
import { PatientForm } from "@/components/forms/PatientForm";
import CustomPageComponent from "@/components/PageLayout";

export default function Home() {
  return (
    <main className="w-screen relative h-screen max-h-screen font-sans">
      <CustomPageComponent imgUrl={onBoardingImage.src} title="Hii There, ..." subTitle="Get started to Appointments">
        <PatientForm/>
      </CustomPageComponent>
    </main>
  );
}
