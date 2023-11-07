import mongoose from "mongoose";
import { UserModel } from "@/server/models/User";

export default defineNitroPlugin(async (nitroApp) => {
  const { mongoDbAddress } = useRuntimeConfig();

  mongoose
    .connect(mongoDbAddress)
    .then(() => console.log(`🔌 Connected to MongoDB at "${mongoDbAddress}"`))
    .catch((e) => console.log(`❌ Can't connect to MongoDB at "${mongoDbAddress}"!`, "Reason:", e));

    /**
     * This is to avoid `Schema hasn't been registered for model "User".Use mongoose.model(name, schema)`
     * error after server restart.
     */
    const users = await UserModel.find();
    console.log(users);
});
