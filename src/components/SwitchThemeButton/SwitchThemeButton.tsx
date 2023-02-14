import { useState } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import useDarkMode from 'src/hooks/useTheme'

export default function SwitchThemeButton() {
  const [colorTheme, setTheme] = useDarkMode()
  const [darkMode, setDarkMode] = useState(colorTheme === 'light' ? true : false)
  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme)
    setDarkMode(checked)
  }

  return (
    <>
      <DarkModeSwitch checked={darkMode} onChange={toggleDarkMode} size={24} />
    </>
  )
}
