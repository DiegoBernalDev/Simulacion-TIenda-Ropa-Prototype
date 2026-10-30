const readline = require("readline");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function preguntarRaw(prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

async function solicitarTextoValido(mensaje) {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
  while (true) {
    const entrada = (await preguntarRaw(mensaje)).trim();
    if (entrada.length === 0) {
      console.log("   [!] Error: El campo no puede quedar vacío.");
      continue;
    }
    if (!regex.test(entrada)) {
      console.log("   [!] Error: Entrada inválida. No se admiten números ni símbolos como @, \", #, $, etc.");
      continue;
    }
    return entrada;
  }
}

async function solicitarOpcionMenu(mensaje, opcionesValidas) {
  while (true) {
    const entrada = (await preguntarRaw(mensaje)).trim();
    if (opcionesValidas.includes(entrada)) {
      return entrada;
    }
    console.log(`   [!] Opción inválida. Seleccione una de las siguientes opciones: [${opcionesValidas.join(", ")}]`);
  }
}

async function solicitarConfirmacion(mensaje) {
  while (true) {
    const entrada = (await preguntarRaw(mensaje)).trim().toUpperCase();
    if (entrada === "S" || entrada === "N") {
      return entrada;
    }
    console.log("   [!] Respuesta inválida. Escriba únicamente S (Sí) o N (No).");
  }
}


class Prenda {
  constructor(sku, marca, descripcion, precioEtiqueta, talla, color) {
    if (new.target === Prenda) {
      throw new Error("No se puede instanciar directamente la clase base Prenda.");
    }
    this.sku = sku;
    this.marca = marca;
    this.descripcion = descripcion;
    this.precioEtiqueta = precioEtiqueta;
    this.talla = talla;
    this.color = color;
  }

  obtenerDetalle() {
    return `[SKU: ${this.sku}] ${this.descripcion} (${this.marca}) | Talla: ${this.talla} | Color: ${this.color}`;
  }

  obtenerPrecio() {
    return this.precioEtiqueta;
  }
}

class PoleraTieDyeStock extends Prenda {
  constructor(marca, talla, color) {
    super("TIE-150", marca, "Polera básica Tie-Dye", 150.0, talla, color);
  }
}

class PantalonBaggyStock extends Prenda {
  constructor(marca, talla, color) {
    super("BAG-300", marca, "Pantalón corte Baggy", 300.0, talla, color);
  }
}

class GorraNbaStock extends Prenda {
  constructor(talla, color) {
    super("CAP-150", "NBA OFFICIAL", "Gorra Urbana NBA", 150.0, talla, color);
  }
}

class PoleraMangaCeroStock extends Prenda {
  constructor(talla, color) {
    super("MC-320", "DESTROYER", "Polera manga cero", 320.0, talla, color);
  }
}

class ChamarraJeanStock extends Prenda {
  constructor(talla, color) {
    super("CHA-380", "ZARAMAN", "Chamarra Jean Clásica", 380.0, talla, color);
  }
}

class CanguroCierreStock extends Prenda {
  constructor(talla, color) {
    super("CNG-450", "CHROME HEARTS", "Canguro exclusivo con cierre", 450.0, talla, color);
  }
}

class MochilaEssentialsStock extends Prenda {
  constructor(talla, color) {
    super("MOC-450", "ESSENTIALS", "Mochila Streetwear Essentials", 450.0, talla, color);
  }
}

class PoleraPedreriaStock extends Prenda {
  constructor(talla, color) {
    super("PED-450", "DESTROYER", "Polera de lujo con pedrería", 450.0, talla, color);
  }
}

class CatalogoStockFactory {
  despacharPrenda(codigoOpcion, subMarca, talla, color) {
    throw new Error("El método despacharPrenda() debe ser implementado.");
  }
}

class CatalogoStreetwearFactory extends CatalogoStockFactory {
  despacharPrenda(codigoOpcion, subMarca, talla, color) {
    switch (codigoOpcion) {
      case "1":
        return new PoleraTieDyeStock(subMarca, talla, color);
      case "2":
        return new PantalonBaggyStock(subMarca, talla, color);
      case "3":
        return new GorraNbaStock(talla, color);
      case "4":
        return new PoleraMangaCeroStock(talla, color);
      default:
        throw new Error("Código de producto inexistente en Línea Streetwear.");
    }
  }
}


class CatalogoAltaGamaFactory extends CatalogoStockFactory {
  despacharPrenda(codigoOpcion, subMarca, talla, color) {
    switch (codigoOpcion) {
      case "5":
        return new ChamarraJeanStock(talla, color);
      case "6":
        return new CanguroCierreStock(talla, color);
      case "7":
        return new MochilaEssentialsStock(talla, color);
      case "8":
        return new PoleraPedreriaStock(talla, color);
      default:
        throw new Error("Código de producto inexistente en Línea Alta Gama.");
    }
  }
}

class ServicioMostradorDecorator extends Prenda {
  constructor(articuloBase) {
    super(
      articuloBase.sku,
      articuloBase.marca,
      articuloBase.descripcion,
      articuloBase.precioEtiqueta,
      articuloBase.talla,
      articuloBase.color
    );
    this.articuloBase = articuloBase;
  }

  obtenerDetalle() {
    return this.articuloBase.obtenerDetalle();
  }

  obtenerPrecio() {
    return this.articuloBase.obtenerPrecio();
  }
}

class BolsaExclusivaDecorator extends ServicioMostradorDecorator {
  constructor(articuloBase) {
    super(articuloBase);
    this.costoBolsa = 15.0;
  }

  obtenerDetalle() {
    return `${this.articuloBase.obtenerDetalle()} + [Bolsa Exclusiva de la Tienda]`;
  }

  obtenerPrecio() {
    return this.articuloBase.obtenerPrecio() + this.costoBolsa;
  }
}

class KitCuidadoTextilDecorator extends ServicioMostradorDecorator {
  constructor(articuloBase) {
    super(articuloBase);
    this.costoKit = 35.0;
  }

  obtenerDetalle() {
    return `${this.articuloBase.obtenerDetalle()} + [Kit de Mantenimiento y Cuidado Textil]`;
  }

  obtenerPrecio() {
    return this.articuloBase.obtenerPrecio() + this.costoKit;
  }
}


class PoliticaCobro {
  calcularTotal(subtotal) {
    throw new Error("Debe implementarse el método calcularTotal.");
  }
  nombrePolitica() {
    throw new Error("Debe implementarse el método nombrePolitica.");
  }
}

class PrecioEtiquetaRegularStrategy extends PoliticaCobro {
  calcularTotal(subtotal) {
    return subtotal;
  }
  nombrePolitica() {
    return "Venta Regular (Precio de etiqueta sin descuento)";
  }
}

class PromocionTemporadaStrategy extends PoliticaCobro {
  calcularTotal(subtotal) {
    return subtotal * 0.85;
  }
  nombrePolitica() {
    return "Promoción de Temporada (15% de Descuento)";
  }
}

class LiquidacionSaldoStrategy extends PoliticaCobro {
  calcularTotal(subtotal) {
    return subtotal * 0.7;
  }
  nombrePolitica() {
    return "Liquidación Especial de Saldo (30% de Descuento)";
  }
}

class CajaRegistradora {
  constructor(politica) {
    this.politica = politica;
  }

  asignarPolitica(nuevaPolitica) {
    this.politica = nuevaPolitica;
  }

  emitirRecibo(nombreCliente, articulosComprados) {
    console.log("\n=======================================================");
    console.log("            TIENDA PROTOTYPE - RECIBO OFICIAL          ");
    console.log("=======================================================");
    console.log(`Cliente: ${nombreCliente}`);
    console.log(`Modalidad comercial: ${this.politica.nombrePolitica()}`);
    console.log("-------------------------------------------------------");

    let subtotalGeneral = 0;
    articulosComprados.forEach((item, index) => {
      console.log(`${index + 1}. ${item.obtenerDetalle()}`);
      console.log(`   Importe: Bs. ${item.obtenerPrecio().toFixed(2)}`);
      subtotalGeneral += item.obtenerPrecio();
    });

    const totalFinal = this.politica.calcularTotal(subtotalGeneral);

    console.log("-------------------------------------------------------");
    console.log(`Subtotal Artículos y Servicios : Bs. ${subtotalGeneral.toFixed(2)}`);
    console.log(`TOTAL A CANCELAR EN CAJA       : Bs. ${totalFinal.toFixed(2)}`);
    console.log("=======================================================\n");
  }
}


async function ejecutarPuntoDeVenta() {
  console.log("=== SISTEMA DE VENTAS - TIENDA PROTOTYPE ===");

  const cliente = await solicitarTextoValido("Ingrese el nombre completo del cliente: ");

  const bolsaCompras = [];
  let continuarComprando = "S";

  while (continuarComprando === "S") {
    console.log("\n--- CATÁLOGO DE PRENDAS DISPONIBLES EN STOCK ---");
    console.log("--- Departamento Streetwear / Urbano ---");
    console.log("1. Polera básica Tie-Dye (H&M / BALENCIAGA)      - Bs. 150.00");
    console.log("2. Pantalón corte Baggy (ZARAMAN / BERSHKA)       - Bs. 300.00");
    console.log("3. Gorra oficial NBA                             - Bs. 150.00");
    console.log("4. Polera manga cero (DESTROYER)                 - Bs. 320.00");
    console.log("--- Departamento Exclusivo / Alta Gama ---");
    console.log("5. Chamarra Jean (ZARAMAN)                       - Bs. 380.00");
    console.log("6. Canguro con cierre (CHROME HEARTS)            - Bs. 450.00");
    console.log("7. Mochila (ESSENTIALS)                          - Bs. 450.00");
    console.log("8. Polera con pedrería (DESTROYER)               - Bs. 450.00");

    const opcionArticulo = await solicitarOpcionMenu(
      "Seleccione el artículo a añadir a la compra (1 al 8): ",
      ["1", "2", "3", "4", "5", "6", "7", "8"]
    );

    let marcaSeleccionada = "";
    if (opcionArticulo === "1") {
      console.log("Marcas disponibles para Polera Tie-Dye: 1. H&M | 2. BALENCIAGA");
      const sub = await solicitarOpcionMenu("Seleccione la marca (1 o 2): ", ["1", "2"]);
      marcaSeleccionada = sub === "1" ? "H&M" : "BALENCIAGA";
    } else if (opcionArticulo === "2") {
      console.log("Marcas disponibles para Pantalón Baggy: 1. ZARAMAN | 2. BERSHKA");
      const sub = await solicitarOpcionMenu("Seleccione la marca (1 o 2): ", ["1", "2"]);
      marcaSeleccionada = sub === "1" ? "ZARAMAN" : "BERSHKA";
    }

    const talla = await solicitarOpcionMenu(
      "Seleccione la talla disponible (S, M, L, XL): ",
      ["S", "M", "L", "XL", "s", "m", "l", "xl"]
    );

    const color = await solicitarTextoValido("Ingrese el color de la prenda en stock: ");

    
    let fabricaCatalogo;
    if (["1", "2", "3", "4"].includes(opcionArticulo)) {
      fabricaCatalogo = new CatalogoStreetwearFactory();
    } else {
      fabricaCatalogo = new CatalogoAltaGamaFactory();
    }

    let articuloActual = fabricaCatalogo.despacharPrenda(
      opcionArticulo,
      marcaSeleccionada,
      talla.toUpperCase(),
      color
    );

    
    const deseaBolsa = await solicitarConfirmacion(
      "¿Deseas agregar una bolsa exclusiva de la tienda para llevar el articulo (+Bs. 15.00)? (S/N): "
    );
    if (deseaBolsa === "S") {
      articuloActual = new BolsaExclusivaDecorator(articuloActual);
    }

    const deseaKit = await solicitarConfirmacion(
      "¿Desea incluir Kit de Mantenimiento y Cuidado Textil (+Bs. 35.00)? (S/N): "
    );
    if (deseaKit === "S") {
      articuloActual = new KitCuidadoTextilDecorator(articuloActual);
    }

    bolsaCompras.push(articuloActual);
    console.log(`-> Artículo añadido al ticket de compra: ${articuloActual.sku}`);

    continuarComprando = await solicitarConfirmacion("\n¿Desea añadir otra prenda del catálogo a la compra? (S/N): ");
  }


  console.log("\n--- SELECCIÓN DE POLÍTICA DE COBRO EN CAJA ---");
  console.log("1. Venta Regular (Precio de etiqueta)");
  console.log("2. Promoción de Temporada (15% de descuento)");
  console.log("3. Liquidación de Saldo (30% de descuento)");

  const opcionCobro = await solicitarOpcionMenu("Seleccione la política comercial a aplicar (1, 2 o 3): ", ["1", "2", "3"]);

  let estrategiaCobro;
  if (opcionCobro === "2") {
    estrategiaCobro = new PromocionTemporadaStrategy();
  } else if (opcionCobro === "3") {
    estrategiaCobro = new LiquidacionSaldoStrategy();
  } else {
    estrategiaCobro = new PrecioEtiquetaRegularStrategy();
  }

  const caja = new CajaRegistradora(estrategiaCobro);
  caja.emitirRecibo(cliente, bolsaCompras);

  rl.close();
}

ejecutarPuntoDeVenta();