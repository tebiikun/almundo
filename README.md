## Consigna

El exámen está compuesto por dos aplicaciones, un backend escrito en NodeJS el cual expondrá
una API REST para la interacción con la aplicación frontend.

**Ejercicio 1: API Rest NodeJS**
Este punto consiste en armar un API REST en Node.js. El mismo será utilizado en el ejercicio 2.
La funcionalidad de listado y filtrado de hoteles debe estar soportada por la API y
consumida en la aplicación cliente.
A la hora de diseñar la estructura de la aplicación, tener en cuenta factores como
escalabilidad, reutilización y separación de responsabilidades.
Uso de configuraciones para ajustar como se ejecuta la aplicación en entornos productivos
y de desarrollo.

**Ejercicio 2: Frontend**
Maquetar una página de resultado de hoteles, ver imágenes en el repo (solo mobile y desktop).
Consumir la API desarrollada en el ejercicio anterior, implementando las funcionalidades
necesarias para listar y filtar los hoteles.
Utilizar alguna librería o framework guiado por componentes ( AngularJS o Angular).
Utilizar algún package manager (npm, bower) para manejar dependencias externas.
Utilizar una grilla responsive o similar para el maquetado.
Optimizar todos los recursos para entornos productivos, (minificar, ofuscar, etc).

## Objetivo Maquetación

**Desktop**

![alt text](https://github.com/tebiikun/almundo/blob/master/designs/desktop.png)

**Mobile**

![alt text](https://github.com/tebiikun/almundo/blob/master/designs/mobile.png)

## Build

**npm install**

**npm start**

## Server

http://localhost:3000/

## Demo

https://almundo.herokuapp.com/

## Comentarios

* La aplicacion se automatiza con Gulp para minificar, ofuscar, concatenar, etc
* Los datos son estáticos tomados del json brindado
* Hay algunas imágenes (pocas) que no se visualizan por problemas en el archivo
* No se está utilizando ninguna BD
