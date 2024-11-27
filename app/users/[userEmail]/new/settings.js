"use client";
import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color"; // Import ChromePicker

function Settings({ canvas }) {
  const [selectedObject, setSelectedObject] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [diameter, setDiameter] = useState("");
  const [color, setColor] = useState("#5d6469");
  const [strokeWidth, setStrokeWidth] = useState(0.5); // Hacer la línea más delgada por defecto
  const [fontSize, setFontSize] = useState(16); // Font size for text objects
  const [lineLength, setLineLength] = useState(""); // Length of the line
  const [showColorPicker, setShowColorPicker] = useState(false); // Controls the visibility of ChromePicker

  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (event) => {
        handleObjectSelection(event.selected[0]);
      });
      canvas.on("selection:updated", (event) => {
        handleObjectSelection(event.selected[0]);
      });
      canvas.on("selection:cleared", () => {
        setSelectedObject(null);
        clearSettings();
      });
      canvas.on("selection:modified", (event) => {
        handleObjectSelection(event.target);
      });
      canvas.on("selection:scaling", (event) => {
        handleObjectSelection(event.target);
      });
    }
  }, [canvas]);

  const handleObjectSelection = (object) => {
    if (!object) return;

    // Ignorar las imágenes
    if (object.type === "image") {
      setSelectedObject(null);
      clearSettings();
      return;
    }

    setSelectedObject(object);

    // Ajustes para diferentes tipos de objetos
    if (object.type === "rect") {
      setWidth(Math.round(object.width * object.scaleX));
      setHeight(Math.round(object.height * object.scaleY));
      setColor(object.fill || "#000000");
      setDiameter("");
      setStrokeWidth(0.5); // Fijar el grosor de la línea para rectángulos
    } else if (object.type === "circle") {
      setDiameter(Math.round(object.radius * 2 * object.scaleX));
      setColor(object.fill || "#000000");
      setWidth("");
      setHeight("");
      setStrokeWidth(0.5); // Fijar el grosor de la línea para círculos
    } else if (object.type === "triangle") {
      setWidth(Math.round(object.width * object.scaleX));
      setHeight(Math.round(object.height * object.scaleY));
      setColor(object.fill || "#000000");
      setDiameter("");
      setStrokeWidth(0.5); // Fijar el grosor de la línea para triángulos
    } else if (object.type === "line") {
      setColor(object.stroke || "#000000");
      setStrokeWidth(0.5); // Fijar el grosor de la línea para líneas
      setLineLength(
        Math.round(
          Math.sqrt(
            Math.pow(object.x2 - object.x1, 2) +
            Math.pow(object.y2 - object.y1, 2)
          )
        )
      );
      setWidth(""); // Restablecer el ancho de la línea
      setHeight(""); // Restablecer la altura de la línea
      setDiameter(""); // Restablecer el diámetro
    } else if (object.type === "text" || object.type === "textbox") {
      setFontSize(object.fontSize || 16); // Ajustar tamaño de fuente
      setColor(object.fill || "#000000");
      setWidth(""); // Restablecer el ancho
      setHeight(""); // Restablecer la altura
      setDiameter(""); // Restablecer el diámetro
    }
  };

  const clearSettings = () => {
    setWidth("");
    setHeight("");
    setColor("#000000");
    setDiameter("");
    setFontSize(16); // Restablecer el tamaño de fuente
    setStrokeWidth(0.5); // Restablecer el grosor de la línea
    setLineLength(""); // Restablecer longitud de la línea
  };

  const handleWidthChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = value === "" ? 0 : parseInt(value, 10);

    setWidth(intValue);

    if (
      selectedObject &&
      (selectedObject.type === "rect" || selectedObject.type === "triangle") &&
      intValue >= 0
    ) {
      selectedObject.set({ width: intValue / selectedObject.scaleX });
      canvas.renderAll();
    }
  };

  const handleHeightChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = value === "" ? 0 : parseInt(value, 10);

    setHeight(intValue);

    if (
      selectedObject &&
      (selectedObject.type === "rect" || selectedObject.type === "triangle") &&
      intValue >= 0
    ) {
      selectedObject.set({ height: intValue / selectedObject.scaleY });
      canvas.renderAll();
    }
  };

  const handleDiameterChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = value === "" ? 0 : parseInt(value, 10);

    setDiameter(intValue);

    if (selectedObject && selectedObject.type === "circle" && intValue >= 0) {
      selectedObject.set({ radius: intValue / 2 / selectedObject.scaleX });
      canvas.renderAll();
    }
  };

  const handleLineLengthChange = (e) => {
    const value = e.target.value;
    setLineLength(value);

    if (selectedObject && selectedObject.type === "line" && value >= 0) {
      const angle = Math.atan2(
        selectedObject.y2 - selectedObject.y1,
        selectedObject.x2 - selectedObject.x1
      );
      const x2 = selectedObject.x1 + value * Math.cos(angle);
      const y2 = selectedObject.y1 + value * Math.sin(angle);

      selectedObject.set({ x2, y2 });
      canvas.renderAll();
    }
  };

  const handleFontSizeChange = (e) => {
    const value = e.target.value;
    setFontSize(value);

    if (
      selectedObject &&
      (selectedObject.type === "text" || selectedObject.type === "textbox")
    ) {
      selectedObject.set({ fontSize: value });
      canvas.renderAll();
    }
  };

  const handleColorChange = (color) => {
    setColor(color.hex);

    if (selectedObject) {
      selectedObject.set({ fill: color.hex, stroke: color.hex });
      canvas.renderAll();
    }
  };

  return (
    <div className="Settings">
      {selectedObject && selectedObject.type !== "image" && (
        <>
          {selectedObject.type === "rect" && (
            <>
              <input
                label="Width"
                value={width || ""}
                onChange={handleWidthChange}
              />
              <input
                label="Height"
                value={height || ""}
                onChange={handleHeightChange}
              />
            </>
          )}
          {selectedObject.type === "triangle" && (
            <>
              <input
                label="Width"
                value={width || ""}
                onChange={handleWidthChange}
              />
              <input
                label="Height"
                value={height || ""}
                onChange={handleHeightChange}
              />
            </>
          )}
          {selectedObject.type === "circle" && (
            <>
              <input
                label="Diameter"
                value={diameter || ""}
                onChange={handleDiameterChange}
              />
            </>
          )}
          {selectedObject.type === "line" && (
            <>
              <input
                label="Length"
                type="number"
                value={lineLength || ""}
                onChange={handleLineLengthChange}
              />
            </>
          )}
          {selectedObject.type === "text" ||
            selectedObject.type === "textbox" ? (
            <>
              <input
                label="Font Size"
                type="number"
                value={fontSize || ""}
                onChange={handleFontSizeChange}
              />
            </>
          ) : null}
          <div style={{ position: "relative" }}>
            <label
              style={{ display: "block", marginBottom: "8px", color: "black" }}
            >
              Color
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "40px",
                  backgroundColor: color,
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textAlign: "center",
                  lineHeight: "40px",
                  color: "#fff",
                }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                {color}
              </div>
              {showColorPicker && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    zIndex: 2,
                  }}
                >
                  <ChromePicker color={color} onChange={handleColorChange} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Settings;
