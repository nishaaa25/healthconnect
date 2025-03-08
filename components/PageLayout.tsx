import Image from "next/image";
import Link from "next/link";
import { PatientForm } from "./forms/PatientForm";
import logo from "@/public/assets/icons/logo.png";

interface CustomProps {
  children: React.ReactNode;
  imgUrl?: string;
  title?:any;
  subTitle?:string
}

export default function CustomPageComponent(props: CustomProps) {
  return (
    <div className="w-full h-full flex relative">
      <section className="remove-scrollbar container my-auto w-1/2">
        <div className="sub-container max-w-xl flex h-full relative gap-12 ">
          <div className="logo flex items-center gap-3">
            <Image src={logo} alt="logo" width={40} height={40} />
            <span className="text-24-bold">HealthConnect</span>
          </div>
          <div className="form flex gap-7 flex-col relative">
            <div>
              <h1 className="header">{props?.title}</h1>
              <p className="text-lg mt-2 text-dark-700">
                {props?.subTitle}
              </p>
            </div>
            {props.children}
          </div>
          <div className="w-full relative flex-between">
            <p className="text-dark-600">&#169;healthconnect copyright</p>
            <Link href="/" className="text-green-500 text-14-medium">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <div className="w-1/2 h-full relative">
        <Image
          src={props.imgUrl || "/"}
          alt="doctor"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
