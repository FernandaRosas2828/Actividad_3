const request = require('supertest');
const app = require('../app');
const { calculateValue } = require('../lib/logic');

describe('Suite de Pruebas de Calidad de Software', () => {

  describe('Pruebas Unitarias - Lógica de Inventario', () => {
    test('Debe calcular correctamente el valor total (10 * 5 = 50)', () => {
      const result = calculateValue(10, 5);
      expect(result).toBe(50);
    });

    test('Debe retornar 0 si se ingresan valores negativos', () => {
      const result = calculateValue(-10, 5);
      expect(result).toBe(0);
    });
  });
  //------------------------------------------------------------------------------------------------
  //Mis Pruebas Unitarias
  //1.-Validar números grandes
  test('Debe calcular correctamente valores grandes', () => {
    const result = calculateValue(1000000, 1000);
    expect(result).toBe(1000000000);
  });
    //2.-Validar comportamiento con valores extremadamente pequeños
    test('Debe manejar valores extremadamente pequeños correctamente', () => {
    const result = calculateValue(0.0001, 0.0002);
    expect(result).toBeCloseTo(0.00000002);
  });
  //------------------------------------------------------------------------------------------------
  describe('Pruebas de Integración - API Endpoints', () => {
    test('GET /health - Debe responder con status 200 y JSON correcto', async () => {
      const response = await request(app).get('/health');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
    });

    test('GET /items - Debe validar la estructura del inventario', async () => {
      const response = await request(app).get('/items');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      // Validamos que el primer objeto tenga las propiedades requeridas
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('stock');
    });
  });
  //------------------------------------------------------------------------------------------------
  //Mis Pruebas de Integración
    //1.-Validar que /items no esté vacío
    test('GET /items - Validar que el inventario no esté vacío', async () => {
        const response = await request(app).get('/items');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    });
    //2.-Validar que todos los items tengan tipo de dato correcto
    test('GET /items - Todos los items deben tener tipos de datos correctos', async () => {
    const response = await request(app).get('/items');

    expect(response.statusCode).toBe(200);

    response.body.forEach(item => {
        expect(typeof item.id).toBe('number');
        expect(typeof item.stock).toBe('number');
    });
    });
  //------------------------------------------------------------------------------------------------
});