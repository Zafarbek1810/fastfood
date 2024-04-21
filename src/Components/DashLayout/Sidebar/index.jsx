import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import UserContext from "../../../Context/UserContext";
import MyLink from "../../Common/MyLink";
import { SidebarWrapper } from "./Sidebar.style";
import MenuSvg from "../../Common/Svgs/MenuSvg";
import MenuPriceSvg from "../../Common/Svgs/MenuPriceSvg";
import SettingSvg from "../../Common/Svgs/SettingSvg";
import ChartStatisticSvg from "../../Common/Svgs/ChartStatisticSvg";
import CompanySvg from "../../Common/Svgs/CompanySvg";
import VideoSvg from "../../Common/Svgs/VideoSvg";
import AudioSvg from "../../Common/Svgs/AudioSvg";

const NavListMenu = [
  {
    title: "Video qo'shish",
    path: "/ceo/home",
    src: <VideoSvg />,
    role: ["ROLE_CEO"],
  },
  {
    title: "Audio qo'shish",
    path: "/ceo/audio",
    src: <AudioSvg />,
    role: ["ROLE_CEO"],
  },
  {
    title: "Audiolar ro'yhati",
    path: "/ceo/audio-list",
    src: <AudioSvg />,
    role: ["ROLE_CEO"],
  },
  {
    title: "Sozlamalar",
    path: "/ceo/users",
    src: <SettingSvg />,
    role: ["ROLE_CEO"],
  },
  {
    title: "Statistika",
    path: "/admin/statistika",
    src: <ChartStatisticSvg />,
    role: ["ROLE_ADMIN"],
  },
  {
    title: "Kategoriya qo'shish",
    path: "/admin/add-category",
    src: <MenuSvg />,
    role: ["ROLE_ADMIN"],
  },
  {
    title: "Menyu qo'shish",
    path: "/admin/add-price",
    src: <MenuPriceSvg />,
    role: ["ROLE_ADMIN"],
  },
  {
    title: "Company qo'shish",
    path: "/admin/company",
    src: <CompanySvg />,
    role: ["ROLE_ADMIN"],
  },
];

const Sidebar = () => {
  const router = useRouter();

  const userRole = useContextSelector(
    UserContext,
    (ctx) => ctx.state.user?.roles
  );

  const UmumiyListMenu = NavListMenu.filter(({ role }) =>
    role.includes(userRole)
  );

  return (
    <SidebarWrapper>
      <div className="sidebar-menu">
        {UmumiyListMenu.map(({ title, src, path }, idx) => (
          <MyLink
            className={router.pathname === path ? "activelink" : "link"}
            to={path}
            key={idx}
          >
            {src}
            {title}
          </MyLink>
        ))}
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
