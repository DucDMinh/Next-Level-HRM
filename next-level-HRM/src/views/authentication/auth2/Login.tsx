import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import CardBox from "src/components/shared/CardBox";

import AuthLogin from "../authforms/AuthLogin";
import SocialButtons from "../authforms/SocialButtons";

import FullLogo from "src/layouts/full/shared/logo/FullLogo";


const Login = () => {
  const { t } = useTranslation('auth/login/login');

  return (
    <>
      <div className="relative overflow-hidden h-screen bg-lightprimary dark:bg-darkprimary">
        <div className="flex h-full justify-center items-center px-4">
          <CardBox className="md:w-[450px] w-full border-none">
            <div className="mx-auto mb-6">
              <FullLogo />
            </div>
            <SocialButtons title={t('social_title')} />
            <AuthLogin />
            <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-center">
              <p>{t('new_to_hrm')}</p>
              <Link
                to={"/auth/auth2/register"}
                className="text-primary text-sm font-medium"
              >
                {t('create_account')}
              </Link>
            </div>
          </CardBox>
        </div>
      </div>
    </>
  );
};

export default Login;
