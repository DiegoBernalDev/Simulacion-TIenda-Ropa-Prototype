# Sistema de Punto de Venta - Boutique de Ropa
### Implementación de Patrones de Diseño de Software (GoF)

**Estudiante:** Amilcar Diego Revollo Bernal  
**Cuenta GitHub:** DiegoBernalDev  
**Entorno de Ejecución:** Node.js (v16.0 o superior)  
**Lenguaje:** JavaScript (ES6+)  
**Interfaz:** Consola Interactiva (CLI)

---

## 1. Descripción del Caso de Uso

El sistema modela el flujo comercial de un punto de venta en el mostrador de una **boutique de ropa urbana y de marca**, operando sobre un inventario y stock ya existente de prendas terminadas.

El flujo permite:
1. Consultar y seleccionar prendas del catálogo disponible (dividido por departamentos Streetwear y Alta Gama).
2. Añadir servicios opcionales de mostrador en tiempo de ejecución (empaquetado en bolsa exclusiva de la boutique y kit de mantenimiento textil).
3. Aplicar políticas comerciales dinámicas de cobro en caja (precio de etiqueta regular, descuento de temporada o liquidación de saldo).
4. Emitir un recibo o nota de venta oficial y detallada con importes calculados en bolivianos (Bs.).

---

## 2. Patrones de Diseño Implementados

### A. Patrón Creacional: Factory Method
* **Problema que resuelve:** Evita que el flujo de venta esté rígidamente acoplado con la instanciación directa (`new`) de cada tipo de prenda del catálogo.
* **Implementación:**
  * La clase abstracta `CatalogoStockFactory` define el método de despacho `despacharPrenda()`.
  * Existen dos fábricas concretas según la categoría comercial: `CatalogoStreetwearFactory` (gestiona poleras Tie-Dye, pantalones Baggy, gorras NBA y poleras manga cero) y `CatalogoAltaGamaFactory` (gestiona chamarras de jean, canguros Chrome Hearts, mochilas Essentials y poleras con pedrería).
* **Beneficio:** Si la tienda incorpora una nueva línea (ej. calzados deportivos), solo se añade una nueva factoría sin alterar la lógica de venta existente.

### B. Patrón Estructural: Decorator
* **Problema que resuelve:** Permite agregar servicios opcionales de valor agregado en el mostrador sin recurrir a una explosión combinatoria de subclases de herencia estática.
* **Implementación:**
  * `ServicioMostradorDecorator` implementa la misma interfaz base que `Prenda` y envuelve una referencia interna de la prenda adquirida.
  * Los decoradores concretos `BolsaExclusivaDecorator` (+Bs. 15.00) y `KitCuidadoTextilDecorator` (+Bs. 35.00) añaden dinámicamente su descripción y recargo sobre el precio base en tiempo de ejecución.
* **Beneficio:** Cumple con el principio Open/Closed (OCP), permitiendo envolver múltiples servicios acumulativos de forma limpia.

### C. Patrón de Comportamiento: Strategy
* **Problema que resuelve:** Elimina estructuras condicionales anidadas (`if`/`else` o `switch`) dentro de la caja registradora para determinar el total a cobrar, permitiendo que la política de cobro sea intercambiable dinámicamente.
* **Implementación:**
  * Se formaliza la interfaz `PoliticaCobro` con el método `calcularTotal(subtotal)`.
  * Se implementan las estrategias concretas:
    * `PrecioEtiquetaRegularStrategy`: Cobro regular (100% del subtotal).
    * `PromocionTemporadaStrategy`: Aplica un 15% de descuento comercial.
    * `LiquidacionSaldoStrategy`: Aplica un 30% de descuento por liquidación de stock.
  * La clase `CajaRegistradora` recibe la estrategia seleccionada mediante composición y delega el cálculo de liquidación.
* **Beneficio:** Facilita la adición de nuevas campañas comerciales sin modificar la lógica interna de la caja registradora.

---

## 3. Validaciones y Control de Entrada

* **Filtro de caracteres especiales:** Bloquea caracteres como `"`, `@`, `#`, `$`, `%`, `<`, `>`, exigiendo texto alfabético válido para nombres de clientes y colores.
* **Prevención de campos vacíos:** No admite entradas en blanco.
* **Validación de menú y confirmaciones:** Restringe las respuestas numéricas a las opciones válidas del catálogo y las respuestas booleanas estrictamente a `S` o `N`.

---

##  4. Guía de Ejecución

### Requisitos Previos
* [Node.js](https://nodejs.org/) instalado (versión 16.0 o superior).

### Instrucciones
1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/DiegoBernalDev/tienda-ropa-patrones.git](https://github.com/DiegoBernalDev/tienda-ropa-patrones.git)
   cd tienda-ropa-patrones
2. comando de ejecucion 
node tienda.js