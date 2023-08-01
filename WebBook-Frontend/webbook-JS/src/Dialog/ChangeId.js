function ChangeId(id) {
    const paddedId = String(id).padStart(8, '0');
    return paddedId;
}
export default ChangeId;