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
import SaveIcon from '@mui/icons-material/Save';

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

  const saveCanva = async () => {
    if (canvas) {
      const objectsData = canvas.getObjects().map((obj) => {
        switch (obj.type) {
          case "rect":
            return {
              type: "rect",
              left: obj.left,
              top: obj.top,
              width: obj.width,
              height: obj.height,
              fill: obj.fill,
            };
          case "circle":
            return {
              type: "circle",
              left: obj.left,
              top: obj.top,
              radius: obj.radius,
              fill: obj.fill,
            };
          case "line":
            return {
              type: "line",
              x1: obj.x1,
              y1: obj.y1,
              x2: obj.x2,
              y2: obj.y2,
              stroke: obj.stroke,
            };
          case "textbox":
            return {
              type: "text",
              left: obj.left,
              top: obj.top,
              text: obj.text,
              fontSize: obj.fontSize,
              fill: obj.fill,
            };
          case "image":
            return {
              type: "image",
              src: obj.getSrc(), // URL o data URI de la imagen
              left: obj.left,
              top: obj.top,
              scaleX: obj.scaleX,
              scaleY: obj.scaleY,
            };
          default:
            return null;
        }
      }).filter(Boolean); // Filtrar nulls

      // Ahora puedes guardar los datos en la base de datos
      try {
        const response = await fetch('/save-canvas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ objects: objectsData }),
        });

        if (response.ok) {
          console.log('Canvas guardado exitosamente');
        } else {
          console.error('Error al guardar el canvas');
        }
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    }
  };

  const loadCanvas = async () => {
    try {
      const response = await fetch('/load-canvas');
      const data = await response.json();

      if (data.objects) {
        data.objects.forEach((objData) => {
          switch (objData.type) {
            case "rect":
              const rect = new fabric.Rect({
                left: objData.left,
                top: objData.top,
                width: objData.width,
                height: objData.height,
                fill: objData.fill,
              });
              canvas.add(rect);
              break;
            case "circle":
              const circle = new fabric.Circle({
                left: objData.left,
                top: objData.top,
                radius: objData.radius,
                fill: objData.fill,
              });
              canvas.add(circle);
              break;
            case "line":
              const line = new fabric.Line([objData.x1, objData.y1, objData.x2, objData.y2], {
                stroke: objData.stroke,
                strokeWidth: 5,
              });
              canvas.add(line);
              break;
            case "text":
              const text = new fabric.Textbox(objData.text, {
                left: objData.left,
                top: objData.top,
                fontSize: objData.fontSize,
                fill: objData.fill,
                width: 200,
              });
              canvas.add(text);
              break;
            case "image":
              fabric.Image.fromURL(objData.src, (img) => {
                img.set({
                  left: objData.left,
                  top: objData.top,
                  scaleX: objData.scaleX,
                  scaleY: objData.scaleY,
                });
                canvas.add(img);
              });
              break;
            default:
              break;
          }
        });
        canvas.renderAll();
      }
    } catch (error) {
      console.error("Error al cargar el canvas:", error);
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
        <IconButton onClick={saveCanva}>
          <SaveIcon style={{ fontSize: 30 }} />
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
