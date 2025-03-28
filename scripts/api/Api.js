export default class ApiPhotographer {
    constructor(url) {
        this.url = url;
        this.data = this.getPhotographers();
    }

    async getPhotographers() {
        try {
            const response = await fetch(this.url);
            const data = await response.json();
            return data;
        } catch (err) {
            throw new Error("Network response was not ok:" + err);
        }
    }
}