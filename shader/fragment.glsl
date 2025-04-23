uniform sampler2D texture1;
varying vec3 vNormal;
varying vec3 vEye;

void main()	{
	vec2 uv = gl_FragCoord.xy/vec2(1000.);
	vec3 x = dFdx(vNormal);
	vec3 y = dFdy(vNormal);
	vec3 normal = normalize(cross(x,y));

	vec3 refracted = refract(vEye, normal, 1./3.);
	uv += refracted.xy;

	float diffuse = dot(normal,vec3(1.));
	vec4 t = texture(texture1, uv);
	gl_FragColor = t;
}