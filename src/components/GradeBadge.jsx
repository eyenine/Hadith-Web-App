export default function GradeBadge({ grade }) {
  const col = grade === "Sahih" ? "#4BC996"
    : grade === "Hasan Sahih" ? "#4B9FC9"
    : "#C9A84C";
  return (
    <span style={{
      fontSize:10, fontWeight:600, letterSpacing:"0.08em",
      background: col + "22", color: col,
      border: `1px solid ${col}44`,
      borderRadius:4, padding:"2px 8px",
      fontFamily:"'Lora', serif", textTransform:"uppercase"
    }}>{grade}</span>
  );
}
