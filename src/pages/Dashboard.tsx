import React, { Suspense } from "react";
import { useFilter } from "../context/FilterContext";

const ChartComponent = React.lazy(
  () => import("../components/charts/ChartComponent")
);

const Dashboard: React.FC = () => {
  const { reportData, reportType, reportTitle, runReport, category } =
    useFilter();

  return (
    <div className="h-full w-full p-6 flex flex-col gap-6">
      {runReport && (
        <h2 className="text-2xl font-bold">Products in Selected Category</h2>
      )}

      <Suspense fallback={<div>Loading chart...</div>}>
        {reportData.length > 0 ? (
          <ChartComponent
            type={reportType}
            title={reportTitle}
            data={reportData}
            category={category}
          />
        ) : (
          <p>No data available</p>
        )}
      </Suspense>
    </div>
  );
};

export default Dashboard;
