'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { resetPassword } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import CustomButton from '@/components/CustomButton';
import AuthForm from '@/components/auth/auth-form';
import { Button } from '@/components/ui/button';

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword(data.email);
      toast({
        title: 'Password reset email sent',
        description: 'Check your email for further instructions.',
      });
      router.push('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset your password
          </h1>

        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>


        <CustomButton
          type="submit"
          className="w-full hover:bg-red-400"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Reset Password
        </CustomButton>
      </form>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => router.back()}
      >
        Go back
      </Button>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
