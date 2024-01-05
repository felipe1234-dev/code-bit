function getNameInitials(name: string) {
    return name
        .split(" ")
        .map((word) => word[0])
        .join("");
}

export default getNameInitials;
export { getNameInitials };
