import { useState } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import useDarkMode from 'src/hooks/useTheme'

interface SwitchThemeButtonProps {
  size?: number
}

export default function SwitchThemeButton({ size = 20 }: SwitchThemeButtonProps) {
  const [colorTheme, setTheme] = useDarkMode()
  const [darkMode, setDarkMode] = useState(colorTheme === 'dark' ? true : false)
  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme)
    setDarkMode(checked)
  }

  return (
    <>
      <DarkModeSwitch
        id='react-toggle-dark-mode'
        checked={darkMode}
        onChange={toggleDarkMode}
        color={'#FEFFFF'}
        size={size}
      />
    </>
  )
}
