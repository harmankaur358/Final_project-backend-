export interface Forecast {
  id?: string;           
  locationId: string;     
  temperature: number;    
  humidity: number;       
  windSpeed: number;     
  date?: string;          
}
