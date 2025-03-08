"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import userIcon from "@/public/assets/icons/user.svg";
import emailIcon from "@/public/assets/icons/email.svg";
import phoneIcon from "@/public/assets/icons/phone.svg";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { createUser } from "@/lib/actions/patient.actions";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  TEXTAREA = "textarea",
  SELECT = "select",
  DATE_PICKER = "calendar",
  SKELETON = "skeelton"
}

export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    console.log("onsunmittt");
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 ">
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconsSrc={userIcon}
          iconsAlt="userIcon"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email address"
          placeholder="examplexyz@gmail.com"
          iconsSrc={emailIcon}
          iconsAlt="emailIcon"
        />
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
