"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconsAlt?: string;
  iconsSrc?: string;
  fieldType: FormFieldType;
  disabled?: boolean;
  date?: Date;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}
const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, placeholder, iconsAlt, iconsSrc, date } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconsSrc && (
            <Image
              src={iconsSrc}
              alt={iconsAlt || "icon"}
              className="ml-2"
              height={24}
              width={24}
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="IN"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-input border-0"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <FormControl>
          <Popover>
            <PopoverTrigger asChild>
              <Button
              variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal shad-input",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                {field.value ? <p className="text-white">{format(new Date(field.value), "PPP")}</p> : <span className="text-dark-600">Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-dark-400">
              <Calendar
                mode="single"
                initialFocus
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date)=> field.onChange(date)}
              />
            </PopoverContent>
          </Popover>
        </FormControl>
      );
    default:
      break;
  }
};

export default function CustomFormField(props: CustomProps) {
  const { control, name, fieldType, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
}
