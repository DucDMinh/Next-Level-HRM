import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const handleLanguageChange = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('app_language', lng);
    };

    return (
        <div className="flex items-center gap-2 p-2">
            <button
                onClick={() => handleLanguageChange('en')}
                className={`px-2 py-1 text-sm rounded transition-colors ${i18n.language === 'en'
                        ? 'bg-primary text-white font-bold'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
            >
                EN
            </button>
            <span className="text-gray-400">|</span>
            <button
                onClick={() => handleLanguageChange('vi')}
                className={`px-2 py-1 text-sm rounded transition-colors ${i18n.language === 'vi'
                        ? 'bg-primary text-white font-bold'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
            >
                VI
            </button>
        </div>
    );
}