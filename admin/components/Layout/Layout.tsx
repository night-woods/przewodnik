import React, { useState } from 'react'
import { DesktopSidebar } from './DesktopSidebar'
import { DesktopSidebarButton } from './DesktopSidebarButton'
import { MobileSidebar } from './MobileSidebar'

export interface LayoutProps {
  title: string
}

export default function Layout({
  title,
  children,
}: React.PropsWithChildren<LayoutProps>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-full">
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentTitle={title}
      />
      <DesktopSidebar currentTitle={title} />
      <div className="md:pl-64 flex flex-col flex-1 h-full">
        <DesktopSidebarButton setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 h-full">
          <div className="pt-6 h-full flex-col flex">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            </div>
            <div className="bg-white mx-4 my-8 p-4 rounded-lg flex-grow">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
