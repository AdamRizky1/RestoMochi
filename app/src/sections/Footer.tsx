import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Instagram, Phone, MessageCircle, Heart } from 'lucide-react';

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform sampler2D u_texture;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;

  #define PI 3.141592653589793

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float waveX(vec2 uv, float coefficient, float time) {
    return sin(uv.y * PI * coefficient + time);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse;
    uv.y = 1.0 - uv.y;

    float aspect1 = u_resolution.x / u_resolution.y;
    float aspect2 = 1000.0 / 562.0;
    float aspectRatio = aspect2 / aspect1;
    uv.x = (uv.x - 0.5) * aspectRatio + 0.5;

    vec2 distortion = vec2(0.0);
    float mouseInfluence = smoothstep(0.5, 0.0, distance(uv, mouse));

    distortion.x += waveX(uv, 4.0, u_time * 5.0) * 0.015;
    distortion.x += waveX(uv, 4.0, u_time * 5.0 + uv.x * 2.5) * 0.015 * mouseInfluence;
    distortion.x += noise(uv * 5.0 + u_time * 0.5) * 0.01;
    distortion.x += noise(uv * 10.0 + u_time) * 0.02 * mouseInfluence;

    uv += distortion;

    vec4 color = texture2D(u_texture, uv);
    float d = length(uv - mouse);
    float mask = 1.0 - smoothstep(0.3, 0.5, d);
    color.rgb += vec3(0.05, 0.05, 0.05) * mask;

    gl_FragColor = color;
  }
`;

export default function Footer() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const loader = new THREE.TextureLoader();
    const texture = loader.load('/assets/clouds_pastel.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_texture: { value: texture },
        u_time: { value: 0.0 },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_resolution: { value: new THREE.Vector2(container.offsetWidth, container.offsetHeight) },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();

    const onMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = e.clientX / window.innerWidth;
      targetMouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.1;

      material.uniforms.u_time.value = clock.getElapsedTime();
      material.uniforms.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      material.uniforms.u_resolution.value.set(container.offsetWidth, container.offsetHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <footer className="relative h-[400px] overflow-hidden">
      {/* WebGL Clouds Background */}
      <div ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl px-8 py-6 soft-shadow">
          <h3 className="font-['Quicksand'] font-bold text-2xl md:text-3xl text-[#432818] mb-3">
            Mochi Cafe & Resto
          </h3>
          <p className="text-sm text-[#8D6E63] mb-4">
            x Tamako Market Collaboration
          </p>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <a
              href="https://instagram.com/mochicaferesto"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#F08080]/10 flex items-center justify-center text-[#F08080] hover:bg-[#F08080] hover:text-white transition-all"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="tel:082122947007"
              className="w-10 h-10 rounded-full bg-[#A7C957]/10 flex items-center justify-center text-[#A7C957] hover:bg-[#A7C957] hover:text-white transition-all"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-[#F08080]/10 flex items-center justify-center text-[#F08080] hover:bg-[#F08080] hover:text-white transition-all"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          <p className="flex items-center justify-center gap-1 text-xs text-[#8D6E63]">
            Made with <Heart className="w-3 h-3 text-[#F08080] fill-[#F08080]" /> by Mochi Cafe Team
          </p>
        </div>
      </div>
    </footer>
  );
}