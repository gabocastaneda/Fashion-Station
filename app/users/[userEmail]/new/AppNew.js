"use client";
import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import "./Styles.css";
import { handleObjectMoving, clearGuidelines } from "./snappingHelpers";
import Settings from "./settings";
import { IconButton } from "@mui/material";
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ImageIcon from '@mui/icons-material/Image';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import RemoveIcon from '@mui/icons-material/Remove';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';

export default function AppNew() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const fileInputRef = useRef(null);
  const [guidelines, setGuidelines] = useState([]);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new fabric.Canvas(canvasRef.current, {
        width: window.innerWidth * 0.9,
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

  const downloadCanvas = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({ format: "png" }); // Obtiene la imagen en formato PNG
      const link = document.createElement("a"); // Crea un enlace
      link.href = dataURL; // Asigna el contenido de la imagen al enlace
      link.download = "canvas_image.png"; // Nombre del archivo que se descargará
      link.click(); // Dispara la descarga
    } else {
      console.error("Canvas no está inicializado.");
    }
  };

  return (
    <div className="AppNew">
      <div className="Toolbar darkmode">
        <IconButton onClick={addRectangle}>
          <CropSquareIcon style={{ fontSize: 30 }} />
        </IconButton>
        <IconButton onClick={addCircle}>
          <PanoramaFishEyeIcon style={{ fontSize: 30 }} />
        </IconButton>
        <IconButton onClick={addTriangle}>
          <ChangeHistoryIcon style={{ fontSize: 30 }} />
        </IconButton>
        <IconButton onClick={addLine}>
          <RemoveIcon style={{ fontSize: 30 }} />
        </IconButton>
        <IconButton onClick={addText}>
          <FormatShapesIcon style={{ fontSize: 30 }} />
        </IconButton>
        <IconButton onClick={deleteSelectedObject}>
          <DeleteOutlineIcon style={{ fontSize: 30 }} />
        </IconButton>
        <IconButton onClick={triggerFileInputClick}>
          <ImageIcon style={{ fontSize: 30 }} />
        </IconButton>
        <IconButton onClick={downloadCanvas}>
          <ArrowCircleDownIcon style={{ fontSize: 30 }} />
        </IconButton>
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
