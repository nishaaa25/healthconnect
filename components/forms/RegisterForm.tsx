"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import userIcon from "@/public/assets/icons/user.svg";
import emailIcon from "@/public/assets/icons/email.svg";
import phoneIcon from "@/public/assets/icons/phone.svg";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { SelectItem } from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants";
import Image from "next/image";
import FileUploader from "../FileUploader";

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
        <section className="personal-info flex flex-col space-y-4 relative">
          <h2 className="text-24-bold mb-2">Personal Information</h2>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="name"
            label="Full name"
            placeholder="John Doe"
            iconsSrc={userIcon}
            iconsAlt="userIcon"
          />
          <div className="gap-6 flex flex-col lg:flex-row">
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
          <div className="gap-6 flex flex-col lg:flex-row">
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.DATE_PICKER}
                name="birthDate"
                label="Date of Birth"
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
                      className="flex h-11 gap-4 xl:justify-between"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {GenderOptions.map((option) => (
                        <div className="radio-group" key={option}>
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
          <div className="gap-6 flex flex-col lg:flex-row">
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
          <div className="gap-6 flex flex-col lg:flex-row">
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="emergencyContactName"
                label="Emergency contact name"
                placeholder="Guardian’s name"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="emergencyContactNumber"
                label="Emergency contact number"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </section>
        <section className="personal-info flex flex-col space-y-4 relative">
          <h2 className="text-24-bold mb-2">Medical Information</h2>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="primaryPhyisician"
            label="Primary care physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor) => (
              <SelectItem value={doctor.name} key={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={30}
                    height={30}
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          <div className="gap-6 flex flex-col lg:flex-row">
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="insuranceProvider"
                label="Insurance provider"
                placeholder="ex: BlueCross "
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insurancePolicyNumber"
                label="Insurance policy number"
                placeholder="ex: ABC1234567"
              />
            </div>
          </div>
          <div className="gap-6 flex flex-col lg:flex-row">
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
                name="currentMedication"
                label="Current Medications"
                placeholder="ex: Ibuprofen 200mg"
              />
            </div>
          </div>
          <div className="gap-6 flex flex-col lg:flex-row">
            <div className="flex-1">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="familyMedicalHistory"
                label="Family medical history (if relevant)"
                placeholder="ex: Mother had breast cancer"
              />
            </div>
            <div className="flex-1">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="pastMedicalHistory"
                label="Past medical history"
                placeholder="ex: Asthma diagnosis in childhood"
              />
            </div>
          </div>
        </section>
        <section className="personal-info flex flex-col space-y-4 relative">
          <h2 className="text-24-bold mb-2">Identification and Verification</h2>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="identificationType"
            label="Identification type"
            placeholder="John Doe"
          >
            {IdentificationTypes.map((type, index) => (
              <SelectItem value={type} key={index}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="identificationNumber"
            label="Identification Number"
            placeholder="ex 123456"
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>
        <section className="consent flex flex-col space-y-4 relative">
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />
            <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health information for treatment purposes."
          />
            <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the privacy policy"
          />
        </section>
        <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
      </form>
    </Form>
  );
};
