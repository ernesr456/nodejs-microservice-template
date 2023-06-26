import { test } from 'tap'
import { build } from '../helper'
import { faker }  from '@faker-js/faker'
// import prisma from '../../src/db';


test('POST register an account /auth/register', async (t) => {
    // Arrange
    const app = await build(t);
  
    // t.teardown(()=>{
    //   app.close();
    // })
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const payload = {username: username, password:password, confirmPassword: password};
    // Act

    const response = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload
    });
    t.teardown(async()=>{
        app.close();
        // await prisma.user.deleteMany({});
    })
    // Assert
    t.equal(response.statusCode, 200);
    t.equal(response.headers["content-type"],"application/json; charset=utf-8");
    // const json = response.json();

    // t.equal(json.username,username);
  
});

test('POST register an account /auth/register', async (t) => {
    test('username and password is correct', async (t) => {
            // Arrange
        const app = await build(t);
    
        t.teardown(()=>{
          app.close();
        //   await prisma.user.deleteMany({});
        })
        const username = faker.internet.userName();
        const password = faker.internet.password();
        const payload = {username: username, password:password, confirmPassword: password};
        // Act

        const register = await app.inject({
            method: 'POST',
            url: '/auth/register',
            payload
        });
        console.log('res.payload', register.payload);
        const response = await app.inject({
            method: 'POST',
            url: '/auth/login',
            body: payload,
            headers: {
                'Accept': 'application/json'
            }
        });

        t.equal(response.statusCode, 200);
    });
  
});


// test('POST login an account /auth/login', async (t) => {
//     test('username and password is correct', async (t) => {
        
//         const username = faker.internet.userName();
//         const password = faker.internet.password();
//         const register_payload = {username: username, password:password, confirmPassword: password};
//         const login_payload = {username: username, password:password};

//         console.log(login_payload);
//         console.log(register_payload);
        
//         const app = await build(t);
//         // t.teardown(async()=>{
//             // app.close();
//             // await prisma.user.deleteMany({});
//         // })

//         // Act
//         await app.inject({
//             method: 'POST',
//             url: '/auth/register',
//             register_payload
//         });

//         t.teardown(async()=>{
//             app.close();
//             // await prisma.user.deleteMany({});
//         })
        
//         const response = await app.inject({
//             method: 'POST',
//             url: '/auth/login',
//             payload: login_payload
//         });

//         t.equal(response.statusCode, 200);
        
//         // const verified = app.jwt.verify(response.json().accessToken);

//         // t.equal(verified.username,username);
//         // t.equal(verified.id, "number")
//         // t.equal(verified.accessToken, "number")
//     })
  
// });