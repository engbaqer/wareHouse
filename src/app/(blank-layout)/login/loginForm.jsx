"use client";

// Using the same global state from the registration context
import { useGlobalState } from "./GlobalState";
import { useRouter } from "next/navigation"; // ✅ Import router

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/request";

export default function LoginForm() {
   const router = useRouter(); // ✅ Initialize router
  const { username, setUsername, password, setPassword } = useGlobalState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username,
      password,
    };

    try {
      const result = await apiRequest("api/Auth/login", {
        method: "POST",
        body: payload,
      });

      console.log("Login successful:", result);
      localStorage.setItem("headerStatus",2)
      // Save token if returned by backend
      if (result.token) {
        localStorage.setItem("jwt", result.token);
 router.push("/main/items"); // ✅ Navigate to /main/items after login
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
               onChange={(e) => {
  setUsername(e.target.value);
  console.log("Username:", e.target.value);
}}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <CardFooter className="flex-col gap-2 mt-4">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
