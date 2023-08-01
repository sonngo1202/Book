function ChangeDay(dateString) {
    const dateParts = dateString.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}
export default ChangeDay;