"use client";

import { useState } from "react";

import { ReactComponent as ChevronDown } from "../../assets/images/ui/icons/ui-icon-chevron-down.svg";
import { ReactComponent as ChevronLeft } from "../../assets/images/ui/icons/ui-icon-chevron-left.svg";
import { ReactComponent as ChevronRight } from "../../assets/images/ui/icons/ui-icon-chevron-right.svg";
import { ReactComponent as ArrowUp } from "../../assets/images/ui/icons/ui-icon-arrow-up.svg";

import { SidebarDevice, SidebarItem, SidebarProps } from "./types";
import styles from "./Sidebar.module.scss";

const findInitialActiveKey = (
  list: SidebarItem[],
): string | undefined => {
  for (const entry of list) {
    if (entry.isActive && (!entry.children || entry.children.length === 0)) {
      return entry.key;
    }
    if (entry.children) {
      const childKey = findInitialActiveKey(entry.children);
      if (childKey) return childKey;
    }
  }
  return undefined;
};

const Sidebar = ({
  device = "desktop",
  title = "Menú",
  user,
  account,
  banners,
  items,
  footer,
  defaultCollapsed = false,
  onCollapseChange,
  onActiveChange,
  className,
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [activeKey, setActiveKey] = useState<string | undefined>(() =>
    findInitialActiveKey(items),
  );
  const isDesktop = device === "desktop";
  const collapsed = isDesktop && isCollapsed;

  const toggleCollapse = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    onCollapseChange?.(next);
  };

  const handleActivate = (key: string) => {
    setActiveKey(key);
    onActiveChange?.(key);
  };

  const {
    sidebar,
    titleRow,
    titleText,
    collapseButton,
    collapseIcon,
    top,
    user: userClass,
    userStatic,
    userIcon,
    userInfo,
    userName,
    userEmail,
    chevron,
    account: accountClass,
    accountLabel,
    accountChevron,
    body,
    banners: bannersClass,
    banner,
    bannerLabel,
    items: itemsClass,
    footer: footerClass,
    footerStatic,
    footerIcon,
    footerText,
    footerTitle,
    footerSubtitle,
    footerTrailingIcon,
  } = styles;

  // TODO: replace with the Bottomsheet component once it lands in the
  // library. Triggered by user/account rows on mobile.
  const handleMobilePlaceholder = () => {};

  const renderDesktopTitleRow = () => (
    <div className={titleRow}>
      <span className={titleText}>{title}</span>
      <button
        type="button"
        className={collapseButton}
        onClick={toggleCollapse}
        aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        aria-pressed={collapsed}
      >
        {collapsed ? (
          <ChevronRight className={collapseIcon} />
        ) : (
          <ChevronLeft className={collapseIcon} />
        )}
      </button>
    </div>
  );

  const renderMobileTop = () => {
    if (!user && !account) return null;

    const userContent = user && (
      <>
        {user.icon && <span className={userIcon}>{user.icon}</span>}
        <div className={userInfo}>
          <span className={userName}>{user.name}</span>
          <span className={userEmail}>{user.email}</span>
        </div>
        {user.menu && <ChevronDown className={chevron} />}
      </>
    );

    const userRow =
      user &&
      (user.menu ? (
        <button
          type="button"
          className={userClass}
          onClick={handleMobilePlaceholder}
        >
          {userContent}
        </button>
      ) : (
        <div className={`${userClass} ${userStatic}`}>{userContent}</div>
      ));

    const accountRow = account && (
      <button
        type="button"
        className={accountClass}
        onClick={account.menu ? handleMobilePlaceholder : undefined}
      >
        <span className={accountLabel}>{account.label}</span>
        <ChevronDown className={accountChevron} />
      </button>
    );

    return (
      <div className={top}>
        {userRow}
        {accountRow}
      </div>
    );
  };

  const renderMobileBanners = () => {
    if (!banners || banners.length === 0) return null;
    return (
      <div className={bannersClass}>
        {banners.map((b) => (
          <button
            key={b.key}
            type="button"
            className={banner}
            style={b.image ? { backgroundImage: `url(${b.image})` } : undefined}
            onClick={b.onClick}
          >
            {b.label && <span className={bannerLabel}>{b.label}</span>}
          </button>
        ))}
      </div>
    );
  };

  const renderFooter = () => {
    if (!footer) return null;

    const content = (
      <>
        {footer.icon && <span className={footerIcon}>{footer.icon}</span>}
        <div className={footerText}>
          <span className={footerTitle}>{footer.title}</span>
          {footer.subtitle && (
            <span className={footerSubtitle}>{footer.subtitle}</span>
          )}
        </div>
        <span className={footerTrailingIcon}>
          {footer.trailingIcon ?? <ArrowUp />}
        </span>
      </>
    );

    return footer.onClick ? (
      <button
        type="button"
        className={footerClass}
        onClick={footer.onClick}
      >
        {content}
      </button>
    ) : (
      <div className={`${footerClass} ${footerStatic}`}>{content}</div>
    );
  };

  return (
    <aside
      className={`${sidebar} ${className ?? ""}`}
      data-collapsed={collapsed || undefined}
      data-device={device}
    >
      {isDesktop && renderDesktopTitleRow()}

      <div className={body}>
        {!isDesktop && renderMobileTop()}
        {!isDesktop && renderMobileBanners()}

        <ul className={itemsClass}>
          {items.map((entry) => (
            <NavItem
              key={entry.key}
              entry={entry}
              collapsed={collapsed}
              device={device}
              activeKey={activeKey}
              onActivate={handleActivate}
            />
          ))}
        </ul>
      </div>

      {device == "desktop" && renderFooter()}
    </aside>
  );
};

interface NavItemProps {
  entry: SidebarItem;
  collapsed: boolean;
  device: SidebarDevice;
  depth?: number;
  activeKey: string | undefined;
  onActivate: (key: string) => void;
}

const NavItem = ({
  entry,
  collapsed,
  device,
  depth = 0,
  activeKey,
  onActivate,
}: NavItemProps) => {
  const hasChildren = !!entry.children && entry.children.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const open = hasChildren && isOpen && !collapsed;
  const isActive = !hasChildren && entry.key === activeKey;

  const {
    item,
    itemActive,
    itemIcon,
    itemLabel,
    itemChevron,
    itemChevronOpen,
    itemChildren,
  } = styles;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen((prev) => !prev);
      return;
    }
    onActivate(entry.key);
    entry.onClick?.();
  };

  return (
    <li>
      <button
        type="button"
        className={`${item} ${isActive ? itemActive : ""}`}
        onClick={handleClick}
        style={{
          paddingLeft: depth > 0 ? `${1.75 + depth * 1.25}rem` : undefined,
        }}
        aria-expanded={hasChildren ? open : undefined}
        aria-current={isActive ? "page" : undefined}
        data-device={device}
      >
        {entry.icon && <span className={itemIcon}>{entry.icon}</span>}
        <span className={itemLabel}>{entry.label}</span>
        {hasChildren && (
          <ChevronDown
            className={`${itemChevron} ${open ? itemChevronOpen : ""}`}
          />
        )}
      </button>
      {open && (
        <ul className={itemChildren}>
          {entry.children!.map((child) => (
            <NavItem
              key={child.key}
              entry={child}
              collapsed={collapsed}
              device={device}
              depth={depth + 1}
              activeKey={activeKey}
              onActivate={onActivate}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Sidebar;
