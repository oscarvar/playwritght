import { test, expect } from '@playwright/test';
import Logeer from '../utils/Logger';
import {faker} from '@faker-js/faker' // nobres aleatorios

test('create a new pet', async ({ request }) => {

     const newPetRequest = {
          name: faker.animal.cat(),
          type: "Perro",
          age: 2
     }

     Logeer.info('created a pet')

     const NewResponse = await request.post('http://localhost:3000/pets', {
          data: newPetRequest,
          headers: {
               'Content-Type': 'application/json',
               'User-Agent': 'PostmanRuntime/7.43.0'
          }
     })


     console.log(JSON.stringify(await NewResponse.json()))
     const newpentJsonResponse = await NewResponse.json()

     const headers = NewResponse.headersArray()
     headers.forEach(cabecera => console.log(`name: ${cabecera.name} value: ${cabecera.value}`))

     const keeAliveHeader = headers.filter(header => header.name === 'Keep-Alive')[0].value
     console.log('keep Alieve Header Value', keeAliveHeader)

     expect(NewResponse.status()).toBe(201)
     expect(newpentJsonResponse.status).toBe("success")
     expect(newpentJsonResponse.message).toContain("Pet")
     expect(newpentJsonResponse.data.name).toBe(newPetRequest.name)
     expect(newpentJsonResponse.data.type, "el tipo de mascota no es la esperada").toBe(newPetRequest.type)

     expect(newpentJsonResponse.data.id).toBeTruthy()


     console.log("status:", newpentJsonResponse.status)
     console.log("smessage:", newpentJsonResponse.message)
     console.log("data type:", newpentJsonResponse.data.type)
     Logeer.error('Ocurrio un error')
     Logeer.info('Pet was created successfully')

});

test('should update a pet', async ({ request }) => {



     const newPetRequest = {
          name: "AKIRA",
          type: "GATO",
          age: 5
     }
     const NewResponse = await request.post('http://localhost:3000/pets', { data: newPetRequest })
     const NewResponseJson = await NewResponse.json()
     const PetId = NewResponseJson.data.id



     const updatePetRequest = {
          name: "ROSAX",
          type: "VACA",
          age: 6
     }
     const updatePetResponse = await request.put('http://localhost:3000/pets/' + PetId, { data: updatePetRequest })

     console.log(JSON.stringify(await updatePetResponse.json()))
});


test('should update Partially a pet', async ({ request }) => {

     const newPetRequest = {
          name: "AKIRA",
          type: "GATO",
          age: 5
     }
     const NewResponse = await request.post('http://localhost:3000/pets', { data: newPetRequest })
     const NewResponseJson = await NewResponse.json()
     const PetId = NewResponseJson.data.id



     const updatepartiallyPetRequest = {
          age: 55
     }
     const updatePetResponse = await request.patch('http://localhost:3000/pets/' + PetId, { data: updatepartiallyPetRequest })

     console.log(JSON.stringify(await updatePetResponse.json()))
});


test('should Delete  a pet', async ({ request }) => {

     const newPetRequest = {
          name: "AKIRA",
          type: "GATO",
          age: 5
     }
     const NewResponse = await request.post('http://localhost:3000/pets', { data: newPetRequest })
     const NewResponseJson = await NewResponse.json()
     const PetId = NewResponseJson.data.id


     const DeletePetResponse = await request.delete('http://localhost:3000/pets/' + PetId)
     console.log(DeletePetResponse.status())
});


test('should GET a pet by ID', async ({ request }) => {

     const newPetRequest = {
          name: "tobby",
          type: "Perro",
          age: 9
     }
     const NewResponse = await request.post('http://localhost:3000/pets', { data: newPetRequest })
     const NewResponseJson = await NewResponse.json()
     const PetId = NewResponseJson.data.id


     const GetPetbyidResponse = await request.get('http://localhost:3000/pets/' + PetId)
     console.log("Response", await GetPetbyidResponse.json())
});

test('should GET all a pet', async ({ request }) => {

     const GetAllPetResponse = await request.get('http://localhost:3000/pets/')
     console.log("Response", await GetAllPetResponse.json())
});


test('should do basic authentication', async ({ request }) => {

     const credencialBase64 = btoa('admin:password123')

     const BasicAuthenticaioResponse = await request.get('http://localhost:3000/protected-basic', {
          headers: {
               //Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM='
               Authorization: `Basic ${credencialBase64}`
          }
     })
     console.log("Response Status", BasicAuthenticaioResponse.status())
     console.log("Response Text", await BasicAuthenticaioResponse.text())
});


test('should do bear authentication', async ({ request }) => {

     const authenticationTokenResponse = await request.post('http://localhost:3000/login', {
          data: { "username": "automation" }
     })

     const jsonResponse = await authenticationTokenResponse.json()
     const token = jsonResponse.data.accessToken
     console.log(`Token: ${token}`)

     const bearerResponse = await request.get('http://localhost:3000/protected-bearer', {
          headers: {
               'authorization': `Bearer ${token}`
          }
     })
     expect(bearerResponse.status()).toBe(200)
     expect(await bearerResponse.text()).toBe('Hello automation, you have accessed a protected endpoint!')

})
