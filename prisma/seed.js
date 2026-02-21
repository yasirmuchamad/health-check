import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function main(){
    const hashedPassword = await bcrypt.hash("Pass@123", 10);
    await prisma.user.create({
        data:{
            name: "Super Admin",
            email: "admin@mail.com",
            password: hashedPassword,
            role:"ADMIN"
        }
    });
    console.log("Admin User Created");
}

main()
    .catch(e=> {
        console.error(e);
        process.exit(1);
    })
    .finally(async() => {
        await prisma.$disconnect();
    });