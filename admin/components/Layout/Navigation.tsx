import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  SupportIcon,
  UsersIcon,
} from '@heroicons/react/outline'

export const navigation = [
  { title: 'Home', href: '/', icon: HomeIcon },
  { title: 'Placówki', href: '/locations', icon: SupportIcon },
  { title: 'Użytkownicy', href: '/users', icon: UsersIcon },
  { title: 'Kalendarz', href: '/calendar', icon: CalendarIcon },
  { title: 'Przewodnik', href: '/guide', icon: FolderIcon },
]

export function isCurrent(nav: typeof navigation[0], currentTitle: string) {
  return nav.title === currentTitle
}
