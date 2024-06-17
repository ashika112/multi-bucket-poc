import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "multiBucketPoc",
  access: (allow) => ({
    "media/*": [allow.guest.to(["read", "write", "delete"])],
    "shared/{entity_id}/*": [
      allow.guest.to(["read", "write", "delete"]),
      allow.authenticated.to(["read", "write", "delete"]),
    ],
  }),
});
