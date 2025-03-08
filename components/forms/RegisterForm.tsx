"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import userIcon from "@/public/assets/icons/user.svg";
import emailIcon from "@/public/assets/icons/email.svg";
import calendarIcon from "@/public/assets/icons/calendar.svg";
import phoneIcon from "@/public/assets/icons/phone.svg";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { createUser } from "@/lib/actions/patient.actions";
import { Label } from "@/components/ui/label";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOptions } from "@/constants";

export const RegisterForm = ({ user }: { user: User }) => {
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
      console.log("hey");
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <section className="personal-info flex flex-col space-y-6 relative">
          <h2 className="text-24-bold">Personal Information</h2>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="name"
            label="Full name"
            placeholder="John Doe"
            iconsSrc={userIcon}
            iconsAlt="userIcon"
          />
          <div className="gap-4 flex">
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="email"
                label="Email address"
                placeholder="examplexyz@gmail.com"
                iconsSrc={emailIcon}
                iconsAlt="emailIcon"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone number"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
          <div className="gap-4 flex">
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.DATE_PICKER}
                name="birthDate"
                label="Date of Birth"
                iconsSrc={calendarIcon}
                iconsAlt="calendarIcon"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name="gender"
                label="Gender"
                renderSkeleton={(field) => (
                  <FormControl>
                    <RadioGroup
                      className="flex h-11 gap-6 xl:justify-between"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {GenderOptions.map((option) => (
                        <div className="radio-group">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </div>
          </div>
          <div className="gap-4 flex">
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="address"
                label="Address"
                placeholder="ex: 14 street, New York, NY - 5101"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="occupation"
                label="Occupation"
                placeholder="Software Engineer"
              />
            </div>
          </div>
          <div className="gap-4 flex">
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="emergency_contact_name"
                label="Emergency contact name"
                placeholder="Guardian’s name"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="emergency_contact_number"
                label="Emergency contact number"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </section>
        <section className="personal-info flex flex-col space-y-6 relative">
          <h2 className="text-24-bold">Medical Information</h2>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="physician_name"
            label="Primary care physician"
            placeholder="John Doe"
            iconsSrc={userIcon}
            iconsAlt="userIcon"
          />
          <div className="gap-4 flex">
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="insurance_provider"
                label="Insurance provider"
                placeholder="ex: BlueCross "
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="insurance_number"
                label="Insurance policy number"
                placeholder="ex: ABC1234567"
              />
            </div>
          </div>
          <div className="gap-4 flex">
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="allergies"
                label="Allergies(if any)"
                placeholder="ex: Peanuts, Penicillin, Pollen"
                iconsSrc={emailIcon}
                iconsAlt="emailIcon"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="medications"
                label="Current Medications"
                placeholder="ex: Ibuprofen 200mg"
              />
            </div>
          </div>
          <div className="gap-4 flex">
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="family_medical_history"
                label="Family medical history (if relevant)"
                placeholder="ex: Mother had breast cancer"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="medical_history"
                label="Past medical history"
                placeholder="ex: Asthma diagnosis in childhood"
              />
            </div>
          </div>
        </section>
        <section className="personal-info flex flex-col space-y-6 relative">
          <h2 className="text-24-bold">Identification and Verification</h2>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="identification_type"
            label="Identification type"
            placeholder="John Doe"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="identification_number"
            label="Identification Number"
            placeholder="ex 123456"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="document_upload"
            label="Scanned Copy of Identification Document"
            placeholder="Document"
          />
        </section>
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
