import { APIRequestContext } from "@playwright/test";

export class ApiHelper {

    private readonly request: APIRequestContext;
    private readonly baseURL: string;

    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request,
            this.baseURL = baseURL
    }

    //helper methods:
    //GET
    async get(endPoint: string, headers?: Record<string, string>) {
        console.log("GET API HELPER PAGE");
        let response = await this.request.get(`${this.baseURL}${endPoint}`, {
            headers: headers
        });
        console.log(await response.json(), await response.status());
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //POST
    async post(endPoint: string, data: object, headers?: Record<string, string>) {
        console.log("POST API HELPER PAGE");
        let response = await this.request.post(`${this.baseURL}${endPoint}`, {
            headers: headers,
            data: data
        });
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //PUT
    async put(endPoint: string, data: object, headers?: Record<string, string>) {
        console.log("PUT API HELPER PAGE");
        let response = await this.request.put(`${this.baseURL}${endPoint}`, {
            headers: headers,
            data: data
        });
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //DELETE
    async delete(endPoint: string, headers?: Record<string, string>) {
        console.log("DELETE API HELPER PAGE");
        let response = await this.request.delete(`${this.baseURL}${endPoint}`, {
            headers: headers
        });
        console.log(response.status);

        return {
            status: response.status()
        }
    }
}