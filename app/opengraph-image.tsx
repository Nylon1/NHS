import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sitora Medicines & Resource Intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"70px",background:"linear-gradient(135deg,#003087 0%,#005eb8 70%,#41a8e0 100%)",color:"white",fontFamily:"Arial, sans-serif"}}>
      <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
        <div style={{width:"70px",height:"70px",borderRadius:"18px",background:"white",color:"#003087",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"38px",fontWeight:900}}>S</div>
        <div style={{display:"flex",flexDirection:"column"}}><div style={{fontSize:"34px",fontWeight:900}}>Sitora</div><div style={{fontSize:"20px",opacity:.88}}>Medicines & Resource Intelligence</div></div>
      </div>
      <div style={{display:"flex",flexDirection:"column",maxWidth:"980px"}}>
        <div style={{fontSize:"62px",lineHeight:1.06,fontWeight:900,letterSpacing:"-2px"}}>Close medication gaps. Prevent avoidable supply. Verify resource recovery.</div>
        <div style={{fontSize:"24px",marginTop:"24px",opacity:.9}}>Independent medicines intelligence for NHS evaluation and controlled pilot testing.</div>
      </div>
      <div style={{fontSize:"18px",opacity:.75}}>medicineintelligence.sitora.co.uk</div>
    </div>,
    size,
  );
}
