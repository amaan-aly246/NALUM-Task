import { User } from "@/types/types";

export const fetchUser = async ({
  email,
  getUser,
  setUser,
}: {
  email: string;
  getUser: (args: { variables: { email: string } }) => Promise<{ data: { name: string; email: string } }>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}): Promise<void> => {
  try {
    const response = await getUser({ variables: { email } });

    if (response && response.data) {
      const { name, email } = response.data;
      setUser({ name, email });
    } else {
      console.error("No user data found");
      setUser(null);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    setUser(null); 
  }
};
