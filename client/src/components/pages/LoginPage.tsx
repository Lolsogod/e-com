import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/store/useAuth";
import { trpc } from "@/utils/trpc";
import { FieldValues, useForm } from "react-hook-form";

const LoginPage = () => {
  const {login} = useAuth();
  const loginMut = trpc.user.login.useMutation();
  const { register, handleSubmit } = useForm();

  const onSubmitLogin = async (data: FieldValues) => {
    const res = await loginMut.mutateAsync({
      email: data.email,
      password: data.password,
    });
    login(res)
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
