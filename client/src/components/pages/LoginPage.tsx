import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/utils/trpc";
import { FieldValues, useForm } from "react-hook-form";

const LoginPage = () => {
  const login = trpc.user.login.useMutation();
  const { register, handleSubmit } = useForm();

  const onSubmitLogin = async (data: FieldValues) => {
    console.log(data);
    const res = await login.mutateAsync({
      email: data.email,
      password: data.password,
    });
    localStorage.setItem("token", "Bearer " + res);
  };

  return (
    <>
      <div className="flex flex-col gap-10 max-w-md m-auto  ">
        <form onSubmit={handleSubmit(onSubmitLogin)}>
          <div className="flex flex-col gap-2  ">
            <Input {...register("email")} type="email" placeholder="Email" />
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            <Button type="submit">Войти</Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default LoginPage;
