import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserByEmail = query({
    args: {
        email: v.string()
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users")
            .filter((q) => q.eq(q.field('email'), args.email))
            .first();
        return user;
    }
});

export const getAllUsers = query({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query("users").collect();
        return users;
    }
});

export const updateUserUpgrade = mutation({
    args: {
        email: v.string(),
        upgrade: v.boolean()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query("users")
            .filter((q) => q.eq(q.field('email'), args.email))
            .first();

        if (result) {
            await ctx.db.patch(result._id, {
                upgrade: args.upgrade
            });
            return 'User upgrade status updated successfully';
        }

        return 'User not found';
    }
});

export const createUser = mutation({

    args: {
        userName: v.string(),
        email: v.string(),
        imageUrl: v.string()
    },

    handler: async (ctx, args) => {

        const user = await ctx.db.query("users").filter((q) => q.eq(q.field('email'), args.email)).collect();

        if (user?.length == 0) {

            await ctx.db.insert("users", {
                userName: args.userName,
                email: args.email,
                imageUrl: args.imageUrl,
                upgrade: false
            });

            return 'User created successfully';
        }

        return 'User already exists';
    }
})


export const GetUserInfo = query({
    args: {
        email: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        if (!args.email) {
            return null;
        }
        const result = await ctx.db.query("users")
            .filter((q) => q.eq(q.field('email'), args.email))
            .first();
        return result;
    }
});
