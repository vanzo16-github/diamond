varying vec3 vNormal;
varying vec3 vEye;


void main() {
  vec3 newPosition = position;
  vNormal = normalize(normalMatrix*normal);
  vec4 worldPosition = modelMatrix * vec4 (newPosition, 1.0);
  vEye = normalize(worldPosition.xyz - cameraPosition);

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}