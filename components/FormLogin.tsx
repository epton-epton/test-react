// components/FormLogin.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import ButtonSubmit from '@/components/ui/ButtonSubmit';
import InputEmail from '@/components/ui/InputEmail';
import InputPassword from '@/components/ui/InputPassword';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      console.log(result);

      if (result?.error) {
        toast.error('Login failed');
      } else {
        toast.success('Login successful');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <InputEmail register={register} errors={errors} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <InputPassword register={register} errors={errors} />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <ButtonSubmit>Login</ButtonSubmit>
    </form>
  );
};

export default Login;
