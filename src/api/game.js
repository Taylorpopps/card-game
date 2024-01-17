import axiosInstance from "./api";

export async function startGame(body) {
    const response = await axiosInstance.post("game", body);
    return response.data;
}

export async function guess(body) {
    const response = await axiosInstance.post("guess", body);
    return response.data;
}

export async function scores() {
    const response = await axiosInstance.post("scores", {});
    return response.data;
}
