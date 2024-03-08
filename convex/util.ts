import { ActionCtx, MutationCtx, QueryCtx } from './_generated/server.d';

export const getUserId = async (ctx: QueryCtx | MutationCtx | ActionCtx) =>{
    return (await ctx.auth.getUserIdentity())?.subject;
}

export const getUser = async (ctx: QueryCtx | MutationCtx | ActionCtx) =>{
    return await ctx.auth.getUserIdentity();
}