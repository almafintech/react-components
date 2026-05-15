import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Navbar from "../Navbar/Navbar";

const HomeIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.33 8.33 10 3.33l6.67 5v8.34a1.67 1.67 0 0 1-1.67 1.66H5a1.67 1.67 0 0 1-1.67-1.66V8.33Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 17.5v-5h5v5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.67 5h10M6.67 10h10M6.67 15h10M3.33 5h.01M3.33 10h.01M3.33 15h.01"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TransferIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m13.33 3.33 3.34 3.34-3.34 3.33M16.67 6.67H5M6.67 16.67l-3.34-3.34 3.34-3.33M3.33 13.33H15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CardIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="2.5"
      y="4.17"
      width="15"
      height="11.67"
      rx="1.67"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M2.5 8.33h15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const MoreIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="10" r="1.25" fill="currentColor" />
    <circle cx="10" cy="10" r="1.25" fill="currentColor" />
    <circle cx="15" cy="10" r="1.25" fill="currentColor" />
  </svg>
);

const defaultItems = [
  { id: "home", label: "Inicio", icon: <HomeIcon /> },
  { id: "movements", label: "Movimientos", icon: <ListIcon /> },
  { id: "transfer", label: "Transferir", icon: <TransferIcon /> },
  { id: "cards", label: "Tarjetas", icon: <CardIcon /> },
  { id: "more", label: "Más", icon: <MoreIcon /> },
];

const meta = {
  title: "Navigation/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    items: defaultItems,
    onChange: fn(),
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 360, border: "1px solid #eee" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutIcons: Story = {
  args: {
    items: defaultItems.map((item) => ({ id: item.id, label: item.label })),
  },
};

export const DefaultActiveId: Story = {
  args: {
    defaultActiveId: "transfer",
  },
};

export const Controlled: Story = {
  args: {
    activeId: "cards",
  },
};

export const WithActiveIcon: Story = {
  args: {
    items: defaultItems.map((item) =>
      item.id === "home"
        ? {
            ...item,
            activeIcon: (
              <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.33 8.33 10 3.33l6.67 5v8.34a1.67 1.67 0 0 1-1.67 1.66H5a1.67 1.67 0 0 1-1.67-1.66V8.33Z"
                  fill="currentColor"
                />
              </svg>
            ),
          }
        : item
    ),
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: defaultItems.map((item) =>
      item.id === "cards" ? { ...item, disabled: true } : item
    ),
  },
};

export const ThreeItems: Story = {
  args: {
    items: defaultItems.slice(0, 3),
  },
};

export const CustomAriaLabel: Story = {
  args: {
    ariaLabel: "Navegación principal de Allaria+",
  },
};

export const CustomClassName: Story = {
  args: {
    className: "custom-navbar",
  },
};

const HIDE_THRESHOLD_PX = 16;
const SCROLL_DELTA_PX = 4;

const ScrollAwareFrame = ({ children }: { children: ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lastScrollTop = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const current = el.scrollTop;
      const delta = current - lastScrollTop.current;
      if (Math.abs(delta) < SCROLL_DELTA_PX) return;
      if (delta > 0 && current > HIDE_THRESHOLD_PX) setHidden(true);
      else if (delta < 0) setHidden(false);
      lastScrollTop.current = current;
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        width: 360,
        height: 640,
        border: "1px solid #eee",
        borderRadius: 24,
        position: "relative",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <div
        ref={scrollRef}
        style={{
          height: "100%",
          overflowY: "auto",
          padding: "16px 16px 96px",
          boxSizing: "border-box",
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 88,
              marginBottom: 12,
              borderRadius: 8,
              background: "#f4f5f7",
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          transform: hidden ? "translateY(100%)" : "translateY(0)",
          transition: "transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const WithScrollBehavior: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Scrolling down past the top of the page slides the navbar off-screen; any upward scroll brings it back immediately. The scroll-direction logic lives in a story wrapper, not in the component itself.",
      },
    },
  },
  decorators: [
    (Story) => (
      <ScrollAwareFrame>
        <Story />
      </ScrollAwareFrame>
    ),
  ],
};
