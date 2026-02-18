# TextoPDF

## Aplicacion que sirve para generar archivos PDF desde archivos TXT

### Prerequisitos

Elige una de las siguientes opciones:

#### Opción 1: Node.js + NPM

1. Node.js

    Node.js es un entorno de tiempo de ejecución JavaScript multiplataforma de código abierto que ejecuta código JavaScript fuera de un navegador web.

    Puede descargar e instalar Node.js siguiendo las instrucciones proporcionadas en su sitio web oficial

    [Node.js](https://nodejs.org/es)

2. NPM

    NPM es un administrador de paquetes para Node.js y se usan para instalar dependencias y administrar paquetes.

La comprobación se puede realizar con los siguientes comandos en la terminal:

```bash
node --version
npm --version
```

#### Opción 2: Bun

Bun es un runtime moderno y rápido de JavaScript que es completamente compatible con Node.js.

Puede descargar e instalar Bun desde [https://bun.sh](https://bun.sh)

La comprobación se puede realizar con:

```bash
bun --version
```

### Configuración

La aplicación permite personalizar varios aspectos de la generación de PDFs. Para modificar la configuración, edite el archivo `generapdf.js`:

#### Configuración del documento PDF

En la línea 14, puede modificar las siguientes propiedades:

```javascript
const pdfDoc = new PDFDocument({ layout: 'landscape', size: 'A4', font: 'Courier', margin: 5 });
```

- **layout**: Orientación del documento (`'landscape'` para horizontal, `'portrait'` para vertical)
- **size**: Tamaño del papel (`'A4'`, `'LETTER'`, `'LEGAL'`, etc.)
- **font**: Fuente del texto (`'Courier'`, `'Helvetica'`, `'Times-Roman'`, etc.)
- **margin**: Margen en puntos (5 por defecto)

En la línea 20, puede ajustar el tamaño de la fuente:

```javascript
pdfDoc.fontSize(5.8);
```

#### Configuración del logo

En la línea 24, puede modificar el logo que aparece en cada página:

```javascript
pdfDoc.image('./public/logo_dgs.png', 700, 10, { width: 126, height: 31 });
```

- **Ruta del logo**: `'./public/logo_dgs.png'` - Coloque su logo en la carpeta `public/`
- **Posición X**: `700` - Coordenada horizontal (en puntos desde la izquierda)
- **Posición Y**: `10` - Coordenada vertical (en puntos desde arriba)
- **width**: `126` - Ancho del logo en puntos
- **height**: `31` - Alto del logo en puntos

#### Directorio de salida

Los archivos PDF generados se guardan en una subcarpeta `pdf/` dentro del directorio de entrada especificado.

### Uso

1. Abrir terminal (cmd)
2. Posicionarse en el directorio de la aplicacion
3. Ejecutar sentencia para instalar las dependencias: [^1].

    **Con NPM:**
    ```bash
    npm install
    ```

    **Con Bun:**
    ```bash
    bun install
    ```

4. Una vez instaladas las depenedencias podemos hacer uso de la aplicación: [^2].

    **Con Node.js:**
    ```bash
    node generapdf.js <DIR>
    ```

    **Con Bun:**
    ```bash
    bun generapdf.js <DIR>
    ```

### Crear ejecutable con Bun

Para crear un ejecutable standalone que incluya los archivos de la carpeta `public`:

1. Compilar el proyecto:
    ```bash
    bun build --compile generapdf.js --outfile generapdf.exe
    ```

2. Copiar la carpeta `public` al mismo directorio donde está el ejecutable:
    ```
    generapdf.exe
    public/
    └── logo_dgs.png
    ```

3. Ejecutar el programa:
    ```bash
    generapdf.exe <DIR>
    ```

El ejecutable será totalmente portable y no requerirá tener Bun o Node.js instalado.

[^1]: Solamente la primera vez.

[^2]: Donde `<DIR>` es el directorio donde se encuentran los archivos TXT a procesesar.
