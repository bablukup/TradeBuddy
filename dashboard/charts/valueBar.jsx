import React from "react";

export default function valueBar({ metrics, selected, onChange }) {
  // Find percentage fill based on the selected metric value vs max
  const max = Math.max(...metrics.map((m) => Math.abs(m.value)), 1);
  const percent = (Math.abs(metrics[selected].value) / max) * 100;
  const getBarColor = (idx) => {
    if (idx === 2) return metrics[idx].value >= 0 ? "#4BC0C0" : "#FF6384";
    return "#4285f4";
  };

  return (
    <div style={{ padding: "24px 0" }}>
      <div
        style={{
          background: "#e3e3e3",
          borderRadius: "8px",
          height: "36px",
          width: "100%",
          overflow: "hidden",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percent}%`,
            background: getBarColor(selected),
            transition: "width 0.4s",
          }}
        />
      </div>

      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}
      >
        <span style={{ fontSize: "24px", marginRight: "18px" }}>
          ₹{metrics[selected].value}
        </span>
        {metrics.map((m, idx) => (
          <label
            key={m.label}
            style={{ marginRight: "12px", cursor: "pointer" }}
          >
            <input
              type="radio"
              checked={selected === idx}
              onChange={() => onChange(idx)}
              style={{ marginRight: "6px" }}
            />
            {m.label}
          </label>
        ))}
      </div>
    </div>
  );
}
