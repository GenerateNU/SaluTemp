import { EntryInfo } from "../types";

export async function GetEntryInfo(): Promise<EntryInfo[]> {
    const medInfo: EntryInfo[] = [
        {nickname: "med",
         expirationDate: "11/11/11",
          notes: "woah!",
           maxTemp: "80",
            minTemp: "60",
             maxHumidity: "70",
              minHumidity: "70",
               maxLight: "22",
                minLight: "10" }
    ]
    return medInfo;
}