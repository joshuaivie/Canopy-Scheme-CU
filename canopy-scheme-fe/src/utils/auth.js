export function isLoggedIn() {
    return (
        localStorage.getItem("authToken") !== null ||
        localStorage.getItem("authToken") === ""
    );
}
