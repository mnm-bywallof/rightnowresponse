export interface Breakdown {
    companyName: string,
    driverName: string,
    registrationNumber: string,
    breakdownDate: Date | string,
    reference: string | undefined,
    id?: string
}

const companies = ["RNR (Pty) Ltd","Anti-crash Team (Pty) Ltd", "AAA","ReadyAndWaiting LTD"]
const drivers = ["Riaz Hlatshwayo","Mr. Crosby","Sinethemba Dladla","Ibrahim Hlatshwayo","France Hlatshwayo","Jenette Sibahle"]
const registrations = ["LR 32 RP GP","LR 29 RP NG","LR 32 RP GP","LU 1 AA GP","LR 22 PP NU","CR 32 RP MP"]

export function generateRandomResponse() : Breakdown{
    return {
        companyName:getRandomElement(companies),
        driverName:getRandomElement(drivers),
        registrationNumber:getRandomElement(registrations),
        breakdownDate: new Date().toString(),
        reference: ""
    }
}

function getRandomElement(array:Array<any>) {
    // Get the array length
    const length = array.length;
    
    // Generate a random decimal between 0 and length (but not including length)
    const randomIndex = Math.floor(Math.random() * length);
    
    // Return the element at the random index
    return array[randomIndex];
  }