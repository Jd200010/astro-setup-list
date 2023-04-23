import React, { useState, useEffect } from 'react'
import { IoIosMoon, IoIosSunny } from 'react-icons/io/index'

const themes =['light', 'dark'];

export default function ThemeToggle() {
    const [isMounted, setIsMounted] = useState(false)
    const [theme, setTheme] = useState(() => {
      if (import.meta.env.SSR) {
        return undefined
      }
      if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
        return localStorage.getItem('theme')
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
      return 'light'
    })
    const toggleTheme = () => {
      const t = theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', t)
      setTheme(t)
    }
  
    useEffect(() => {
      const root = document.documentElement
      if (theme === 'light') {
        root.classList.remove('dark')
      } else {
        root.classList.add('dark')
      }
    }, [theme])
  
    useEffect(() => {
      setIsMounted(true)
    }, [])
  
    return isMounted ? (
      <div className="inline-flex items-center rounded-3xl bg-orange-300 dark:bg-zinc-600 my-1.5 mx-2">
        {themes.map(t => {
          const checked = t === theme
          return (
            <button
              key={t}
              className={`${
                checked ? 'bg-white text-black' : ''
              } cursor-pointer rounded-3xl p-2`}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {t === 'light' ? <IoIosSunny /> : <IoIosMoon />}
            </button>
          )
        })}
      </div>
    ) : (
      <div />
    )
  }

