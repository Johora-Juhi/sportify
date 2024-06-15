import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { FacilityRoutes } from "../modules/Facility/facilty.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/facility",
    route: FacilityRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
