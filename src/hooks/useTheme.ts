import { useState, useEffect } from 'react'

export default function useDarkMode(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [theme, setTheme] = useState<string>(String(localStorage.theme))
  const colorTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme)
    root.classList.add(theme || '')
    localStorage.setItem('theme', theme || '')
  }, [theme, colorTheme])

  return [colorTheme, setTheme]
}
