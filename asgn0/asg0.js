// DrawTriangle.js (c) 2012 matsuda

var ctx;

function drawVector(v, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(200 + (v.elements[0] * 20), 200 - (v.elements[1] * 20));
  ctx.stroke();
}

function angleBetween(v1, v2) {
  var dot = Vector3.dot(v1, v2);
  var mag_v1 = v1.magnitude();
  var mag_v2 = v2.magnitude();
  var cos = dot / (mag_v1 * mag_v2);
  var angle = (Math.acos(cos)) * (180 / Math.PI); // radians to degrees
  return angle;
}

function areaTriangle(v1, v2) {
  var cross = Vector3.cross(v1, v2);
  var area = 0.5 * cross.magnitude();
  return area;
}

function handleDrawEvent() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);

  var x = document.getElementById("x").value;
  var y = document.getElementById("y").value;
  var v1 = new Vector3([x, y, 0]);
  drawVector(v1, "red");

  var x2 = document.getElementById("x2").value;
  var y2 = document.getElementById("y2").value;
  var v2 = new Vector3([x2, y2, 0]);
  drawVector(v2, "blue");

  return { v1, v2 };
}

function handleDrawOperationEvent() {
  var { v1, v2 } = handleDrawEvent(); // using handleDrawEvent otherwise repeated code

  var operation = document.getElementById("op").value;
  var scalar = document.getElementById("scalar").value;
  if (operation == "add") {
    var v3 = new Vector3(v1.elements).add(v2); // creating a new vector because otherwise the original is overwritten
    drawVector(v3, "green");
  }
  else if (operation == "sub") {
    var v3 = new Vector3(v1.elements).sub(v2);
    drawVector(v3, "green");
  }
  else if (operation == "mul") {
    var v3 = new Vector3(v1.elements).mul(scalar);
    drawVector(v3, "green");
    var v4 = new Vector3(v2.elements).mul(scalar);
    drawVector(v4, "green");
  }
  else if (operation == "div") {
    var v3 = new Vector3(v1.elements).div(scalar);
    drawVector(v3, "green");
    var v4 = new Vector3(v2.elements).div(scalar);
    drawVector(v4, "green");
  }
  else if (operation == "mag") {
    console.log("Magnitude v1: ", v1.magnitude());
    console.log("Magnitude v2: ", v2.magnitude());
  }
  else if (operation == "norm") {
    var v3 = new Vector3(v1.elements).normalize();
    drawVector(v3, "green");
    var v4 = new Vector3(v2.elements).normalize();
    drawVector(v4, "green");

    console.log("Magnitude v1: ", v1.magnitude());
    console.log("Magnitude v2: ", v2.magnitude());
  }
  else if (operation == "angle") {
    var angle = angleBetween(v1, v2);
    console.log("Angle: ", angle);
  }
  else if (operation == "area") {
    var area = areaTriangle(v1, v2);
    console.log("Area of the triangle: ", area);
  }
}

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d');

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);        // Fill a rectangle with the color

  // var v1 = new Vector3([2.25, 2.25, 0]);
  // drawVector(v1, 'red');
}