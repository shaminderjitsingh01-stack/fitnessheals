import handleRequest from './dist/server/index.js';

export default {
  async fetch(request, env, ctx) {
    try {
      return await handleRequest(request, {
        env,
        context: ctx,
        waitUntil: ctx.waitUntil.bind(ctx),
      });
    } catch (error) {
      console.error('Worker error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
