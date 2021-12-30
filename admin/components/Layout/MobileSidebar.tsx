import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import { classNames } from '../../lib/classNames'
import { isCurrent, navigation } from './Navigation'
import { UserProfileButton } from './UserProfileButton'

export interface MobileSidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (sidebarOpen: boolean) => void
  currentTitle: string
}

export const MobileSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  currentTitle,
}: MobileSidebarProps) => (
  <Transition.Root show={sidebarOpen} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 flex z-40 md:hidden"
      onClose={setSidebarOpen}
    >
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </Transition.Child>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              Przewodnik
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className={classNames(
                    isCurrent(item, currentTitle)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                  )}
                >
                  <item.icon
                    className={classNames(
                      isCurrent(item, currentTitle)
                        ? 'text-gray-300'
                        : 'text-gray-400 group-hover:text-gray-300',
                      'mr-4 flex-shrink-0 h-6 w-6',
                    )}
                    aria-hidden="true"
                  />
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
          <UserProfileButton />
        </div>
      </Transition.Child>
      <div className="flex-shrink-0 w-14">
        {/* Force sidebar to shrink to fit close icon */}
      </div>
    </Dialog>
  </Transition.Root>
)
