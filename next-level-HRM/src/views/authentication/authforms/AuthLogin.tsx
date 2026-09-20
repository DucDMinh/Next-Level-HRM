import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/components/ui/button';
import { Checkbox } from 'src/components/ui/checkbox';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { useAuth } from 'src/providers/AuthContext';

const AuthLogin = () => {
  const navigation = useNavigate();
  const { t } = useTranslation('auth/login/login');
  const { isAuthenticated, login, isLogging } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigation('/');
    }
  }, [isAuthenticated])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ username: formData.username, password: formData.password });
  };

  return (
    <>
      <form className="mt-6" onSubmit={handleLogin}>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="username">{t('label_username')}</Label>
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
            <Label htmlFor="password">{t('label_password')}</Label>
          </div>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" className="checkbox" />
            <Label htmlFor="accept" className="opacity-90 font-normal cursor-pointer">
              {t('remember_device')}
            </Label>
          </div>
          <Link to={'/'} className="text-primary text-sm font-medium">
            {t('forgot_password')}
          </Link>
        </div>
        <Button className="w-full">
          {isLogging ? t('btn_loading') : t('btn_sign_in')}
        </Button>
      </form>
    </>
  );
};

export default AuthLogin;
