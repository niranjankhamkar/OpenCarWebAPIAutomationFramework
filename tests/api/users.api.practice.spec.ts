import { test, expect, APIResponse } from '@playwright/test'

let AUTH_TOKEN = {
    Authorization: 'Bearer 811c66ce07ae4c4510a0e2a75eb321d7e19686cc1e1171d946d3ebc8f5b9060e'
};

//1.get all User
test('get all user GET api test', async ({ request }) => {
    let response: APIResponse = await request.get('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN
    });
    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());
    expect(response.status()).toBe(200);
});

//2.Create User
test('Create user POST api test', async ({ request }) => {
    //user JS Object
    let userData = {
        name: "Niranjan Khamkar",
        email: `niranjan_${Date.now()}@gmail.com`,
        gender: "male",
        status: "active"
    }
    //JS Object --> JSON (called Serialization)

    let response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    });
    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status());//201
    console.log(response.statusText());//created
    expect(response.status()).toBe(201);
});

//3.Update User
test('Update user by PUT api test', async ({ request }) => {
    //user JS Object
    let userData = {
        name: "Niranjan Vitthal Khamkar",
        email: "niranjan1121@gmail.com",
        gender: "male",
        status: "active"
    }
    //JS Object --> JSON (called Serialization)

    let response = await request.put('https://gorest.co.in/public/v2/users/8635616', {
        headers: AUTH_TOKEN,
        data: userData
    });
    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status());//200
    console.log(response.statusText());//OK
    expect(response.status()).toBe(404);//200
});

//4.Delete User
test('Delete user by DELETE api test', async ({ request }) => {

    let response = await request.delete('https://gorest.co.in/public/v2/users/8635616', {
        headers: AUTH_TOKEN,
    });
    console.log(response.status());//204
    console.log(response.statusText());//No Content
    expect(response.status()).toBe(404);//204
});