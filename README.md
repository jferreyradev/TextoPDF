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

### Configuración del PDF

La aplicación utiliza un archivo de configuración `pdf-config.json` para personalizar la generación de los documentos PDF. Este archivo permite configurar:

- **Documento**: Orientación (landscape/portrait), tamaño de página (A4, Letter, etc.), fuente, márgenes
- **Texto**: Tamaño de fuente
- **Logo**: Ruta, posición (x, y) y dimensiones (ancho, alto)
- **Nueva Página**: Configuración para páginas adicionales

#### Archivo de configuración por defecto

Si no se especifica un archivo de configuración, la aplicación utiliza `pdf-config.json` del directorio de la aplicación. Si este archivo no existe, se utilizan valores predeterminados.

#### Especificar un archivo de configuración personalizado

Puedes especificar un archivo de configuración personalizado usando la opción `--config` o `-c`:

**Con Node.js:**
```bash
node generapdf.js <DIR> --config /ruta/a/mi-config.json
node generapdf.js <DIR> -c /ruta/a/mi-config.json
```

**Con Bun:**
```bash
bun generapdf.js <DIR> --config /ruta/a/mi-config.json
bun generapdf.js <DIR> -c /ruta/a/mi-config.json
```

#### Ejemplo de configuración (`pdf-config.json`):

```json
{
  "document": {
    "layout": "landscape",
    "size": "A4",
    "font": "Courier",
    "margin": 5
  },
  "text": {
    "fontSize": 5.8
  },
  "logo": {
    "path": "./public/logo_dgs.png",
    "x": 700,
    "y": 10,
    "width": 126,
    "height": 31
  },
  "newPage": {
    "layout": "landscape",
    "size": "A4",
    "font": "Courier",
    "margin": 10
  }
}
```

### Crear ejecutable con Bun

Para crear un ejecutable standalone que incluya los archivos de la carpeta `public`:

1. Compilar el proyecto:
    ```bash
    bun build --compile generapdf.js --outfile generapdf.exe
    ```

2. Copiar la carpeta `public` y opcionalmente el archivo `pdf-config.json` al mismo directorio donde está el ejecutable:
    ```
    generapdf.exe
    pdf-config.json (opcional)
    public/
    └── logo_dgs.png
    ```

    Si no incluyes `pdf-config.json`, la aplicación usará la configuración predeterminada. También puedes usar `--config` para especificar un archivo de configuración personalizado.

3. Ejecutar el programa:
    ```bash
    generapdf.exe <DIR>
    # O con configuración personalizada:
    generapdf.exe <DIR> --config mi-config.json
    ```

El ejecutable será totalmente portable y no requerirá tener Bun o Node.js instalado.

[^1]: Solamente la primera vez.

[^2]: Donde `<DIR>` es el directorio donde se encuentran los archivos TXT a procesesar.
