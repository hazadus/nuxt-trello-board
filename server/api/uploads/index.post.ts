import multer from "multer";
import { callNodeListener } from "h3";

export default defineEventHandler(async (event) => {
  const { uploadDir } = useRuntimeConfig();
  const fileNames: string[] = [];

  try {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadDir);
      },
      filename: function (req, file, cb) {
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

        fileNames.push(newFileName);
        cb(null, newFileName);
      },
    });

    const upload = multer({ storage: storage });

    // @ts-expect-error
    await callNodeListener(upload.single("file"), event.node.req, event.node.res);
    // @ts-ignore
    console.log("req.file:", event.node.req.file);
    /*
    board-web  | req.file: {
    board-web  |   fieldname: 'file',
    board-web  |   originalname: 'Patrick Chapin - Next Level Deckbuilding.pdf',
    board-web  |   encoding: '7bit',
    board-web  |   mimetype: 'application/pdf',
    board-web  |   destination: './public/uploads/',
    board-web  |   filename: 'Patrick Chapin - Next Level Deckbuilding-646580296.pdf',
    board-web  |   path: 'public/uploads/Patrick Chapin - Next Level Deckbuilding-646580296.pdf',
    board-web  |   size: 98578290
    board-web  | }
    */

    return {
      message: "File successfully uploaded.",
      files: fileNames,
    };
  } catch (e: any) {
    console.log("❌ Error uploading file:", e.message);
    throw createError({
      message: e.message,
    });
  }
});
