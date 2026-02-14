 import prisma from '../config/prisma.js'
import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "project-management" });

// inngest function to sync user creation from clerk to our database
const  syncUserCreation = inngest.createFunction(
    {id:"sync-user-from-clerk"},
    {event:"clerk/user.created"},
    async ({event})=>{  
        const {data}= event
        await prisma.user.create({
             data:{
                id:data.id,
                email:data?.email_addresses[0]?.email_address,
                name:data.first_name+ " "+data.last_name,   
                image:data?.profile_image_url   
             }
        }) 
    }
)



// inngest function for user deletion from clerk to our database
const  syncUserDeletion = inngest.createFunction(
    {id:"delete-user-with-clerk"},
    {event:"clerk/user.deleted"},
    async ({event})=>{  
        const {data}= event
        await prisma.user.delete({

            where:{
                id:data.id,
            }
        }) 
    }
)


// Inngest function to update user data in database when user updates their profile in clerk

const  syncUserUpdation = inngest.createFunction(
    {id: "update-user-from-clerk"},
    {event:"clerk/user.updated"},
    async ({event})=>{  
        const {data}= event
        await prisma.user.update({

             where:{
                id:data.id,
                },
                data:{
                    email:data?.email_addresses[0]?.email_address,
                    name:data.first_name+ " "+data.last_name,   
                    image:data?.profile_image_url
             }
        }) 
    }
)






// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];