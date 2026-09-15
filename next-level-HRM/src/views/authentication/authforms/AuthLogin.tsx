import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Button } from 'src/components/ui/button';
import { Checkbox } from 'src/components/ui/checkbox';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { api } from 'src/lib/apiClient';
import { useAuth } from 'src/middleware/AuthContext';

const AuthLogin = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const loginRes = await fetch('https://lesson-starter-1.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        throw new Error(loginData.message);
      }

      const { response, data: userData } = await api.get('/api/me')

      if (!response.ok) {
        throw new Error(userData.message);
      }
      login(loginData.token, userData);
      toast.success('Đăng nhập thành công!');
      navigate(userData.role === 'admin' ? '/admin' : '/');

    } catch (error: any) {
      console.error('Login Failed: ', error);
      toast.error(error.message || 'Đã có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="mt-6" onSubmit={handleLogin}>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="Username">Username</Label>
          </div>
          <Input
            id="username"
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="userpwd">Password</Label>
          </div>
          <Input
            id="userpwd"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" className="checkbox" />
            <Label htmlFor="accept" className="opacity-90 font-normal cursor-pointer">
              Remember this Device
            </Label>
          </div>
          <Link to={'/'} className="text-primary text-sm font-medium">
            Forgot Password ?
          </Link>
        </div>
        <Button className="w-full">
          Sign in
        </Button>
      </form>
    </>
  );
};

export default AuthLogin;
