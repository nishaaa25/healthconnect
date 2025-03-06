import { Button } from "@/components/ui/button";
import Image from "next/image";
import onBoardingImage from "@/public/assets/images/onboarding-img.png";
import logo from "@/public/assets/icons/logo.png";
import { PatientForm } from "@/components/forms/PatientForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex w-screen h-screen max-h-screen font-sans">
      <section className="remove-scrollbar container my-auto w-1/2">
        <div className="sub-container max-w-md h-full relative gap-12 ">
          <div className="logo flex items-center  gap-3">
            <Image src={logo} alt="logo" width={40} height={40} />
            <span className="text-24-bold">HealthConnect</span>
          </div>
          <div className="form flex gap-7 flex-col relative">
            <div>
              <h1 className="header">Hi there, ....</h1>
              <p className="text-lg mt-2 text-dark-700">
                Get started with Appointments.
              </p>
            </div>
            <PatientForm />
          </div>
          <div className="w-full relative flex-between">
            <p className="text-dark-600">&#169;healthconnect copyright</p>
            <Link href="/" className="text-green-500 text-14-medium">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <div className="w-1/2 relative">
        <Image
          src={onBoardingImage}
          alt="doctor"
          fill
          className="object-cover"
        />
      </div>
    </main>
  );
}
