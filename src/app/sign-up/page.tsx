"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

import { PhoneInput } from "../../components/ui/phoneinput";
import { TopNav } from "../_components/topnav";
import { createVerification, signUp } from "@/server/actions";
import { signIn } from "next-auth/react";
import { useTranslation } from "react-i18next";

export default function SignUpPage() {
  const router = useRouter();

  const [otpSent, setOtpSent] = useState<boolean>(false);

  const [otpValue, setOtpValue] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const { t, i18n } = useTranslation();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    if (otpSent) {
      await handleSignUp();
    } else {
      await handleSubmit(formData);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    console.log("signing up");
    const phoneNumber = formData.get("phone") as string;
    const res = await createVerification(phoneNumber);
    console.log(res);
    if (typeof res === "object" && res.error) {
      toast({
        title: "Sign Up Error",
        description: res.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sent a code to: " + phoneNumber,
        description: "Please enter the code to verify your phone number.",
        variant: "default",
      });
      setOtpSent(true);
      setPhoneNumber(phoneNumber);
      setFirstName(formData.get("firstname") as string);
      setLastName(formData.get("lastname") as string);
    }
    setSubmitting(false);
  };

  const handleSignUp = async () => {
    console.log("verifying otp");

    try {
      await signUp(phoneNumber, otpValue, {
        firstname: firstName,
        lastname: lastName,
        phone: phoneNumber,
      });

      const result = await signIn("credentials", {
        redirect: false,
        phoneNumber,
        otpValue,
        signup: true,
      });

      if (result?.error) {
        console.error("SignIn Error:", result.error);
        toast({
          title: "Sign In Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        router.push("/dashboard");
      }
    } catch (e) {
      console.error("SignUp Exception:", e);
      toast({
        title: "Sign Up Error",
        description: "An error occurred while signing up.",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <TopNav />
      <div className="min-w-screen flex flex-col justify-center items-center h-full">
        <div className="sm:w-fit w-[400px] flex mt-10 flex-col items-center border-2 p-8 gap-6 rounded-lg shadow-xl">
          <h1 className="sm:text-xl text-lg font-semibold">{t("sign_up")}</h1>
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            {!otpSent && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="firstname"
                      className="sm:text-sm text-xs"
                      aria-required
                    >
                      {t("first_name")}
                    </label>
                    <Input required type="text" name="firstname" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="lastname"
                      className="sm:text-sm text-xs"
                      aria-required
                    >
                      {t("last_name")}
                    </label>
                    <Input required type="text" name="lastname" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="sm:text-sm text-xs"
                    aria-required
                  >
                    {t("phone_number")}
                  </label>
                  <PhoneInput
                    required
                    name="phone"
                    placeholder="Enter phone number"
                    value="+1"
                  />
                </div>
                <Button type="submit" disabled={submitting}>
                  {t("sign_up")}
                </Button>
              </div>
            )}

            {otpSent && (
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="otp" className="sm:text-base text-sm">
                    OTP
                  </label>
                  <InputOTP
                    required
                    name="otp"
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={otpValue}
                    onChange={(value) => setOtpValue(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Button type="submit" disabled={submitting}>
                  Verify
                </Button>
              </div>
            )}
          </form>
          <div className="p-2 border-2 rounded-lg shadow-lg h-full flex flex-row items-center justify-center gap-4 w-full">
            <p className="text-sm">{t("already_have")} </p>
            <Link
              href="/sign-in"
              className="text-sm text-purple-700 hover:text-purple-100"
            >
              {t("sign_in")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
