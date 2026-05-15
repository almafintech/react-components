"use client"
import { useLayoutEffect, useRef, useState } from "react"
import { NavbarProps } from "./types"
import styles from "./Navbar.module.scss"

const Navbar = ({
  items,
  activeId,
  defaultActiveId,
  onChange,
  className,
  ariaLabel = "Main navigation",
}: NavbarProps) => {
  const { navbar, indicator, item: itemClass, icon, label } = styles

  const [internalActive, setInternalActive] = useState<string | undefined>(
    defaultActiveId ?? items[0]?.id,
  )

  const isControlled = activeId !== undefined
  const currentId = isControlled ? activeId : internalActive

  const handleSelect = (id: string) => {
    if (!isControlled) setInternalActive(id)
    onChange?.(id)
  }

  const navRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<Record<string, HTMLButtonElement | null>>({})
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const nav = navRef.current
    const el = currentId ? itemsRef.current[currentId] : null
    if (!nav || !el) return

    const update = () => {
      const navRect = nav.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      setIndicatorStyle({
        left: elRect.left - navRect.left,
        width: elRect.width,
      })
    }

    update()

    const observer = new ResizeObserver(update)
    observer.observe(nav)
    return () => observer.disconnect()
  }, [currentId, items])

  return (
    <nav
      ref={navRef}
      aria-label={ariaLabel}
      className={`${navbar} ${className ?? ""}`}
    >
      <span
        aria-hidden="true"
        className={indicator}
        style={{
          transform: `translateX(${indicatorStyle.left}px)`,
          width: `${indicatorStyle.width}px`,
        }}
      />
      {items.map((item) => {
        const isActive = item.id === currentId
        const iconNode =
          isActive && item.activeIcon ? item.activeIcon : item.icon

        return (
          <button
            key={item.id}
            ref={(el) => {
              itemsRef.current[item.id] = el
            }}
            type="button"
            className={itemClass}
            onClick={() => handleSelect(item.id)}
            disabled={item.disabled}
            aria-current={isActive ? "page" : undefined}
          >
            {iconNode && <span className={icon}>{iconNode}</span>}
            <span className={label}>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default Navbar
