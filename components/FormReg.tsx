// components/Register.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { auth, db } from '@/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { toast } from 'sonner';
import ButtonSubmit from '@/components/ui/ButtonSubmit';
import InputEmail from '@/components/ui/InputEmail';
import InputPassword from '@/components/ui/InputPassword';


// validation scheme
const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

interface IFormInput {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // save data in Realtime Database
      await set(ref(db, 'users/' + user.uid), {
        email: user.email
      });
      console.log('Registration successful'); 
      toast.success('Registration successful'); 
    } catch (error) {
      console.log('Registration error');
      toast.error('Registration error'); 
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputEmail register={register} errors={errors} />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <InputPassword register={register} errors={errors} />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      <ButtonSubmit>Register</ButtonSubmit>
    </form>
  );
};

export default Register;
