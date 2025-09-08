export function getDate(isoDate: string) {
    const dateNew = new Date(isoDate);
    const day = String(dateNew.getDate()).padStart(2, "0");
    const month = String(dateNew.getMonth() + 1).padStart(2, "0");
    const year = dateNew.getFullYear();
    return `${day}.${month}.${year}`
  } 