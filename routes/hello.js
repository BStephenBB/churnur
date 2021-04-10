export default async function hello(app, options) {
  app.get("/", async () => {
    return { hello: "world!" };
  });
}
