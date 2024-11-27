"use client";
import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import "./Styles.css";
import { handleObjectMoving, clearGuidelines } from "./snappingHelpers";
import Settings from "./settings";

export default function AppNew() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const fileInputRef = useRef(null);
  const [guidelines, setGuidelines] = useState([]);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        width: window.innerWidth * 0.8,
        height: window.innerHeight,
      });

      initCanvas.backgroundColor = " #eeeeee ";
      initCanvas.renderAll();

      setCanvas(initCanvas);

      initCanvas.on("object:moving", (event) =>
        handleObjectMoving(initCanvas, event.target, guidelines, setGuidelines)
      );

      initCanvas.on("object:modified", () =>
        clearGuidelines(initCanvas, guidelines, setGuidelines)
      );

      // Agregar evento para eliminar objetos desde el teclado
      const handleKeyPress = (event) => {
        // Verificar si la tecla es "Delete" o "Backspace"
        if (event.key === "Delete" || event.key === "Backspace") {
          deleteSelectedObject();
        }
      };

      window.addEventListener("keydown", handleKeyPress);

      const resizeCanvas = () => {
        initCanvas.setWidth(window.innerWidth * 0.8);
        initCanvas.setHeight(window.innerHeight);
        initCanvas.renderAll();
      };

      window.addEventListener("resize", resizeCanvas);

      return () => {
        window.removeEventListener("keydown", handleKeyPress); // Limpiar el event listener al desmontar el componente
        initCanvas.dispose();
        window.removeEventListener("resize", resizeCanvas);
      };
    }
  }, []);

  // Funciones para agregar figuras
  const addRectangle = () => {
    if (canvas) {
      const rect = new fabric.Rect({
        left: 50,
        top: 100,
        fill: "blue",
        width: 100,
        height: 60,
        id: `rect_${new Date().getTime()}`, // Asignamos un ID único
      });
      canvas.add(rect);
      canvas.renderAll();
    } else {
      console.error("Canvas no está inicializado.");
    }
  };

  const addCircle = () => {
    if (canvas) {
      const circle = new fabric.Circle({
        left: 100,
        top: 100,
        fill: "red",
        radius: 60,
        id: `circle_${new Date().getTime()}`, // Asignamos un ID único
      });
      canvas.add(circle);
      canvas.renderAll();
    } else {
      console.error("Canvas no está inicializado.");
    }
  };

  const addTriangle = () => {
    if (canvas) {
      const triangle = new fabric.Triangle({
        left: 150,
        top: 150,
        fill: "green",
        width: 100,
        height: 100,
        id: `triangle_${new Date().getTime()}`, // Asignamos un ID único
      });
      canvas.add(triangle);
      canvas.renderAll();
    } else {
      console.error("Canvas no está inicializado.");
    }
  };

  const addLine = () => {
    if (canvas) {
      const line = new fabric.Line([50, 100, 200, 100], {
        left: 50,
        top: 100,
        stroke: "orange",
        strokeWidth: 5,
        id: `line_${new Date().getTime()}`, // Asignamos un ID único
      });
      canvas.add(line);
      canvas.renderAll();
    } else {
      console.error("Canvas no está inicializado.");
    }
  };

  const addText = () => {
    if (canvas) {
      const textbox = new fabric.Textbox("¡Hola, Canvas!", {
        left: 200,
        top: 200,
        fontSize: 30,
        fill: "black",
        width: 200, // Ajuste el ancho para que el texto pueda envolver
        editable: true,
        id: `text_${new Date().getTime()}`, // Asignamos un ID único
      });
      canvas.add(textbox);
      canvas.renderAll();
    } else {
      console.error("Canvas no está inicializado.");
    }
  };

  const addImageFromFile = (event) => {
    if (canvas) {
      const file = event.target.files[0]; // Obtiene el archivo de imagen seleccionado
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            const fabricImage = new fabric.Image(img, {
              left: 100,
              top: 100,
              scaleX: 1, // Escala la imagen para que se ajuste al canvas
              scaleY: 1, // Escala la imagen para que se ajuste al canvas
              id: `image_${new Date().getTime()}`, // Asignamos un ID único
            });
            canvas.add(fabricImage);
            canvas.renderAll();
          };
        };
        reader.readAsDataURL(file); // Lee el archivo de imagen como URL
      }
    } else {
      console.error("Canvas no está inicializado.");
    }
  };

  const triggerFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Función para eliminar el objeto seleccionado
  const deleteSelectedObject = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.remove(activeObject); // Elimina el objeto activo
        canvas.renderAll(); // Vuelve a renderizar el canvas
      } else {
        console.error("No hay objeto seleccionado para eliminar.");
      }
    }
  };

  return (
    <div className="AppNew">
      <div className="Toolbar darkmode">
        <button onClick={addRectangle} variant="ghost" size="medium">
          Cuadrado
        </button>
        <button onClick={addCircle} variant="ghost" size="medium">
          Círculo
        </button>
        <button onClick={addTriangle} variant="ghost" size="medium">
          Triángulo
        </button>
        <button onClick={addLine} variant="ghost" size="medium">
          Línea
        </button>
        <button onClick={addText} variant="ghost" size="medium">
          Texto
        </button>

        <button onClick={deleteSelectedObject} variant="ghost" size="medium">
          Eliminar Objeto
        </button>

        <button onClick={triggerFileInputClick}>Agregar Imagen</button>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          accept="image/*"
          onChange={addImageFromFile}
        />
      </div>

      <div className="canvasContainer">
        <canvas ref={canvasRef} />
        <Settings canvas={canvas} />
      </div>
    </div>
  );
}
