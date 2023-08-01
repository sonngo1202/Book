function ChangeNumber(number) {
    const convertedNumber = Number(number);
    if (isNaN(convertedNumber)) {
        return "Invalid number";
    }
    return convertedNumber.toLocaleString();
}
export default ChangeNumber;