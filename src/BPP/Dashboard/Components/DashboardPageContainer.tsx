import { DashboardProps } from "../../Interfaces";
import { DashboardPageTitle } from "./DashboardPageTitle";
import { Dashboard } from "../DashboardPage";

export const DashboardPageContainer = ({ dashboard }: DashboardProps) => (
    <>
        <DashboardPageTitle title={dashboard.header.title} showFullScreen={dashboard.header.showFullScreen} />

        <div className="overflow-y-auto overflow-x-hidden" style={{ height: "calc(100% - 50px)" }}>
            <Dashboard settings={dashboard.dashboardContent.settings} />
        </div>
    </>
);
