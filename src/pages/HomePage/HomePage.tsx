import SwitchThemeButton from 'src/components/SwitchThemeButton'

export default function HomePage() {
  return (
    <div>
      HomePage
      <div className='dark:bg-black'>
        <h1 className='text-color-primary dark:text-color-secondary'>THEME</h1>
        <SwitchThemeButton />
      </div>
    </div>
  )
}
