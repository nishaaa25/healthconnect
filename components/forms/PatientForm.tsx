"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import userIcon from "@/public/assets/icons/user.svg";
import emailIcon from "@/public/assets/icons/email.svg";
import phoneIcon from "@/public/assets/icons/phone.svg";

export enum FormFieldType {
    INPUT = 'input',
    CHECKBOX = 'checkbox',
    PHONE_INPUT = "phoneInput"
}

const formSchema = z.object({
  username: z.string().min(10, {
    message: "Username must be at least 10 characters.",
  }),
})

export function PatientForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="Name" label="Full name" placeholder="John Doe" iconsSrc={userIcon} iconsAlt="userIcon"/>
        <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="Email" label="Email address" placeholder="examplexyz@gmail.com" iconsSrc={emailIcon} iconsAlt="emailIcon"/>
        <CustomFormField control={form.control} fieldType={FormFieldType.PHONE_INPUT} name="Contact" label="Phone number" placeholder="+00 0342 82838" iconsSrc={phoneIcon} iconsAlt="phoneIcon"/>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
