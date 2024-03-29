import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { router } from "@/router/router";
import { useAuth } from "@/store/useAuth";
import { trpc } from "@/utils/trpc";
import { Link } from "@tanstack/react-router";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { login } = useAuth();
  const loginMut = trpc.user.login.useMutation();
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: true,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitLogin = async (data: FieldValues) => {
    loginMut
      .mutateAsync({
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        login(res);
        router.navigate({ to: "/" });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="flex flex-col gap-4 max-w-md m-auto  ">
        <h1 className="text-3xl font-semibold tracking-tight text-center">
          Вход
        </h1>
        <form onSubmit={handleSubmit(onSubmitLogin)}>
          <div className="flex flex-col gap-2  ">
            <Input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder="Email" />
            {errors.email && <span className="text-sm text-muted-foreground text-red-500">Данное поле необходимо заполнить</span>}
            <Input {...register("password", { required: true })} type="password" placeholder="Password" />
            {errors.password && <span className="text-sm text-muted-foreground text-red-500">Данное поле необходимо заполнить</span>}
            <div className="flex gap-2">
              <Link
                className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
                to="/register"
              >
                Создать аккаунт
              </Link>
              <Button className="flex-1" type="submit" disabled={loginMut.isLoading}>
                Войти
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default LoginPage;
