import mongoose from "mongoose";

export default defineNitroPlugin((nitroApp) => {
  const { mongoDbAddress } = useRuntimeConfig();

  mongoose
    .connect(mongoDbAddress)
    .then(() => console.log(`Connected to MongoDB at "${mongoDbAddress}"`))
    .catch((e) =>
      console.log(
        `Can't connect to MongoDB at "${mongoDbAddress}"!`,
        "Reason:",
        e,
      ),
    );
});
