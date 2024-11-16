'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { signIn, signUp, signInWithGoogle, resetPassword } from '@/lib/auth';
import CustomButton from '../CustomButton';

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

type AuthFormData = z.infer<typeof authSchema>;

function AuthForm() {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      if (mode === 'signin') {
        await signIn(data.email, data.password);
        router.push('/'); // Redirect to dashboard
      } else if (mode === 'signup') {
        await signUp(data.email, data.password, data.name!);
        toast({ title: 'Account created', description: 'Redirecting to login...' });
        router.push('/login');
      }
       else if (mode === 'reset') {
        await resetPassword(data.email);
        toast({
          title: 'Password reset email sent',
          description: 'Check your email for password reset instructions',
        });
        router.push('/');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push('/dashboard'); // Redirect to dashboard on successful Google sign-in
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {mode === 'signup' && (
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {mode !== 'reset' && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        )}

        <CustomButton
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {mode === 'signin'
            ? 'Sign In'
            : mode === 'signup'
            ? 'Sign Up'
            : 'Reset Password'}
        </CustomButton>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
      >
        Continue with Google
      </Button>

      <div className="text-center text-sm">
        {mode === 'signin' ? (
          <>
            <button
              type="button"
              className="underline"
              onClick={() => setMode('signup')}
            >
              Create an account
            </button>
            {' · '}
            <button
              type="button"
              className="underline"
              onClick={() => setMode('reset')}
            >
              Forgot password?
            </button>
          </>
        ) : (
          <button
            type="button"
            className="underline"
            onClick={() => setMode('signin')}
          >
            Already have an account?
          </button>
        )}
      </div>
    </div>
  );
}


export default AuthForm;
