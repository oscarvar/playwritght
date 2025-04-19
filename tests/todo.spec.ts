import { test, expect } from '@playwright/test';

test.describe('LOGIN', () => {

    let token = '';  // Variable para almacenar el token globalmente

    // Configuramos antes de todos los tests
    test.beforeAll(async ({ request }) => {
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
        token = responseBody.response;

        // console.log('Token:', token); // Imprimimos el token

        // Verifica que el token esté presente
        //expect(token).toBeDefined();
    });

    // Test 1: Check availability utilizando el token obtenido del login
    test('Check availability with parameters', async ({ request }) => {
        // Aseguramos que el token esté disponible
        expect(token).toBeDefined(); // Verificamos que el token no esté vacío

        // Parametrización de los valores
        const params = {
            origin: 'BOG',           // Ciudad de origen
            destination: 'CLO',      // Ciudad de destino
            outboundDate: '2025-04-17', // Fecha de salida
            returnDate: '2025-04-18',   // Fecha de retorno
            flightType: 'RT',        // Tipo de vuelo (ida y vuelta)
            currency: 'COP',         // Moneda
            language: 'ES',          // Idioma
            adults: 3,               // Número de adultos
            child: 1,                // Número de niños
            infants: 1               // Número de infantes
        };

        // Realizamos la solicitud GET con los parámetros parametrizables
        const response = await request.get('https://partners-api-qa.wingostg.com/v1/getAvailability', {
            params: params,
            headers: {
                'Authorization': `Bearer ${token}`, // Incluimos el token en el header
            }
        });

        // Verificamos que la respuesta fue exitosa
        expect(response.ok()).toBeTruthy();

        // Obtenemos el cuerpo de la respuesta como JSON
        const responseBody = await response.json();
        console.log('Availability Response:', JSON.stringify(responseBody));

        // Validaciones adicionales, como verificar que la respuesta contenga "availability"
        //expect(responseBody).toHaveProperty('availability');  // Verificar que el campo "availability" esté presente
    });

});
