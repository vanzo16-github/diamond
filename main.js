import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import fragment from "/shader/fragment.glsl";
import vertex from "/shader/vertex.glsl";
import img from '/1.jpg';

// Инициализация шаблона
const init = () => {
    const sizes = { 
        width: window.innerWidth,
        height: window.innerHeight,
    };

    const scene = new THREE.Scene();
    const canvas = document.querySelector('.canvas');
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.set(280, 110, 100);
    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
    

    // Свет
    const lightHemisphere = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    lightHemisphere.position.set(0, 50, 0);
    scene.add(lightHemisphere);


    // Модель
    let t = new THREE.TextureLoader().load(img);
    t.wraps = t.wrapT = THREE.MirroredRepeatWrapping;
    const material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        texture1: { value: t },
      },
      // wireframe: true,
      // transparent: true,
      vertexShader: vertex,
      fragmentShader: fragment
    });

    const geometry = new THREE.IcosahedronGeometry(1, 1);

    const plane = new THREE.Mesh(geometry, material);
    plane.scale.set(90, 90, 90);
    scene.add(plane);

    // Анимация 

    const animate = () => {

        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
        controls.update();
    }

    animate();

    // Базовые обпаботчики событий длы поддержки ресайза
    window.addEventListener('resize', () => {
        // Обновляем размеры
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // Обновляем соотношение сторон камеры
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Обновляем renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.render(scene, camera);
    });

    // Сделать во весь экран по двойному клику мыши
    window.addEventListener('dblclick', () => {
        if (!document.fullscreenElement) {
            canvas.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });
};

init();


