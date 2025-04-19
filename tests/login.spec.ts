import { test, expect } from '@playwright/test';

test('Login partners', async ({ request }) => {
  
    const usuario = {
      username: "marenas-emisor",
      password: "Testing30%"
    };
  
    // Realizamos la solicitud POST para obtener el token
    const response = await request.post('https://partners-api-qa.wingostg.com/v1/login', {
      data: usuario
    });
  
    // Aseguramos que la respuesta fue exitosa
    expect(response.ok()).toBeTruthy();
  
    // Extraemos el cuerpo de la respuesta como JSON
    const responseBody = await response.json();
  
    // Accedemos al campo "response" dentro del cuerpo de la respuesta
    const token = responseBody.response;
  
    console.log('Token:', token); // Imprimimos el token
    
    // Puedes usar 'token' en el siguiente paso, según lo necesites.
  })

