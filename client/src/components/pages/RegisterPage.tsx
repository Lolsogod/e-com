import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { router } from "@/router/router";
import { useAuth } from "@/store/useAuth";
import { trpc } from "@/utils/trpc";
import { Link } from "@tanstack/react-router";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const { login } = useAuth();
  const registerMut = trpc.user.register.useMutation();
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitRegister = async (data: FieldValues) => {
    registerMut
      .mutateAsync({
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        login(res);
        router.navigate({ to: "/" });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };
  return (
    <div className="flex flex-col gap-4 max-w-md m-auto">
      <h1 className="text-3xl font-semibold tracking-tight text-center">
        Регистрация
      </h1>
      <form onSubmit={handleSubmit(onSubmitRegister)}>
        <div className="flex flex-col gap-2 ">
          <Input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder="Email" />
          {errors.email && <span className="text-sm text-muted-foreground text-red-500">Некоректный адрес</span>}
          <Input {...register("password", { required: true, minLength: 6 })} type="password" placeholder="Password" />
          {errors.password && <span className="text-sm text-muted-foreground text-red-500">Минимум 6 символов</span>}
          <div className="flex gap-2">
            <Link className={cn(buttonVariants({ variant: "outline" }), "flex-1")} to="/login">
              У меня уже есть аккаунт
            </Link>
            <Button className="flex-1" type="submit" disabled={registerMut.isLoading}>Зарегистрироваться</Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;
