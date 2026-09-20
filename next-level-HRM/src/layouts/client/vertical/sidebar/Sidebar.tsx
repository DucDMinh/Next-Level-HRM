import SidebarContent from './sidebaritems';
import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react';
import FullLogo from '../../shared/logo/FullLogo';
import { Link, useLocation } from 'react-router';
import { useTheme } from 'src/components/provider/theme-provider';
import { AMLogo, AMMenu, AMMenuItem, AMSidebar } from 'tailwind-sidebar';
import 'tailwind-sidebar/styles.css';
import { useTranslation } from 'react-i18next';

interface SidebarItemType {
  heading?: string
  id?: number | string
  name?: string
  title?: string
  icon?: string
  url?: string
  children?: SidebarItemType[]
  disabled?: boolean
  isPro?: boolean
}

const renderSidebarItems = (
  items: SidebarItemType[],
  currentPath: string,
  t: (key: string) => string,
  onClose?: () => void,
  isSubItem: boolean = false,
) => {
  return items.map((item) => {
    const isSelected = currentPath === item?.url;
    const IconComp = item.icon || null;

    const iconElement = IconComp ? (
      <Icon icon={IconComp} height={21} width={21} />
    ) : (
      <Icon icon={'ri:checkbox-blank-circle-line'} height={9} width={9} />
    );

    if (item.heading) {
      return (
        <div className="mb-1" key={item.heading}>
          <AMMenu
            subHeading={t(item.heading)}
            ClassName="hide-menu leading-21 text-sidebar-foreground font-bold uppercase text-xs dark:text-sidebar-foreground"
          />
        </div>
      );
    }


    const linkTarget = item.url?.startsWith('https') ? '_blank' : '_self';

    const itemClassNames = isSubItem
      ? `mt-0.5 text-sidebar-foreground dark:text-sidebar-foreground !hover:bg-transparent ${isSelected ? '!bg-transparent !text-primary' : ''
      }`
      : `mt-0.5 text-sidebar-foreground dark:text-sidebar-foreground`;

    return (
      <div onClick={onClose}>
        <AMMenuItem
          key={item.id}
          icon={iconElement}
          isSelected={isSelected}
          link={item.url || undefined}
          target={linkTarget}
          badge={!!item.isPro}
          badgeColor="bg-lightsecondary"
          badgeTextColor="text-secondary"
          disabled={item.disabled}
          badgeContent={item.isPro ? 'Pro' : undefined}
          component={Link}
          className={`${itemClassNames}`}
        >
          <span className="truncate flex-1">{t((item.title || item.name) as string)}</span>
        </AMMenuItem>
      </div>
    );
  });
};

const SidebarLayout = ({ onClose }: { onClose?: () => void }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { theme } = useTheme();
  const { t } = useTranslation('client/sidebar/sidebar');
  const sidebarMode = theme === 'light' || theme === 'dark' ? theme : undefined;

  return (
    <AMSidebar
      collapsible="none"
      animation={true}
      showProfile={false}
      width={'270px'}
      showTrigger={false}
      mode={sidebarMode}
      className="fixed left-0 top-0 border border-border dark:border-border bg-sidebar dark:bg-sidebar z-10 h-screen"
    >
      <div className="px-6 flex items-center brand-logo overflow-hidden">
        <AMLogo component={Link} href="/" img="">
          <FullLogo />
        </AMLogo>
      </div>

      <SimpleBar className="h-[calc(100vh-100px)]">
        <div className="px-6">
          {SidebarContent.map((section, index) => (
            <div key={index}>
              {renderSidebarItems(
                [
                  ...(section.heading ? [{ heading: section.heading }] : []),
                  ...(section.children || []),
                ],
                pathname,
                t,
                onClose,
              )}
            </div>
          ))}
        </div>
      </SimpleBar>
    </AMSidebar>
  );
};

export default SidebarLayout;
