import { test, expect } from '../../src/fixtures/apifixtures'

const TOKEN = process.env.API_TOKEN!;

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
};

let userId: number;

test.describe.serial('running e2e(EndToEnd) rest crud apis tests', () => {
    //GET Test :
    test('GET API TEST PAGE- get all users', async ({ apiHelper }) => {
        console.log("GET API START......");
        let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    })

    //POST :
    test('POST API TEST PAGE - create a user', async ({ apiHelper }) => {
        console.log("POST API START......");
        //User JS Object
        let userData = {
            name: "Niranjan Khamkar",
            email: `niranjan_${Date.now()}@gmail.com`,
            gender: "male",
            status: "active"
        };

        let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
        expect(response.status).toBe(201);
        userId = response.body.id;
        console.log("created user id : ", userId);
    })

    //PUT :
    test('PUT API TEST PAGE - update a user', async ({ apiHelper }) => {
        console.log("PUT API START......");
        //User JS Object
        let userData = {
            name: "Niranjan Updated Name",
            status: "inactive"
        };
        console.log((`/public/v2/users/${userId}`));
        let response = await apiHelper.put(`/public/v2/users/${userId}`, userData, AUTH_HEADER);
        expect((response).status).toBe(200);
        expect(response.body.name).toBe(userData.name);
        expect(response.body.status).toBe(userData.status);
    })

    //DELETE :
    test('DELETE API TEST PAGE - delete a user', async ({ apiHelper }) => {
        console.log("DELETE API START......");
        let response = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER);
        expect(response.status).toBe(204);

    })
})