import createApp from "./application";
const app = createApp();
const port = process.env.PORT;

app.listen(port, (err) => {
  if (err)
    return console.error(
      `⚠️ Error connecting to server on port ${port}\n`,
      err
    );

  console.log(`☁️ Server connected to port: http://localhost:${port}`);
});
