// @ts-nocheck
import React from "react";
import { Canvas, Skia, Shader, Fill } from "@shopify/react-native-skia";

const source = Skia.RuntimeEffect.Make(`
uniform float4 colors[1];
vec4 main(vec2 xy) {
  return colors[0];
}`)!;

const colors = ["#dafb61", "#61DAFB", "#fb61da", "#61fbcf"].map((c) =>
  Skia.Color(c)
);

const App = () => {
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill>
        <Shader source={source} uniforms={{ colors }} />
      </Fill>
    </Canvas>
  );
};

export default App;
