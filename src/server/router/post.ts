import { z } from "zod";
import { publicProcedure, router } from "..";

const create = publicProcedure
  .input(z.object({ title: z.string(), content: z.string() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.db
      .insertInto("posts")
      .values({
        title: input.title,
        content: input.content,
        author_id: 1,
      })
      .executeTakeFirst();
    return true;
  });

const getById = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    return ctx.db
      .selectFrom("posts")
      .selectAll()
      .where("id", "=", input)
      .execute();
  });

const list = publicProcedure.query(async ({ ctx }) => {
  return ctx.db.selectFrom("posts").selectAll().execute();
});

export const postRouter = router({ create, list, getById });
