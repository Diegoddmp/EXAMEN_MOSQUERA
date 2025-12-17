import { LitElement, html } from 'lit';

export class ProductoCard extends LitElement {


  createRenderRoot() {
    return this; 
  }

  static properties = {
    productos: { type: Array },
    selectedIndex: { type: Number },
    cantidad: { type: Number },

    nuevoNombre: { type: String },
    nuevoPrecio: { type: Number },

    mostrarForm: { type: Boolean }
  };

  constructor() {
    super();
    this.productos = [
      { nombre: 'Laptop', precio: 500 },
      { nombre: 'Mouse', precio: 25 }
    ];
    this.selectedIndex = 0;
    this.cantidad = 1;

    this.nuevoNombre = '';
    this.nuevoPrecio = 0;
    this.mostrarForm = false;
  }

  get productoActual() {
    return this.productos[this.selectedIndex] ?? { nombre: 'Producto', precio: 0 };
  }

  get total() {
    return this.productoActual.precio * this.cantidad;
  }

  aumentar() {
    this.cantidad++;
  }

  disminuir() {
    if (this.cantidad > 1) this.cantidad--;
  }

  onSeleccionarProducto(e) {
    this.selectedIndex = Number(e.target.value);
    this.cantidad = 1; 
  }

  toggleForm() {
    this.mostrarForm = !this.mostrarForm;
  }

  onNombreInput(e) {
    this.nuevoNombre = e.target.value;
  }

  onPrecioInput(e) {
    this.nuevoPrecio = Number(e.target.value);
  }

  agregarProducto() {
    const nombre = this.nuevoNombre.trim();
    const precio = Number(this.nuevoPrecio);

    if (!nombre || !Number.isFinite(precio) || precio <= 0) return;

    this.productos = [...this.productos, { nombre, precio }];
    this.selectedIndex = this.productos.length - 1;
    this.cantidad = 1;

    this.nuevoNombre = '';
    this.nuevoPrecio = 0;
    this.mostrarForm = false;
  }

  render() {
    const p = this.productoActual;

    return html`
      <div class="container" style="max-width: 720px;">
        <div class="card shadow-sm">
          <div class="card-body">

            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="card-title mb-0">Tarjeta de productos</h5>
              <button class="btn btn-primary" @click=${this.toggleForm}>
                Agregar nuevo producto
              </button>
            </div>

            ${this.mostrarForm ? html`
              <div class="border rounded p-3 mb-3">
                <div class="row g-2">
                  <div class="col-md-6">
                    <input class="form-control"
                      placeholder="Nombre del producto"
                      .value=${this.nuevoNombre}
                      @input=${this.onNombreInput}>
                  </div>
                  <div class="col-md-4">
                    <input class="form-control"
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="Precio"
                      .value=${String(this.nuevoPrecio || '')}
                      @input=${this.onPrecioInput}>
                  </div>
                  <div class="col-md-2 d-grid">
                    <button class="btn btn-success" @click=${this.agregarProducto}>
                      Guardar
                    </button>
                  </div>
                </div>
                
              </div>
            ` : ''}

            <div class="mb-3">
              <label class="form-label">Selecciona un producto</label>
              <select class="form-select" @change=${this.onSeleccionarProducto}>
                ${this.productos.map((prod, i) => html`
                  <option value=${i} ?selected=${i === this.selectedIndex}>
                    ${prod.nombre} — $${prod.precio}
                  </option>
                `)}
              </select>
            </div>

            <div class="row g-3 align-items-center">
              <div class="col-md-6">
                <div class="p-3 bg-light rounded">
                  <div><strong>Producto:</strong> ${p.nombre}</div>
                  <div><strong>Precio unitario:</strong> $${p.precio}</div>
                  <div><strong>Cantidad:</strong> ${this.cantidad}</div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="d-flex gap-2 mb-2">
                  <button class="btn btn-outline-secondary w-50" @click=${this.disminuir}>- Disminuir</button>
                  <button class="btn btn-outline-secondary w-50" @click=${this.aumentar}>+ Aumentar</button>
                </div>

                <div class="alert alert-info mb-0">
                  <strong>Total:</strong> $${this.total}
                </div>
                
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('producto-card', ProductoCard);
