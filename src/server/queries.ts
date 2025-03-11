import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";





export async function checkAdmin(userId: string) {
    const prisma = new PrismaClient();
    const res = await prisma.visitors_master.findFirst({
        where: {
            id: userId
        }
    })
    await prisma.$disconnect();
    if (!res) {
        await prisma.$disconnect();
        console.error('User not found');
        return { error: 'User not found' };
    }
    if (res.role == 'admin') {
        return { admin: true }
    } else {
        return { admin: false }
    }
}


export async function deleteUser(userId: string) {
    const prisma = new PrismaClient();

    try {
        await prisma.visitors_master.delete({
            where: {
                id: userId
            },
        })
    } catch (e: any) {
        await prisma.$disconnect();
        console.error(e);
        process.exit(1);
    }
    await prisma.$disconnect();
}