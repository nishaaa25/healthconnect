import Image from "next/image";
import logo from "@/public/assets/icons/logo.png";
import CustomPageComponent from "@/components/PageLayout";
import registerImage from "@/public/assets/images/register-img.png";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";

export default async  function RegisterPage({params} : SearchParamProps ) {
  const {userId} = await params;
  const user = await getUser(userId);

  const userName = (name: string) =>{
    const firstName = name.split(' ')[0];
    return firstName;
  }

  return (
    <div className="w-screen h-screen overflow-x-hidden relative">
      <CustomPageComponent imgUrl={registerImage.src} title={`Welcome ${userName(user.name)}👋 ,`}  subTitle="Let us know more about yourself">
        <RegisterForm user={user}/>
      </CustomPageComponent>
    </div>
  );
}
