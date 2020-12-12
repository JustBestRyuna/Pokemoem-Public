import axios from 'axios';

export default axios.create({
    baseURL: "https://api.pokemoem.com/",
    headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/x-www-form-urlencoded",
    }
});