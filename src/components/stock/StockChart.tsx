import React, { useMemo } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import type { StockData } from "@/types/stock";

interface StockChartProps {
  data: StockData[];
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  const chartOptions = useMemo(() => {
    const sortedData = [...data].sort(
      (a, b) =>
        new Date(a.ex_dividend_date).getTime() -
        new Date(b.ex_dividend_date).getTime()
    );

    const seriesData = sortedData.map((item) => ({
      x: new Date(item.ex_dividend_date).getTime(),
      y: item.cash_amount,
      name: item.ticker,
      ...item,
    }));

    const options: Highcharts.Options = {
      chart: {
        backgroundColor: "transparent",
        style: {
          fontFamily: "Inter, sans-serif",
        },
        height: 500,
      },
      rangeSelector: {
        selected: 4, // All
        inputEnabled: false,
        buttonTheme: {
          fill: "none",
          stroke: "none",
          "stroke-width": 0,
          r: 8,
          style: {
            color: "#6b7280",
            fontWeight: "bold",
          },
          states: {
            hover: {
              fill: "#f3f4f6", // gray-100
              style: {
                color: "#1f2937",
              },
            },
            select: {
              fill: "#eff6ff", // blue-50
              style: {
                color: "#3b82f6", // blue-500
              },
            },
          },
        },
      },
      title: {
        text: "",
      },
      yAxis: {
        title: {
          text: "Số tiền cổ tức",
        },
        labels: {
          format: "${value:.2f}",
          style: {
            color: "#9ca3af",
          },
        },
        gridLineColor: "#f3f4f6",
      },
      xAxis: {
        type: "datetime",
        labels: {
          style: {
            color: "#9ca3af",
          },
        },
        lineColor: "#e5e7eb",
        tickColor: "#e5e7eb",
      },
      tooltip: {
        shared: true,
        useHTML: true,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderColor: "#e5e7eb",
        borderRadius: 12,
        shadow: true,
        padding: 12,
        headerFormat:
          '<span style="font-size: 10px; color: #6b7280">{point.key}</span><br/>',
        pointFormatter: function () {
          const point = this as any;
          return `
            <div style="margin-top: 4px;">
              <span style="color: ${
                point.color
              }; font-size: 14px; font-weight: bold;">●</span>
              <span style="font-weight: 600; color: #1f2937;">${
                point.name
              }:</span>
              <span style="font-weight: bold; color: #111827;">$${point.y.toFixed(
                2
              )}</span>
              <br/>
              <span style="font-size: 11px; color: #6b7280;">Ngày trả: ${
                point.pay_date
              }</span>
            </div>
          `;
        },
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataGrouping: {
            enabled: true,
            units: [
              ["week", [1]],
              ["month", [1, 3, 6]],
              ["year", null],
            ],
          },
        },
        column: {
          borderRadius: 4,
        },
      },
      navigator: {
        enabled: true,
        maskFill: "rgba(59, 130, 246, 0.1)",
        series: {
          color: "#3b82f6",
          fillOpacity: 0.1,
        },
        xAxis: {
          gridLineColor: "#f0f0f0",
        },
      },
      scrollbar: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          type: "column",
          name: "Cổ tức",
          data: seriesData,
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, "#3b82f6"], // Blue-500
              [1, "#93c5fd"], // Blue-300
            ],
          },
          threshold: null,
        },
      ],
    };
    return options;
  }, [data]);

  if (data.length === 0) return null;

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Lịch sử Cổ tức</h3>
        <p className="text-sm text-gray-500">
          Lịch sử chi trả cổ tức và xu hướng
        </p>
      </div>
      <div className="w-full rounded-lg overflow-hidden">
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default StockChart;
