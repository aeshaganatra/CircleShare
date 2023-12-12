//import sanityClient from "@sanity/client";
//import { SanityClient } from "@sanity/client";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "6y5gqc2e",
  dataset: "production",
  apiVersion: "2021-11-16",
  useCdn: true,
  token:
    "skdWKTtxonfLUxeunJXD9Q3RsYuEpFWlNr0vQNOtmpDDI456PG8yhnG1EHcjr1z4pAmIwe9WZMTl7FKhuKKR1o5aReLOQRTMKwTqL0w6HN036WdwjWKJuyOp2mwStfDACQXRlfvEv3QP1Ivas4prgRSKNZETmBGCfJ06dJedQrIq5KI4dA6L",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
