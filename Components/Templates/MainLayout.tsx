import React, { useState } from "react";
import Link from "next/link";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  IdcardOutlined,
  SolutionOutlined,
  ReconciliationOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  Button,
  theme,
  Dropdown,
  message,
  Space,
  MenuProps,
} from "antd";
import { usePathname } from "next/navigation";
import logo from "./rumah-rehab-logo.png";
import "./style.css";

const { Header, Content, Footer, Sider } = Layout;

const onClick: MenuProps["onClick"] = ({ key }) => {
  message.info(`Click on item ${key}`);
};

type MenuItem = Required<MenuProps>["items"][number];

const accountMenuItems: MenuItem[] = [
  {
    label: <Link href="/settings">Settings</Link>,
    key: "settings",
  },
  {
    label: (
      <a
        onClick={() => {
          alert("Logging out...");
        }}
      >
        Logout
      </a>
    ),
    key: "logout",
  },
];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href="/pasien">Pasien</Link>, "pasien", <IdcardOutlined />),
  getItem(
    <Link href="/tagihan">Tagihan</Link>,
    "tagihan",
    <SolutionOutlined />
  ),
  getItem(
    <Link href="/pembayaran">Pembayaran</Link>,
    "pembayaran",
    <ReconciliationOutlined />
  ),
  getItem(<Link href="/mitra">Mitra</Link>, "mitra", <TeamOutlined />),
  getItem(
    <Link href="/pengaturan_user">Pengaturan User</Link>,
    "pengaturan_user",
    <UserOutlined />
  ),
  getItem(
    <Link href="/pengaturan_panti">Pengaturan Panti</Link>,
    "pengaturan_panti",
    <SettingOutlined />
  ),
];

interface Props {
  children: React.ReactNode;
}

const App: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const pathname = usePathname();

  // Extract the last part of the path and use it as the active key
  const activeKey = pathname.split("/").pop() ?? "";

  const breadcrumbItems = pathname
    .split("/")
    .filter(Boolean) // Remove empty parts
    .map((path, index, arr) => {
      const title = path.charAt(0).toUpperCase() + path.slice(1); // Capitalize the first letter
      const href = `/${arr.slice(0, index + 1).join("/")}`; // Construct the href based on the path

      return { title, href };
    });

  // Add "Dashboard" if path starts from root
  if (breadcrumbItems.length > 0 && pathname !== "/") {
    breadcrumbItems.unshift({
      title: "Dashboard",
      href: "/dashboard", // Set the first link to /dashboard
    });
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          minHeight: "100vh",
        }} /* Memastikan Sider memiliki tinggi penuh */
      >
        <div className="demo-logo-vertical">
          <Link href="/dashboard">
            <img src={logo.src} alt="Rumah Rehab Logo" />
          </Link>
        </div>
        <Menu
          theme="dark"
          selectedKeys={[activeKey]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "16px",
          }}
        >
          {/* Collapse button */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown
            overlay={
              <Menu
                items={accountMenuItems}
                style={{
                  border: "none",
                  background: "none", // Remove border and separator
                }}
              />
            }
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <UserOutlined />
                Username
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {breadcrumbItems.map((item, index) => (
              <Breadcrumb.Item key={index}>
                <Link href={item.href}>{item.title}</Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
