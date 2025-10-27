"use client";
import { useGlobalState } from "../../(blank-layout)/login/GlobalState";
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
import { useRouter } from "next/navigation"; 
export default function RegistrationForm() {
  const { username, setUsername, role, setRole, password, setPassword } =
    useGlobalState();
const router = useRouter();
  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    username: username,
    password: password,
    role: 1, // convert role string to number
  };

  try {
    const result = await apiRequest("api/Auth/register", {
      method: "POST",
      body: payload,
    });

    console.log("Registration successful:", result);
    router.push(`/main/`)
  } catch (error) {
    console.error("Error registering:", error);
  }
};

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="John Doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
           
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
             {/* <div className="grid gap-2">
              <Label htmlFor="role">role</Label>
              <Input
                id="role"
                type=""
                placeholder="admin or user"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div> */}
          </div>
          <CardFooter className="flex-col gap-2 mt-4">
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
