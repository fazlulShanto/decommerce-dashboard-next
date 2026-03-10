import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    textFileUploader: f({
        text: {
            maxFileSize: "1MB",
            maxFileCount: 1,
        },
    })
        .middleware(async ({ req }) => {
            // TODO: Add proper auth check here
            return { uploadedBy: "dashboard-user" };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for:", metadata.uploadedBy);
            console.log("file url", file.ufsUrl);
            return { url: file.ufsUrl, key: file.key, name: file.name };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
