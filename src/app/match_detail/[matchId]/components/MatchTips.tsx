import React from "react";

const MatchTips: React.FC = ({}) => {
  return (
    <div className="w-full sm:w-auto h-auto bg-[#2E2E30] rounded-xl p-3 shadow text-white">
      <p>
        <span className="text-sm font-semibold">
          Data Scope and Assumptions
        </span>
        <br />
        <ul>
          <li className="text-xs p-2  text-gray-200">
            <span className="font-bold text-white">Head-to-Head Games:</span>{" "}
            All Head-to-Head (H2H) statistics are based on matches played over
            the <span className="font-bold text-white">last 5 years</span>.
          </li>
          <li className="text-xs p-2  text-gray-200">
            <span className="font-bold text-white">
              Standard Deviation (SD):
            </span>{" "}
            graphs for <span className="font-bold text-white">Corners</span> and{" "}
            <span className="font-bold text-white">Shots on Target</span> are
            also derived from H2H data from the{" "}
            <span className="font-bold text-white">past 5 years</span>.
          </li>
          <li className="text-xs p-2  text-gray-200">
            <span className="font-bold text-white">Correlation Table:</span>{" "}
            This uses data from the{" "}
            <span className="font-bold text-white">last 3 years only</span>.
          </li>
          <li className="text-xs p-2  text-gray-200">
            <span className="font-bold text-white">
              Time Distribution Assumption:
            </span>{" "}
            It is assumed that{" "}
            <span className="font-bold text-white">Corners</span> and{" "}
            <span className="font-bold text-white">Shots on Target</span> are
            distributed evenly across the{" "}
            <span className="font-bold text-white">90 minutes of play</span>.
          </li>
        </ul>
        <span className="text-sm font-semibold">How to Use These Metrics</span>
        <ul>
          <li className="text-xs p-2 text-gray-200">
            If <span className="font-bold text-white"></span>in-play data shows
            values that fall{" "}
            <span className="font-bold text-white">
              outside the standard deviation range
            </span>
            , and the{" "}
            <span className="font-bold text-white">correlation table</span>{" "}
            indicates{" "}
            <span className="font-bold text-white">
              a positive relationship
            </span>
            , you can assess whether a team is likely{" "}
            <span className="font-bold text-white">overperforming</span> or{" "}
            <span className="font-bold text-white">underperforming</span>{" "}
            relative to historical trends. This insight can support more
            informed, real-time decisions.
          </li>
        </ul>

        <span className="text-sm font-semibold">
          About Value 4 Money (V4M) Charts
        </span>
        <ul>
          <li className="text-xs p-2 text-gray-200">
            The <span className="font-bold text-white">V4M charts</span> are{" "}
            <span className="font-bold  text-white"></span>not designed to
            guarantee wins.
            <span /> Instead, they aim to highlight the{" "}
            <span className="font-bold  text-white">
              maximum potential return
            </span>
            based on a{" "}
            <span className="font-bold  text-white">
              calculated level of risk.
            </span>{" "}
            They are a tool to help identify value opportunities—not assurances.
          </li>
        </ul>
      </p>
    </div>
  );
};

export default MatchTips;
