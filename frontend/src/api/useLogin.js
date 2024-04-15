import { api } from "./api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const login = async (credentials) => {
    const response = await api
        .post(`/login`, credentials)
        .then((res) => res.data);
    return response;
};

export const useLogin = () => {
    const navigate = useNavigate();

    const { mutate: signInMutation, isPending } = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            localStorage.setItem("TOKEN", data.token);
            if (data.user.role === "doctor") navigate("/doctor/cabinet");
            else navigate("/cabinet");
        },
        onError: () => {
            toast.error("Invalid email or password!");
        },
    });

    return [signInMutation, isPending];
};
