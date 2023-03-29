import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/login";

export function AuthService() {
    const login = (username, password) => {
            return axios
                .post(API_URL + "signin", {
                    username,
                    password
                })
                .then(response => {
                    if (response.data.accessToken) {
                        localStorage.setItem("user", JSON.stringify(response.data));
                    }

                    return response.data;
                });
        }
    const logout = () => {
            localStorage.removeItem("user");
        }

    const register = (username, email, password) => {
            return axios.post(API_URL + "signup", {
                username,
                email,
                password
            });
        }

    const getCurrentUser = () => {
            return JSON.parse(localStorage.getItem('user'));
        }
}
