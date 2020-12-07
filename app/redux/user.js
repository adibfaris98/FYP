export const setUser = (user) => {
    return {
        type: "SET_USER",
        payload: user
    }
}

const userReducer = (user = null, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...user,
                ...action.payload
            }
        default:
            return user
    }
}

export default userReducer