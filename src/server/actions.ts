"use server";

import { PrismaClient } from "@prisma/client";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const service = process.env.TWILIO_SERVICE_SID || "";

function formatPhoneNumber(phone: string): string {
  // force the phone number to be in the USA

  const cleaned = phone.replace(/[()]/g, "").replace(/-/g, " ");

  if (phone.startsWith("+1")) {
    return cleaned;
  } else {
    return `+1 ${cleaned}`;
  }
}
export async function createVerification(phone: string) {
  console.log(service);
  if (!phone) {
    return { error: "Phone number is required" };
  }
  const formattedPhone = formatPhoneNumber(phone);
  const client = twilio(accountSid, authToken);
  const verification = await client.verify.v2
    .services(service)
    .verifications.create({
      channel: "sms",
      to: formattedPhone,
    });
  return JSON.stringify({ verification });
}

export async function signUp(phone: string, code: string, formInfo: any) {
  const client = twilio(accountSid, authToken);

  const formattedPhone = formatPhoneNumber(phone);
  if (!phone || !code) {
    return { error: "Phone number and code are required" };
  }
  const verificationCheck = await client.verify.v2
    .services(service)
    .verificationChecks.create({
      to: formattedPhone,
      code: code,
    });

  if (verificationCheck.status == "approved") {
    const prisma = new PrismaClient();
    const user = await prisma.visitors_master.findFirst({
      where: {
        phonenumber: formattedPhone,
      },
    });
    if (user) {
      await prisma.$disconnect();
      return { error: "User already exists" };
    }

    let newid = Math.floor(100000000 + Math.random() * 900000000).toString();
    let existingUser = await prisma.visitors_master.findFirst({
      where: {
        id: newid,
      },
    });

    while (existingUser) {
      newid = Math.floor(100000000 + Math.random() * 900000000).toString();
      existingUser = await prisma.visitors_master.findFirst({
        where: {
          id: newid,
        },
      });
    }

    const res = await prisma.visitors_master.create({
      data: {
        id: newid,
        firstname: formInfo.firstname as string,
        lastname: formInfo.lastname as string,
        phonenumber: formattedPhone,
        created_at: new Date().toISOString(),
        last_signed_in: new Date().toISOString(),
        events: "",
        active: true,
        role: "visitor",
      },
    });
    await prisma.$disconnect();
    return JSON.stringify({ res });
  } else {
    throw new Error("Verification failed");
  }
}

export async function deleteUser(userId: string) {
  const prisma = new PrismaClient();

  try {
    await prisma.visitors_master.delete({
      where: {
        id: userId,
      },
    });
  } catch (e: any) {
    await prisma.$disconnect();
    console.error(e);
    process.exit(1);
  }
  await prisma.$disconnect();
}

export async function checkImage(uuid: string) {
  const prisma = new PrismaClient();
  const user = await prisma.visitors_master.findFirst({
    where: {
      id: uuid,
    },
  });
  await prisma.$disconnect();
  if (!user) {
    return false;
  }
  if (user.image) {
    return true;
  }
  return false;
}

export async function updateImage(uuid: string | undefined, image: string) {
  const prisma = new PrismaClient();
  const user = await prisma.visitors_master.findFirst({
    where: {
      id: uuid,
    },
  });
  if (!user) {
    return { error: "User not found" };
  }
  await prisma.visitors_master.update({
    where: {
      id: uuid,
    },
    data: {
      image: image,
    },
  });
  await prisma.$disconnect();
  return JSON.stringify({ success: "Image updated" });
}

export async function fetchData(uuid: string) {
  if (!uuid) {
    return { error: "Uuid Not Provided" };
  }

  const prisma = new PrismaClient();
  const user = await prisma.visitors_master.findFirst({
    where: {
      id: uuid,
    },
  });
  await prisma.$disconnect();
  if (!user) {
    return { error: "User Not Found" };
  }
  return JSON.stringify({ user });
}

export async function isAdmin(uuid: string) {
  if (!uuid) {
    return false;
  }
  const prisma = new PrismaClient();
  const user = await prisma.visitors_master.findFirst({
    where: {
      id: uuid,
    },
  });
  await prisma.$disconnect();
  if (!user) {
    return false;
  }
  if (user.role === "admin") {
    return true;
  }
  return false;
}

export async function fetchAllVisitors() {
  const prisma = new PrismaClient();
  const users = await prisma.visitors_master.findMany();
  await prisma.$disconnect();
  return JSON.stringify(users);
}

export async function manualCheckIn(formData: any) {
  const firstName = formData.firstname as string;
  const lastName = formData.lastname as string;
  const photo = formData.url as string;

  const prisma = new PrismaClient();
  try {
    let newid = Math.floor(100000000 + Math.random() * 900000000).toString();
    let existingUser = await prisma.visitors_master.findFirst({
      where: {
        id: newid,
      },
    });

    while (existingUser) {
      newid = Math.floor(100000000 + Math.random() * 900000000).toString();
      existingUser = await prisma.visitors_master.findFirst({
        where: {
          id: newid,
        },
      });
    }

    await prisma.visitors_master.create({
      data: {
        id: newid,
        firstname: firstName,
        lastname: lastName,
        phonenumber: "",
        created_at: new Date().toISOString(),
        last_signed_in: new Date().toISOString(),
        events: "",
        active: true,
        role: "visitor",
        image: photo,
      },
    });
    return {
      message: `Successfully registered visitor with id: ${newid}`,
    };
  } catch (error) {
    console.error(error);
    return { error: "There was an error checking in visitor" };
  }
}
