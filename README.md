# TextoPDF

## Aplicacion que sirve para generar archivos PDF desde archivos TXT

### Prerequisitos

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

### Uso

1. Abrir terminal (cmd)
2. Posicionarse en el directorio de la aplicacion
3. Ejecutar sentencia para instalar las dependencias: [^1].

    ```bash
    npm install
    ```

4. Una vez instaladas las depenedencias podemos hacer uso de la aplicación: [^2].

    ```bash
    node generapdf.js <DIR>
    ```

[^1]: Solamente la primera vez.

[^2]: Donde `<DIR>` es el directorio donde se encuentran los archivos TXT a procesesar.
