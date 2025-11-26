"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { HiArrowDownTray, HiArrowTrendingUp, HiArrowUpTray } from "react-icons/hi2";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaExchangeAlt } from "react-icons/fa";
import { HiCog6Tooth } from "react-icons/hi2";
import { FiUserPlus } from "react-icons/fi";
import { BiHistory } from "react-icons/bi";
import { BsTrophy } from "react-icons/bs";
import Link from "next/link"; 
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { BoxCubeIcon, ChevronDownIcon, PieChartIcon, PlugInIcon } from "../icons";
import { getUser } from "@/lib/appwrite/auth";
import { SiStockx } from "react-icons/si";
import { RiAdminFill, RiStockFill } from "react-icons/ri";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <TbLayoutDashboard size={18} />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <HiArrowTrendingUp size={18} />,
    name: "Investments",
    path: "/investments",
  },
  {
    icon: <BiHistory size={18} />,
    name: "Investments Logs",
    path: "/logs",
  },
  {
    icon: <RiStockFill size={18} />,
    name: "Shares",
    path: "/shares",
  },
  {
    icon: <SiStockx size={18} />,
    name: "Shares Logs",
    path: "/sharelogs",
  },
  {
    icon: <FaExchangeAlt size={18} />,
    name: "Transactions",
    path: "/transactions",
  },
  {
    icon: <HiArrowDownTray size={18} />,
    name: "Deposit",
    path: "/deposit",
  },
  {
    icon: <HiArrowUpTray size={17} />,
    name: "Withdrawal",
    path: "/withdraw",
  },
  {
    icon: <BsTrophy size={18} />,
    name: "Ranks",
    path: "/rank",
  },
  {
    icon: <FiUserPlus size={18} />,
    name: "Referrals",
    path: "/referral",
  },
  {
    icon: <HiCog6Tooth size={18} />,
    name: "Account settings",
    path: "/profile",
  },
];

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [user, setUser] = useState<string>();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();

      if (user.labels?.includes("admin")) {
        setUser("admin");
      } else {
        setUser("user");
      }
    };
    fetchUser();
  }, []);

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-2">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group cursor-pointer
                ${openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
                }
                ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}
              `}
            >
              <span
                className={
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto h-5 w-5 transition-transform duration-200
                    ${openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : "text-gray-500"
                    }
                  `}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group
                  ${isActive(nav.path)
                    ? "menu-item-active"
                    : "menu-item-inactive"
                  }
                `}
              >
                <span
                  className={
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}

          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item
                        ${isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                        }
                      `}
                    >
                      {subItem.name}
                      <span className="ml-auto flex items-center gap-1">
                        {subItem.new && (
                          <span
                            className={`menu-dropdown-badge ${isActive(subItem.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                              }`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`menu-dropdown-badge ${isActive(subItem.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                              }`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}

      {user === "admin" && (
        <li>
          <Link
            href="/controlPanel"
            className={`menu-item group ${isActive("/controlPanel")
              ? "menu-item-active"
              : "menu-item-inactive"
              }`}
          >
            <span
              className={
                isActive("/controlPanel")
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
              }
            >
              <RiAdminFill size={18} />
            </span>
            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="menu-item-text">Admin Panel</span>
            )}
          </Link>
        </li>
      )}
    </ul>
  );

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 mt-16 flex h-screen flex-col border-r
        px-4 lg:mt-0
        bg-white/95 text-gray-900 border-gray-200 shadow-lg
        dark:bg-gray-900/95 dark:text-gray-100 dark:border-gray-800
        backdrop-blur
        transition-all duration-300 ease-in-out
        ${isExpanded || isMobileOpen
          ? "w-[280px]"
          : isHovered
            ? "w-[280px]"
            : "w-[82px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div
        className={`
          flex items-center pt-7 pb-6
          ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}
        `}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex items-center gap-2 logo">
              <div className="logo-badge shrink-0">⚡</div>
              <div className="logo-text">
                <span className="logo-text-main">Flash Profits</span>
                <span className="logo-text-sub text-[10px]!">Automated investing</span>
              </div>
              {/* <Image
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Flash Profits"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Flash Profits"
                width={150}
                height={40}
              /> */}
            </div>
          ) : (
            <div className="logo flex h-10 w-10 items-center justify-center rounded-xl">
              <div className="logo-badge shrink-0">⚡</div>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <div className="flex flex-1 flex-col overflow-y-auto pb-6 no-scrollbar">
        <nav className="space-y-6">
          <div>
            {(isExpanded || isHovered || isMobileOpen) && (
              <h2 className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                Main
              </h2>
            )}
            {renderMenuItems(navItems, "main")}
          </div>

          {/* If you ever want “Others” back, uncomment this */}
          {/* <div>
            {(isExpanded || isHovered || isMobileOpen) && (
              <h2 className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                Others
              </h2>
            )}
            {renderMenuItems(othersItems, "others")}
          </div> */}
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
