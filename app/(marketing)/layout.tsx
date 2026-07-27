import Navbar from "../../components/Navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar appName="FlowDesk" links={[{ label: "Home", href: "/" }]} />
      {children}
    </>
  );
}