import { PrismaClient } from "@prisma/client";

console.log("Prisma client loaded");

const softDeleteExtension = {
    query: {
        $allModels:{
            async findMany({args, query}){
                if (args.where?.isDeleted === undefined){
                    args.where = {...args.where, isDeleted:false};
                }
                return query(args);
            }
        }
    }
};

export const prisma = new PrismaClient().$extends({softDeleteExtension});
    



// prisma.use(async (params, next) =>{
//     const softDeleteModelsa = ["User", "Patient", "HeealtCheck"];

//     if (softDeleteModels.includes(params.models)){
//         if (params.action === "findMany") {
//             params.args = params.args || {};
//             params.args.where ={
//                 ...params.args.where,
//                 isDeleted : false
//             };
//         }   
//         if (params.action === "findFirst"){
//             params.args.where = {
//                 ...params.args.where,
//                 isDeleted:false
//             };
//         }
//         if (params.action === "delete"){
//             params.action = "update";
//             params.args.data={
//                 isDeleted:true,
//                 deletedAt:new Date()
//             };
//         }
//     }
//     return next(params);
// });