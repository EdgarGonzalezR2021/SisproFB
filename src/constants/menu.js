import { adminRoot } from './defaultValues';

const data = [
  /*
  {
    id: 'gogo',
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.gogo',
    to: `${adminRoot}/gogo`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.start',
        to: `${adminRoot}/gogo/start`,
      },
    ],
  },

  //simple-icon-puzzle',

  */
  {
    icon: 'simple-icon-puzzle',
    id: 'menuestilos',
    label: 'Estilos',
    to: `${adminRoot}/estilos-menu`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'Estilos',
        to: `${adminRoot}/estilos-menu/estilos`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Combinaciones',
        to: `${adminRoot}/combinaciones-menu/combinaciones`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Consumos',
        to: `${adminRoot}/estilos-menu/consumos`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Mano Obra',
        to: `${adminRoot}/estilos-menu/manoobra`,
        subs: [
          {
            icon: 'simple-icon-paper-plane',
            label: 'Cat. Mano Obra',
            to: `${adminRoot}/estilos-menu/manoobra/catalogomanoobra`,
          },
          {
            icon: 'simple-icon-paper-plane',
            label: 'Mano Obra Estilos',
            to: `${adminRoot}/estilos-menu/manoobra/manoobraestilos`,
          },
        ],
      },
      {
        icon: 'simple-icon-arrow-down',
        label: 'Catálogos',
        to: `${adminRoot}/estilos-menu/catalogos`,
        subs: [
          {
            icon: 'simple-icon-paper-plane',
            label: 'Componentes',
            to: `${adminRoot}/estilos-menu/componentes`,
          },
          {
            icon: 'simple-icon-paper-plane',
            label: 'Dificultades',
            to: `${adminRoot}/estilos-menu/d`,
          },
          {
            icon: 'simple-icon-paper-plane',
            label: 'Hormas',
            to: `${adminRoot}/estilos-menu/hormas`,
          },
          {
            icon: 'simple-icon-paper-plane',
            label: 'Moldes',
            to: `${adminRoot}/estilos-menu/moldes`,
          },
          {
            icon: 'simple-icon-paper-plane',
            label: 'Recios',
            to: `${adminRoot}/estilos-menu/recios`,
          },
          {
            icon: 'simple-icon-paper-plane',
            label: 'Secuencias Produc.',
            to: `${adminRoot}/estilos-menu/secuencias`,
          },
        ],
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Precios de Venta',
        to: `${adminRoot}/estilos-menu/precios`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Costos',
        to: `${adminRoot}/estilos-menu/costos`,
        subs: [
          {
            icon: 'simple-icon-paper-plane',
            label: 'Costos Presup.',
            to: `${adminRoot}/estilos-menu/costospresupuestados`,
          },
          {
            icon: 'simple-icon-paper-plane',
            label: 'Costos Fijos',
            to: `${adminRoot}/estilos-menu/c`,
          },
        ],
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Estilos del Cliente',
        to: `${adminRoot}/estilos-menu/estiloscliente`,
      },
    ],
  },
  {
    id: 'secondmenu',
    icon: 'simple-icon-puzzle',
    label: 'second-menu',
    to: `${adminRoot}/second-menu`,
  },
  {
    id: 'clientesmenu',
    icon: 'simple-icon-people',
    label: 'Clientes',
    to: `${adminRoot}/clientes-menu`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'Clientes',
        to: `${adminRoot}/clientes-menu/clientes`,
        subs: [],
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Pagos de Clientes',
        to: `${adminRoot}/clientes-menu/pagosclientes`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Documentos',
        to: `${adminRoot}/clientes-menu/documentos`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Catalogos',
        to: `${adminRoot}/clientes-menu/catalogos`,
        subs: [
          {
            label: 'Conceptos',
            to: `${adminRoot}/clientes-menu/catalogos/conceptos`,
          },
        ],
      },
    ],
  },
  {
    id: 'ventasmenu',
    icon: 'simple-icon-wallet',
    label: 'Ventas',
    to: `${adminRoot}/ventas-menu`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        id: 'ventasmenupedidos',
        icon: 'simple-icon-basket-loaded',
        label: 'Pedidos',
        to: `${adminRoot}/ventas-menu/pedidos`,
      },
      {
        id: 'ventasmenuventas',
        icon: 'simple-icon-basket-loaded',
        label: 'Ventas',
        to: `${adminRoot}/ventas-menu/ventas`,
      },
      {
        id: 'ventasmenunotascredito',
        icon: 'simple-icon-basket-loaded',
        label: 'Notas de Crédito',
        to: `${adminRoot}/ventas-menu/notascredito`,
      },
    ],
  },
  {
    id: 'explosionesmenu',
    icon: 'simple-icon-chart',
    label: 'Explosiones',
    to: `${adminRoot}/explosiones-menu`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'Explosionar Pedidos',
        to: `${adminRoot}/explosiones-menu/explosionarpedidos`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Explosionar Produccion',
        to: `${adminRoot}/explosiones-menu/explosionarproduccion`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Consultar Explosiones',
        to: `${adminRoot}/explosiones-menu/consultarexplosiones`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Generar Ord.Compra',
        to: `${adminRoot}/explosiones-menu/generarordencompra`,
      },
    ],
  },
  {
    id: 'proveedoresmenu',
    icon: 'simple-icon-user-following',
    label: 'Proveedores',
    to: `${adminRoot}/proveedores-menu`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'Proveedores',
        to: `${adminRoot}/proveedores-menu/proveedores`,
        subs: [],
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Pagos a Prov.',
        to: `${adminRoot}/proveedores-menu/pagosaprov`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Saldos de Prov.',
        to: `${adminRoot}/proveedores-menu/saldosaprov`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Catalogos',
        to: `${adminRoot}/proveedores-menu/catalogos`,
        subs: [
          {
            label: 'Conceptos',
            to: `${adminRoot}/proveedores-menu/catalogos/conceptos`,
          },
        ],
      },
    ],
  },
  {
    id: 'comprasmenu',
    icon: 'simple-icon-basket-loaded',
    label: 'Compras',
    to: `${adminRoot}/compras-menu`,
    subs: [
      {
        id: 'ordenescompramenu',
        icon: 'simple-icon-basket-loaded',
        label: 'Ord. Compra',
        to: `${adminRoot}/ordenescompra-menu`,
      },
      {
        id: 'comprasmenucompras',
        icon: 'simple-icon-basket-loaded',
        label: 'Compras',
        to: `${adminRoot}/compras-menu/compras`,
        subs: [
          {
            id: 'comprasmenucapturacompras',
            icon: 'simple-icon-basket-loaded',
            label: 'Compras',
            to: `${adminRoot}/compras-menu/compras/compras`,
          },
          {
            id: 'autorizacioncompras',
            icon: 'simple-icon-basket-loaded',
            label: 'Autorizaciones',
            to: `${adminRoot}/compras-menu/compras/autorizaciones`,
          },
        ],
      },
      {
        id: 'comprasmenunotascargo',
        icon: 'simple-icon-basket-loaded',
        label: 'Notas de Cargo',
        to: `${adminRoot}/compras-menu/notascargo`,
      },
      {
        id: 'comprasprocesosmenu',
        icon: 'simple-icon-basket-loaded',
        label: 'Procesos',
        to: `${adminRoot}/compras-menu/procesos`,
        subs: [
          {
            id: 'comprasprocesosverificarcompraencxp',
            icon: 'simple-icon-basket-loaded',
            label: 'Verif.Compra CxP',
            to: `${adminRoot}/compras-menu/procesos/verificarencxp`,
          },
        ],
      },
    ],
  },
  {
    id: 'almacenmaterialesmenu',
    icon: 'simple-icon-layers',
    label: 'Almacen Mat.',
    to: `${adminRoot}/almacenmateriales-menu`,
    subs: [
      {
        id: 'almacenesperiodos',
        icon: 'simple-icon-layers',
        label: 'Periodos',
        to: `${adminRoot}/almacenmateriales-menu/periodos`,
      },
      {
        id: 'almacenenesdemateriales',
        icon: 'simple-icon-layers',
        label: 'Almacenes de Mat.',
        to: `${adminRoot}/almacenmateriales-menu/almacenesdemateriales`,
      },
      {
        id: 'catalogomateriales',
        icon: 'simple-icon-basket-loaded',
        label: 'Cat. Materiales',
        to: `${adminRoot}/catalogomateriales-menu`,
      },
      {
        id: 'movimientosalmacen',
        icon: 'simple-icon-basket-loaded',
        label: 'Movimientos',
        to: `${adminRoot}/movimientosalmacen-menu`,
      },
      {
        id: 'almacenmaterialesmenuinventario',
        icon: 'simple-icon-basket-loaded',
        label: 'Inventario',
        to: `${adminRoot}/almacenmateriales-menu/inventario`,
      },
      {
        id: 'almacenmaterialesmenucostos',
        icon: 'simple-icon-basket-loaded',
        label: 'Costos',
        to: `${adminRoot}/almacenmateriales-menu/costos`,
      },
      {
        id: 'almacenmaterialesreportes',
        icon: 'simple-icon-basket-loaded',
        label: 'Reportes',
        to: `${adminRoot}/almacenmateriales-menu/reportes`,
        subs: [
          {
            id: 'almacenmaterialesreporteinventariocosteado',
            icon: 'simple-icon-basket-loaded',
            label: 'Inventario Costeado',
            to: `${adminRoot}/almacenmateriales-menu/reportes/inventariocosteado`,
          },
        ],
      },
    ],
  },
  {
    id: 'produccion',
    icon: 'simple-icon-rocket',
    label: 'Producción',
    to: `${adminRoot}/produccion-menu`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'Programar Producción',
        to: `${adminRoot}/produccion-menu/programar`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Consultar Producción',
        to: `${adminRoot}/produccion-menu/consultarproduccion`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Ordenes Producción',
        to: `${adminRoot}/produccion-menu/ordenesproduccion`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Maquilas',
        to: `${adminRoot}/produccion-menu/maquilas`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Consumos Empleados',
        to: `${adminRoot}/produccion-menu/consumosempleados`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Consumos Produccion',
        to: `${adminRoot}/produccion-menu/consumosproduccion`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Aduanas',
        to: `${adminRoot}/produccion-menu/aduanas`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Tarjetas',
        to: `${adminRoot}/produccion-menu/tarjetas`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Etiquetas',
        to: `${adminRoot}/produccion-menu/etiquetas`,
      },
      {
        icon: 'simple-icon-print',
        label: 'Reportes',
        to: `${adminRoot}/produccion-menu/reportes`,
      },
      {
        icon: 'simple-icon-profile',
        label: 'Procesos',
        to: `${adminRoot}/produccion-menu/procesos`,
      },
    ],
  },
  {
    id: 'destajos',
    icon: 'simple-icon-envelope',
    label: 'Destajos',
    to: `${adminRoot}/destajos-menu`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'Capturar Destajos',
        to: `${adminRoot}/destajos-menu/capturar`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Consultar Destajos',
        to: `${adminRoot}/destajos-menu/consultar`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Resumen Prenómina',
        to: `${adminRoot}/destajos-menu/resumenprenomina`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Reportes',
        to: `${adminRoot}/destajos-menu/reportes`,
      },
    ],
  },
  {
    id: 'productoterminado',
    icon: 'simple-icon-social-dropbox',
    label: 'Producto Term.',
    to: `${adminRoot}/productoterminado-menu`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'Cat. Producto Term.',
        to: `${adminRoot}/productoterminado-menu/catalogoproductoterminado`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Movimientos',
        to: `${adminRoot}/productoterminado-menu/movimientos`,
      },
    ],
  },
  {
    id: 'nomina',
    icon: 'simple-icon-wallet',
    label: 'Nomina',
    to: `${adminRoot}/nomina-menu`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'Periodos',
        to: `${adminRoot}/nomina-menu/periodos`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Empleados',
        to: `${adminRoot}/nomina-menu/empleados`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Movimientos',
        to: `${adminRoot}/nomina-menu/movimientos`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Nómina',
        to: `${adminRoot}/nomina-menu/nomina`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Catalogos',
        to: `${adminRoot}/nomina-menu/catalogos`,
        subs: [
          {
            icon: 'simple-icon-paper-plane',
            label: 'Cat.Percep./Deducc.',
            to: `${adminRoot}/nomina-menu/catalogos/catperded`,
          },
          {
            icon: 'simple-icon-paper-plane',
            label: 'Departam. Nom.',
            to: `${adminRoot}/nomina-menu/catalogos/departamentosnomina`,
          },
          {
            icon: 'simple-icon-paper-plane',
            label: 'Puestos Nom.',
            to: `${adminRoot}/nomina-menu/catalogos/puestosnomina`,
          },
        ],
      },
    ],
  },
  {
    id: 'planta',
    icon: 'simple-icon-settings',
    label: 'Planta',
    to: `${adminRoot}/planta-menu`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'Departamentos',
        to: `${adminRoot}/planta-menu/departamentos`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Corridas',
        to: `${adminRoot}/planta-menu/corridas`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'Lineas de Prod.',
        to: `${adminRoot}/planta-menu/lineasprod`,
      },
    ],
  },
  {
    id: 'blankpage',
    icon: 'iconsminds-bucket',
    label: 'menu.blank-page',
    to: `${adminRoot}/blank-page`,
  },
  {
    id: 'docs',
    icon: 'iconsminds-library',
    label: 'menu.docs',
    to: 'https://gogo-react-docs.coloredstrategies.com/',
    newWindow: true,
  },
];
export default data;
