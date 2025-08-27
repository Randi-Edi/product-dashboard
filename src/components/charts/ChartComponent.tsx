import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CHART_HEIGHT } from "../../utils/constants";
import type { ChartData } from "../../types";

interface ChartComponentProps {
  type: "pie" | "column";
  data: ChartData[];
  title: string;
  height?: number;
  category?: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  type,
  data,
  title,
  height = CHART_HEIGHT,
  category,
}) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  const chartOptions: Highcharts.Options = {
    chart: {
      type,
      height,
    },
    title: {
      text: title,
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      pointFormat:
        type === "pie" ? "<b>{point.name}</b>" : "Price: <b>${point.y}</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
      column: {
        colorByPoint: true,
        dataLabels: {
          enabled: false,
        },
      },
    },
    xAxis:
      type === "column"
        ? {
            type: "category",
            labels: {
              style: {
                fontSize: "12px",
              },
            },
          }
        : undefined,
    yAxis:
      type === "column"
        ? {
            title: {
              text: category ? category : "Price ($)",
            },
          }
        : undefined,
    legend: {
      enabled: type === "pie",
      align: "right",
      verticalAlign: "middle",
      layout: "vertical",
    },
    series: [
      {
        name: type === "pie" ? "Categories" : "Price",
        data,
        type,
      } as any,
    ],
  };

  useEffect(() => {
    // Trigger reflow when component mounts to ensure proper rendering
    if (chartRef.current) {
      Highcharts.charts.forEach((chart) => {
        if (chart) chart.reflow();
      });
    }
  }, [data]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
};

export default ChartComponent;
