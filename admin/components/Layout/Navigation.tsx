import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  SupportIcon,
  UsersIcon,
} from '@heroicons/react/outline'
import useTranslation from 'next-translate/useTranslation'
import { SVGProps } from 'react'
interface navigation {
  title: string
  href: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

export const useNavigation = () => {
  const { t } = useTranslation()

  return [
    { title: t('global:home'), href: '/', icon: HomeIcon },
    { title: t('global:locations'), href: '/locations', icon: SupportIcon },
    { title: t('global:users'), href: '/users', icon: UsersIcon },
    { title: t('global:calendar'), href: '/calendar', icon: CalendarIcon },
    { title: t('global:guide'), href: '/guide', icon: FolderIcon },
  ]
}

export function isCurrent(nav: navigation, currentTitle: string) {
  return nav.title === currentTitle
}
