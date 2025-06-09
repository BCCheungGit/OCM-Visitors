"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { use, useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { PhoneInput } from "@/components/ui/phoneinput";
import { TopNav } from "../_components/topnav";
import { signIn } from "next-auth/react";
import { createVerification } from "@/server/actions";

export default function SignInPage() {
  const router = useRouter();

  const { i18n, t } = useTranslation();

  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otpValue, setOtpValue] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { toast } = useToast();
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    if (otpSent) {
      await handleSignIn();
    } else {
      await handleSubmit(formData);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    const phoneNumber = formData.get("phone") as string;
    const res = await createVerification(phoneNumber);
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
      setSubmitting(false);
    }
  };

  const handleSignIn = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      phoneNumber: phoneNumber,
      otpValue: otpValue,
    });
    if (typeof res === "object" && res.error) {
      toast({
        title: "Verification Error",
        description: res.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Phone Number Verified",
        description: "You have successfully verified your phone number.",
      });
      router.push("/dashboard");
    }
  };

  return (
    <>
      <TopNav />
      <div className="min-w-screen flex flex-row justify-center items-center h-full">
        <div className="sm:w-fit w-[400px] flex mt-10 flex-col items-center border-2 p-8 gap-6 rounded-lg shadow-xl">
          <h1 className="sm:text-xl text-lg font-semibold">{t("sign_in")}</h1>
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            {!otpSent && (
              <div className="flex flex-col gap-6">
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
                    placeholder="Enter Phone Number"
                    name="phone"
                    value="+1"
                  />
                </div>
                <Button disabled={submitting} type="submit">
                  {t("sign_in")}
                </Button>
              </div>
            )}

            {otpSent && (
              <div className="flex flex-col gap-4">
                <div>
                  <Input type="hidden" name="phone" value={phoneNumber} />
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
            <p className="text-sm">{t("first_time")}</p>
            <Link
              href="/sign-up"
              className="text-sm text-purple-700 hover:text-purple-100"
            >
              {t("sign_up")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
