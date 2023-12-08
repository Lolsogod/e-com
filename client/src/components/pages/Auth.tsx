import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

export const Auth = () => {
  //todo: rhf зачекать?
  const register = trpc.user.register.useMutation();
  const login = trpc.user.login.useMutation();
  const check = trpc.user.checkAuth.useQuery()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    register.mutate({
      email,
      password,
    });
  };
  const handleLogin =  async () => {
    login.mutateAsync({
      email,
      password,
    }).then((res) => {
      localStorage.setItem("token", "Bearer " + res);
    });
  };
  const handleCheck =  async () => {
    check.refetch()
  };
  return (
    <>
      <div className="flex flex-col gap-5 w-full max-w-sm m-auto items-center justify-center h-screen">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <Button type="submit" onClick={handleRegister}>
          register
        </Button>
        <Button type="submit" onClick={handleLogin}>
          login
        </Button>
        <Button type="submit" onClick={handleCheck}>
          check
        </Button>
      </div>
    </>
  );
};
