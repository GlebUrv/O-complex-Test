import { Outlet } from "react-router";

export function Layout(): React.JSX.Element {
  return (
    <div>
      <Outlet />
    </div>
  );
}
