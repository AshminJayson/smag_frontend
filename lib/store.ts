type MenuOption = {
  label: string;
  value: string;
  state?: string;
};

const states = [
  { label: "Kerala", value: "KL" },
  { label: "Tamil Nadu", value: "TN" },
  { label: "Karnataka", value: "KA" },
];

const districts = [
  { label: "Malappuram", value: "MLP", state: "Kerala" },
  { label: "Kozhikode", value: "KZD", state: "Kerala" },
  { label: "Wayanad", value: "WYD", state: "Kerala" },
  { label: "Kannur", value: "KNR", state: "Kerala" },
  { label: "Kasaragod", value: "KSD", state: "Kerala" },
  { label: "Thrissur", value: "TSR", state: "Kerala" },
  { label: "Ernakulam", value: "EKM", state: "Kerala" },
  { label: "Idukki", value: "IDK", state: "Kerala" },
  { label: "Coimbatore", value: "CBR", state: "Tamil Nadu" },
  { label: "Chennai", value: "CHN", state: "Tamil Nadu" },
  { label: "Madurai", value: "MDR", state: "Tamil Nadu" },
  { label: "Salem", value: "SLM", state: "Tamil Nadu" },
  { label: "Tiruchirappalli", value: "TIR", state: "Tamil Nadu" },
  { label: "Tirunelveli", value: "TNI", state: "Tamil Nadu" },
  { label: "Tiruppur", value: "TPR", state: "Tamil Nadu" },
  { label: "Mysore", value: "MYS", state: "Karnataka" },
  { label: "Bengaluru", value: "BLR", state: "Karnataka" },
  { label: "Mangalore", value: "MNG", state: "Karnataka" },
  { label: "Belgaum", value: "BLG", state: "Karnataka" },
  { label: "Hubli", value: "HBL", state: "Karnataka" },
  { label: "Shimoga", value: "SMG", state: "Karnataka" },
  { label: "Gulbarga", value: "GLB", state: "Karnataka" },
  { label: "Davanagere", value: "DVG", state: "Karnataka" },
];

export { states, districts };
export type { MenuOption };
