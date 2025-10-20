export function formatChatTime(timestamp:string):string{
    const date = new Date(timestamp); // 2025-09-29
    const now = new Date();  // 2025-09-29

    const isToday =
    date.getDate() ===now.getDate() && // 29 ===29
    date.getMonth()===now.getMonth() && // 09 ===09
    date.getFullYear()=== now.getFullYear(); // 2025 ===2025

    const yesterday = new Date();
    yesterday.setDate(now.getDate()-1);

    const isYesterday = 
    date.getDate() ===yesterday.getDate() &&
    date.getMonth()===yesterday.getMonth()&&
    date.getFullYear() ===yesterday.getFullYear();

    const timeStr = date.toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit",
        hour12:true,
    });

    if(isToday) return timeStr; // 11.19 AM
    if(isYesterday) return `Yesterday ${timeStr}`; // yesterday 11.09 AM
    return `${date.toLocaleDateString()} ${timeStr}`; // 2025-09-26 11.09 AM


   
}