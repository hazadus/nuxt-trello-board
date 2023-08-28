import { FileModel } from "@/server/models/File";
import { callNodeListener } from "h3";
import multer from "multer";

export default defineEventHandler(async (event) => {
  if (!isAuthenticated(event)) {
    throw createError({
      message: "User must be authenticated to upload files.",
      statusCode: 403,
      fatal: false,
    });
  }

  const { uploadDir } = useRuntimeConfig();
  let uploadedFile: Express.Multer.File;

  // 1. Save uploaded file to the file system
  try {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadDir);
      },
      filename: function (req, file, cb) {
        // Reference: Issue with UTF-8 characters in filename (this fixes cyrillic filenames)
        // https://github.com/expressjs/multer/issues/1104
        file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
        // Generate unique suffix for the file name, preserving the extension
        const fileNameSplit = file.originalname.split(".");
        let extension = "";

        if (fileNameSplit.length) extension = fileNameSplit[fileNameSplit.length - 1];

        const uniqueSuffix = "-" + Math.round(Math.random() * 1e9);
        const newFileName =
          (extension
            ? file.originalname.slice(0, file.originalname.length - extension.length - 1)
            : file.originalname) +
          uniqueSuffix +
          "." +
          extension;

        cb(null, newFileName);
      },
    });

    const upload = multer({ storage: storage });

    // Actually upload and store the file
    // @ts-expect-error
    await callNodeListener(upload.single("file"), event.node.req, event.node.res);
    // @ts-ignore
    uploadedFile = event.node.req.file;
    console.log("📦 uploadedFile:", uploadedFile);
  } catch (e: any) {
    console.log("❌ Error uploading file:", e.message);
    throw createError({
      message: e.message,
    });
  }

  // 2. Create File document in MongoDB for uploaded file
  try {
    const fileDocument = await FileModel.create({
      user: getAuthenticatedUser(event)!,
      originalName: uploadedFile.originalname,
      mimeType: uploadedFile.mimetype,
      fileName: uploadedFile.filename,
      size: uploadedFile.size,
    });

    console.log("✅ File document created:", fileDocument);

    return fileDocument;
  } catch (e: any) {
    console.log("❌ Error creating File document:", e.message);
    throw createError({
      message: e.message,
    });
  }
});
