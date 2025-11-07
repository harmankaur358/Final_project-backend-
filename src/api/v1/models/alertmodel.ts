export interface Alert {
  id?: string;            
  locationId: string;      
  type: "Storm" | "Rain" | "Snow" | "Heat" | "Cold"; 
  description: string;   
  severity: "Low" | "Medium" | "High" | "Critical";
  startTime: string;      
  endTime: string;        
}
