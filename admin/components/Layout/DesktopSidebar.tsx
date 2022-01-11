import Image from 'next/image'
import { classNames } from '../../lib/classNames'
import { isCurrent, useNavigation } from './Navigation'
import { UserProfileButton } from './UserProfileButton'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

export interface DesktopSidebarProps {
  currentTitle: string
}

export const DesktopSidebar = ({ currentTitle }: DesktopSidebarProps) => {
  const { t } = useTranslation()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            {t('global:webpageTitle')}
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {useNavigation().map((item) => (
              <Link key={item.title} href={item.href}>
                <a
                  className={classNames(
                    isCurrent(item, currentTitle)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                  )}
                >
                  <item.icon
                    className={classNames(
                      isCurrent(item, currentTitle)
                        ? 'text-gray-300'
                        : 'text-gray-400 group-hover:text-gray-300',
                      'mr-3 flex-shrink-0 h-6 w-6',
                    )}
                    aria-hidden="true"
                  />
                  {item.title}
                </a>
              </Link>
            ))}
          </nav>
        </div>
        <UserProfileButton />
      </div>
    </div>
  )
}
