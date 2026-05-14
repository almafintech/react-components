"use client";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { ReactComponent as ChevronDown } from "../../assets/images/ui/icons/ui-icon-chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../assets/images/ui/icons/ui-icon-chevron-up.svg";

import { HeaderProps } from "./types";
import styles from "./Header.module.scss";

/**
 * Top-of-page navigation header. Shows the application logo on the left and
 * the logged-in user's info on the right, with an optional tag and dropdown.
 */
const Header = ({
  logo,
  userName,
  userInitials,
  hasTag = false,
  tagLabel,
  showDropdown = true,
  dropdownItems = [],
  className,
}: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const userContent = (
    <>
      <span className={styles.avatar}>{userInitials}</span>
      <span className={styles.userName}>{userName}</span>
      {showDropdown &&
        (isOpen ? (
          <ChevronUp className={styles.chevron} />
        ) : (
          <ChevronDown className={styles.chevron} />
        ))}
    </>
  );

  return (
    <header className={`${styles.container} ${className ?? ""}`}>
      {logo && <div className={styles.logo}>{logo}</div>}

      <div className={styles.right}>
        {hasTag && tagLabel && <span className={styles.tag}>{tagLabel}</span>}
        {hasTag && <div className={styles.divider} aria-hidden="true" />}

        {showDropdown ? (
          <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenu.Trigger asChild>
              <button type="button" className={styles.userTrigger}>
                {userContent}
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className={styles.menu}
                align="end"
                sideOffset={8}
              >
                {dropdownItems.map((item) => (
                  <DropdownMenu.Item
                    key={item.key}
                    className={styles.menuItem}
                    onSelect={item.onClick}
                  >
                    {item.icon && (
                      <span className={styles.menuItemIcon}>{item.icon}</span>
                    )}
                    {item.label}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        ) : (
          <div className={`${styles.userTrigger} ${styles.userTriggerStatic}`}>
            {userContent}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
