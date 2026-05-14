"use client";
import { useState } from "react";

import { ReactComponent as ChevronDown } from "../../assets/images/ui/icons/ui-icon-chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../assets/images/ui/icons/ui-icon-chevron-up.svg";

import { Dropdown } from "../Dropdown";
import { HeaderProps } from "./types";
import styles from "./Header.module.scss";

const getInitial = (value: string) =>
  value.trim().split(/\s+/)[0]?.[0]?.toUpperCase() ?? "";

const Header = ({
  logo,
  name,
  lastName,
  children,
  dropdown,
  className,
}: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    container,
    logo: logoClass,
    right,
    divider,
    userTrigger,
    userTriggerStatic,
    avatar,
    userName,
    chevron,
  } = styles;

  const initials = `${getInitial(name)}${getInitial(lastName)}`;

  const userContent = (
    <>
      <span className={avatar}>{initials}</span>
      <span className={userName}>{`${name} ${lastName}`}</span>
      {dropdown &&
        (isOpen ? (
          <ChevronUp className={chevron} />
        ) : (
          <ChevronDown className={chevron} />
        ))}
    </>
  );

  return (
    <header className={`${container} ${className ?? ""}`}>
      {logo && <div className={logoClass}>{logo}</div>}

      <div className={right}>
        {children && (
          <>
            {children}
            <div className={divider} aria-hidden="true" />
          </>
        )}

        {dropdown ? (
          <Dropdown {...dropdown} isOpen={isOpen} onOpenChange={setIsOpen}>
            <button type="button" className={userTrigger}>
              {userContent}
            </button>
          </Dropdown>
        ) : (
          <div className={`${userTrigger} ${userTriggerStatic}`}>
            {userContent}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
