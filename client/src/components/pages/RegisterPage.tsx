import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/utils/trpc";
import { FieldValues, useForm } from "react-hook-form";

const RegisterPage = () => {
  const create = trpc.user.register.useMutation();
  const { register, handleSubmit } = useForm();

  const onSubmitRegister = async (data: FieldValues) => {
    create.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-10 max-w-md m-auto  ">
        <form onSubmit={handleSubmit(onSubmitRegister)}>
          <div className="flex flex-col gap-2  ">
            <Input {...register("email")} type="email" placeholder="Email" />
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            <Button type="submit">Зарегистрироваться</Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default RegisterPage;
