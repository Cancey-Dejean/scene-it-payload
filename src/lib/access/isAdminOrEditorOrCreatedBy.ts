import { User } from "@/payload-types";

export const isAdminOrEditorOrCreatedBy = ({
  req: { user },
}: {
  req: { user: User | null };
}) => {
  // Check if user has the 'admin' or 'editor' role
  if (user && (user.role === "admin" || user.role === "editor")) {
    return true;
  }

  // Allow only documents with the current user set to the 'createdBy' field
  if (user) {
    return {
      createdBy: {
        equals: user.id,
      },
    };
  }

  // Disallow all others
  return false;
};
