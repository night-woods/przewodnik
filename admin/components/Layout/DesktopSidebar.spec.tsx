import { render, screen } from '@testing-library/react'
import { DesktopSidebar } from './DesktopSidebar'
import { navigation } from './Navigation'

describe(DesktopSidebar.name, () => {
  it('displays all values from navigation', () => {
    render(<DesktopSidebar currentTitle="Home" />)

    for (const { title } of navigation) {
      expect(screen.queryByText(title)).not.toBeNull()
    }
  })
})
