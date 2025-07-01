import axios from "axios";

export default async function fetchData(url: string) {
    try {
        const response = await axios.get(
            `${process.env.APP_API_BASE_URL}${url}`
        );
        return response.data;
    } catch (error) {
        return error;
    }
}
