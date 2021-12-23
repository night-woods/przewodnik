import Image from 'next/image'

export const UserProfileButton = () => (
  <div className="flex-shrink-0 flex bg-gray-700 p-4">
    <a href="#" className="flex-shrink-0 w-full group block">
      <div className="flex items-center">
        <div>
          <Image
            className="inline-block h-9 w-9 rounded-full"
            width={48}
            height={48}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="ml-3">
          <p className="text-base font-medium text-white">Jan Nowak</p>
          <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
            Profil użytkownika
          </p>
        </div>
      </div>
    </a>
  </div>
)
