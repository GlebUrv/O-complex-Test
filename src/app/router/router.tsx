import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "@/pages";
import { Layout } from "../layout/Layout";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";

export function Router(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={CLIENT_ROUTES.HOME} element={<Layout />}>
          <Route path={CLIENT_ROUTES.HOME} element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
