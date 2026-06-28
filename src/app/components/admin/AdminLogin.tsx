import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import logoImage from '@/assets/70be82926b0ed207a1ebf683c489d9076556dc83.png';

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await login(data.username, data.password);
      toast.success('Logged in successfully!');
      navigate('/admin/dashboard');
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid credentials. Please try again.');
      toast.error('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003C7D] to-[#001f40] px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl border-4 border-accent relative overflow-hidden">
        {/* Brand Banner Line */}
        <div className="absolute top-0 left-0 right-0 h-2 flex">
          <span style={{ backgroundColor: '#4dd2ff', width: '20%' }}></span>
          <span className="bg-primary" style={{ width: '80%' }}></span>
        </div>

        {/* Logo and Headings */}
        <div className="text-center flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <img src={logoImage} alt="Superads Logo" className="h-14 w-auto" />
            <div style={{ fontFamily: "'Algerian', serif" }}>
              <div className="text-lg font-bold tracking-wider leading-none text-secondary">
                <span style={{ color: '#4dd2ff' }}>S</span>
                <span className="text-primary">UPER </span>
                <span style={{ color: '#4dd2ff' }}>A</span>
                <span className="text-primary">DS</span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-black text-secondary">Admin Dashboard</h2>
          <p className="text-xs text-muted-foreground mt-1">Portfolio Management Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <Label htmlFor="username" className="font-bold text-secondary text-sm">
              Username
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <User className="w-4 h-4" />
              </span>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                className={`pl-9 border-2 ${errors.username ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-primary`}
                {...register('username', { required: 'Username is required' })}
              />
            </div>
            {errors.username && (
              <p className="text-xs font-semibold text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="font-bold text-secondary text-sm">
              Password
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                className={`pl-9 pr-9 border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-primary`}
                {...register('password', { required: 'Password is required' })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-secondary cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs font-semibold text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Error display */}
          {errorMessage && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 p-3 rounded-xl text-xs font-semibold animate-shake">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-xl border-2 border-primary hover:border-secondary transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
