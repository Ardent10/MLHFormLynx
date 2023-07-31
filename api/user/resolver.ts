import { Collection, ObjectId } from "mongodb";
import { typeDefs } from "./typeDefs";
import { IUser } from "../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface ErrorResponse {
  message: string;
}

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  username?: string;
  dob?: string;
  email: string;
  location?: string;
  password: string;
}

interface UserInput {
  firstName?: string;
  lastName?: string;
  gender?: string;
  username?: string;
  dob?: string;
  email: string;
  location?: string;
  password: string;
}

interface SearchUserInput {
  keyword: string;
}

const userResolver = {
  Query: {
    getAccount: async (
      _parent: any,
      { id }: any,
      { usersCollection }: { usersCollection: Collection },
      _info: any
    ) => {
      try {
        const user = usersCollection.findOne({ _id: new ObjectId(id) });
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (err: any) {
        throw new Error(err.message);
      }
    },

    getUser: async (
      _parent: any,
      _args: any,
      { usersCollection }: { usersCollection: Collection },
      _info: any
    ) => {
      const { input } = _args;
      const user = await usersCollection.findOne({ _id: input.id });
      return user ? user : null;
    },

    users: async (
      _: any,
      __: any,
      { usersCollection }: { usersCollection: Collection }
    ) => {
      const users = await usersCollection.find({}).toArray();
      return users;
    },

    searchUser: async (
      _parent: any,
      { input }: { input: SearchUserInput },
      { usersCollection }: { usersCollection: Collection }
    ) => {
      try {
        const { keyword } = input;
        const regex = new RegExp(keyword, "i");
        const filteredUsers = await usersCollection
          .find({
            $or: [
              { firstName: regex },
              { lastName: regex },
              { username: regex },
              { email: regex },
            ],
          })
          .toArray();
        return { users: filteredUsers };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    signupUser: async (
      _parent: any,
      { input }: { input: UserInput },
      { usersCollection }: { usersCollection: Collection }
    ) => {
      try {
        const { password, ...userInput } = input;

        // Hash the password using bcryptjs
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser: User = {
          id: new ObjectId().toString(),
          password: hashedPassword,
          ...userInput,
        };

        await usersCollection.insertOne(newUser);
        return { user: newUser };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    verifyToken: async (
      _: any,
      { input }: { input: { token: string } },
      { usersCollection }: { usersCollection: Collection }
    ) => {
      try {
        const { token } = input;
        const user = await usersCollection.findOne({ token });
        if (user) {
          return { userId: user.id };
        }
      } catch (error) {
        throw new Error("Invalid token.");
      }
    },

    login: async (
      _: any,
      { input }: { input: { email: string; password: string } },
      { usersCollection }: { usersCollection: Collection }
    ) => {
      try {
        const { email, password } = input;
        const user = await usersCollection.findOne({ email });

        if (!user) {
          throw new Error("Wrong Credentials!");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Wrong Credentials!");
        }

        const accessToken = jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SEC_KEY!,
          { expiresIn: "3d" }
        );

        return { user, accessToken };
      } catch (err: any) {
        throw new Error(err.message);
      }
    },

    logOut: async (): Promise<boolean> => {
      return true;
    },
  },
};

export { userResolver };
