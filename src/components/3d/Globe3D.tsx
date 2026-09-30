import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Coordinates, Language } from '../../types';
import { countriesData, landmarksData } from '../../data/earthData';
import { getTranslation } from '../../data/i18n';

interface Globe3DProps {
  onSelectCountry?: (countryCode: string) => void;
  onSelectLandmark?: (landmarkId: string) => void;
  targetCoordinates?: Coordinates | null;
  autoRotateDefault?: boolean;
  theme?: 'dark' | 'light';
  quality?: 'high' | 'medium' | 'low';
  heightClass?: string;
  is2DMode?: boolean;
  lang?: Language;
}

export const Globe3D: React.FC<Globe3DProps> = ({
  onSelectCountry,
  onSelectLandmark,
  targetCoordinates,
  autoRotateDefault = true,
  theme = 'dark',
  quality = 'high',
  heightClass = 'h-[550px] md:h-[650px] w-full',
  is2DMode = false,
  lang = 'en',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(autoRotateDefault);
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  // Scene references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const cloudsRef = useRef<THREE.Mesh | null>(null);
  const markerMeshesRef = useRef<{ mesh: THREE.Mesh; id: string; type: 'country' | 'landmark'; name: string }[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.2, y: -0.8 });
  const cameraDistanceRef = useRef(4.6);
  const targetCameraDistanceRef = useRef(4.6);

  // Helper: Convert Lat/Lng to 3D Sphere Vector
  const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  // Helper: Generate Procedural Earth Texture
  const createProceduralEarthTexture = (isDark: boolean): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Ocean base
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, 1024);
    if (isDark) {
      oceanGradient.addColorStop(0, '#040d21');
      oceanGradient.addColorStop(0.3, '#0b1d3a');
      oceanGradient.addColorStop(0.7, '#071830');
      oceanGradient.addColorStop(1, '#020914');
    } else {
      oceanGradient.addColorStop(0, '#1e40af');
      oceanGradient.addColorStop(0.5, '#0284c7');
      oceanGradient.addColorStop(1, '#1e3a8a');
    }
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, 2048, 1024);

    // Subtle latitude and longitude coordinates grid
    ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 2048; x += 128) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }
    for (let y = 0; y <= 1024; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(2048, y);
      ctx.stroke();
    }

    // Draw continent landmass approximations
    const continents = [
      // Eurasia & Central Asia
      { cx: 1250, cy: 300, rx: 420, ry: 190, color: isDark ? '#143128' : '#15803d' },
      { cx: 1400, cy: 260, rx: 280, ry: 130, color: isDark ? '#1e3a2b' : '#166534' },
      { cx: 1340, cy: 380, rx: 160, ry: 90, color: isDark ? '#3d3419' : '#ca8a04' }, // Central Asia/Silk Road desert oasis
      // Africa
      { cx: 1100, cy: 540, rx: 200, ry: 250, color: isDark ? '#382a17' : '#d97706' },
      { cx: 1120, cy: 680, rx: 140, ry: 170, color: isDark ? '#173623' : '#15803d' },
      // North America
      { cx: 480, cy: 300, rx: 270, ry: 190, color: isDark ? '#193322' : '#15803d' },
      { cx: 380, cy: 210, rx: 220, ry: 120, color: isDark ? '#263b32' : '#166534' },
      // South America
      { cx: 620, cy: 680, rx: 170, ry: 240, color: isDark ? '#143825' : '#15803d' },
      // Australia
      { cx: 1720, cy: 740, rx: 160, ry: 120, color: isDark ? '#402a18' : '#b45309' },
      // Antarctica
      { cx: 1024, cy: 980, rx: 900, ry: 70, color: isDark ? '#cbd5e1' : '#f8fafc' },
      // Greenland & Arctic
      { cx: 780, cy: 120, rx: 110, ry: 80, color: isDark ? '#94a3b8' : '#e2e8f0' }
    ];

    continents.forEach(c => {
      ctx.beginPath();
      ctx.ellipse(c.cx, c.cy, c.rx, c.ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();

      // Soft coastal gradient fringe
      ctx.lineWidth = 12;
      ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.25)';
      ctx.stroke();
    });

    // Night city light clusters
    if (isDark) {
      const cityLights = [
        { x: 1380, y: 320, r: 6 }, // Samarkand / Tashkent Silk Road hub
        { x: 1060, y: 310, r: 10 }, // Rome / Southern Europe
        { x: 1140, y: 390, r: 8 },  // Cairo / Nile
        { x: 1530, y: 340, r: 12 }, // East Asia
        { x: 520, y: 310, r: 12 },  // North America East Coast
        { x: 380, y: 330, r: 8 },   // North America West Coast
        { x: 1690, y: 770, r: 6 },  // Sydney
        { x: 670, y: 740, r: 8 }    // São Paulo / Rio
      ];
      cityLights.forEach(light => {
        const glow = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.r * 3);
        glow.addColorStop(0, '#fef08a');
        glow.addColorStop(0.3, 'rgba(245, 158, 11, 0.7)');
        glow.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(light.x, light.y, light.r * 3, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  };

  // Helper: Procedural Clouds Texture
  const createProceduralCloudTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    ctx.clearRect(0, 0, 1024, 512);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';

    for (let i = 0; i < 60; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const rx = 40 + Math.random() * 90;
      const ry = 15 + Math.random() * 35;
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, (Math.random() - 0.5) * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  };

  // Smoothly orient camera to target coordinate if provided
  useEffect(() => {
    if (!targetCoordinates) return;
    const phi = (targetCoordinates.lat * Math.PI) / 180;
    const theta = (targetCoordinates.lng * Math.PI) / 180;
    targetRotationRef.current = {
      x: phi,
      y: -theta - Math.PI / 2,
    };
    targetCameraDistanceRef.current = 3.6;
    setAutoRotate(false);
  }, [targetCoordinates]);

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    if (is2DMode || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      if (!window.WebGLRenderingContext || (!testCanvas.getContext('webgl') && !testCanvas.getContext('experimental-webgl'))) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    // Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, cameraDistanceRef.current);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: quality !== 'low', alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, quality === 'high' ? 2 : 1.5));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(theme === 'dark' ? 0x223344 : 0x778899, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffbeb, theme === 'dark' ? 2.5 : 2.0);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    // Starfield for deep space aesthetic
    if (theme === 'dark') {
      const starsGeometry = new THREE.BufferGeometry();
      const starCount = quality === 'high' ? 900 : 450;
      const positions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 80;
        positions[i + 1] = (Math.random() - 0.5) * 80;
        positions[i + 2] = -15 - Math.random() * 40;
      }
      starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const starsMaterial = new THREE.PointsMaterial({
        color: 0x93c5fd,
        size: 0.18,
        transparent: true,
        opacity: 0.85,
      });
      const starField = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(starField);
    }

    // Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // 1. Earth Sphere
    const earthRadius = 1.6;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthTexture = createProceduralEarthTexture(theme === 'dark');
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.65,
      metalness: 0.15,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // 2. Atmospheric Glow Shell
    const glowGeo = new THREE.SphereGeometry(earthRadius * 1.025, 48, 48);
    const glowMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x0ea5e9 : 0x38bdf8,
      transparent: true,
      opacity: theme === 'dark' ? 0.22 : 0.15,
      side: THREE.BackSide,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    globeGroup.add(glowMesh);

    // 3. Clouds Layer
    const cloudsGeo = new THREE.SphereGeometry(earthRadius * 1.012, 48, 48);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: createProceduralCloudTexture(),
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    globeGroup.add(cloudsMesh);
    cloudsRef.current = cloudsMesh;

    // 4. Interactive Location Pins (Countries & Key Silk Road / World Landmarks)
    markerMeshesRef.current = [];
    const pinGroup = new THREE.Group();
    globeGroup.add(pinGroup);

    // Create markers for countries
    countriesData.forEach(country => {
      const pos = latLngToVector3(country.coordinates.lat, country.coordinates.lng, earthRadius * 1.015);
      const isUzbekistan = country.code === 'UZ';
      
      const pinGeo = new THREE.SphereGeometry(isUzbekistan ? 0.045 : 0.03, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: isUzbekistan ? 0x38bdf8 : 0xf59e0b,
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      pinGroup.add(pinMesh);

      // Outer animated pulse ring for Uzbekistan / Silk Road
      if (isUzbekistan) {
        const ringGeo = new THREE.RingGeometry(0.05, 0.08, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.75,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.copy(pos.clone().multiplyScalar(1.002));
        ringMesh.lookAt(0, 0, 0);
        pinGroup.add(ringMesh);
      }

      markerMeshesRef.current.push({
        mesh: pinMesh,
        id: country.code,
        type: 'country',
        name: country.name,
      });
    });

    // Create markers for major landmarks
    landmarksData.forEach(landmark => {
      const pos = latLngToVector3(landmark.coordinates.lat, landmark.coordinates.lng, earthRadius * 1.018);
      const landmarkGeo = new THREE.ConeGeometry(0.022, 0.06, 8);
      landmarkGeo.rotateX(Math.PI / 2);
      const landmarkMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
      });
      const landmarkMesh = new THREE.Mesh(landmarkGeo, landmarkMat);
      landmarkMesh.position.copy(pos);
      landmarkMesh.lookAt(0, 0, 0);
      pinGroup.add(landmarkMesh);

      markerMeshesRef.current.push({
        mesh: landmarkMesh,
        id: landmark.id,
        type: 'landmark',
        name: landmark.name,
      });
    });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Raycaster for Marker Clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Check hover on markers
      raycaster.setFromCamera(mouse, camera);
      const meshes = markerMeshesRef.current.map(m => m.mesh);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const found = markerMeshesRef.current.find(m => m.mesh === intersects[0].object);
        if (found) {
          setHoveredEntity(found.name);
          renderer.domElement.style.cursor = 'pointer';
        }
      } else {
        setHoveredEntity(null);
        renderer.domElement.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
      }

      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousMousePositionRef.current.x;
        const deltaY = e.clientY - previousMousePositionRef.current.y;
        targetRotationRef.current.y += deltaX * 0.006;
        targetRotationRef.current.x = Math.max(-1.4, Math.min(1.4, targetRotationRef.current.x + deltaY * 0.006));
        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDraggingRef.current = false;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = markerMeshesRef.current.map(m => m.mesh);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const hit = markerMeshesRef.current.find(m => m.mesh === intersects[0].object);
        if (hit) {
          if (hit.type === 'country' && onSelectCountry) {
            onSelectCountry(hit.id);
          } else if (hit.type === 'landmark' && onSelectLandmark) {
            onSelectLandmark(hit.id);
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetCameraDistanceRef.current = Math.max(2.2, Math.min(7.0, targetCameraDistanceRef.current + e.deltaY * 0.003));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    domElement.addEventListener('wheel', handleWheel, { passive: false });

    // WebGL Context Lost Handling
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    };
    const handleContextRestored = () => {
      // Restore will trigger through standard react update
    };
    domElement.addEventListener('webglcontextlost', handleContextLost, false);
    domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    // Animation Loop
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      // Auto rotation
      if (autoRotate && !isDraggingRef.current) {
        targetRotationRef.current.y += 0.0018;
      }

      // Smooth interpolation (damping)
      if (globeGroupRef.current) {
        globeGroupRef.current.rotation.x += (targetRotationRef.current.x - globeGroupRef.current.rotation.x) * 0.08;
        globeGroupRef.current.rotation.y += (targetRotationRef.current.y - globeGroupRef.current.rotation.y) * 0.08;
      }

      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += 0.0007;
      }

      // Smooth camera zoom
      cameraDistanceRef.current += (targetCameraDistanceRef.current - cameraDistanceRef.current) * 0.1;
      camera.position.z = cameraDistanceRef.current;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      domElement.removeEventListener('wheel', handleWheel);
      domElement.removeEventListener('webglcontextlost', handleContextLost);
      domElement.removeEventListener('webglcontextrestored', handleContextRestored);
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [theme, quality, autoRotate, is2DMode, onSelectCountry, onSelectLandmark]);

  const handleResetCamera = useCallback(() => {
    targetRotationRef.current = { x: 0.2, y: -0.8 };
    targetCameraDistanceRef.current = 4.6;
    setAutoRotate(true);
  }, []);

  const handleZoomIn = useCallback(() => {
    targetCameraDistanceRef.current = Math.max(2.2, targetCameraDistanceRef.current - 0.6);
  }, []);

  const handleZoomOut = useCallback(() => {
    targetCameraDistanceRef.current = Math.min(7.0, targetCameraDistanceRef.current + 0.6);
  }, []);

  // 2D Map Alternative
  if (is2DMode || !webglSupported) {
    return (
      <div className={`relative ${heightClass} flex flex-col items-center justify-center rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-slate-900 border border-slate-800' : 'bg-slate-100 border border-slate-300'}`}>
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
            2D Projection Mode
          </span>
          <span className="text-xs text-slate-400">Low-Performance Cartographic Canvas</span>
        </div>

        {/* 2D Interactive World Map Container */}
        <div className="w-full max-w-4xl p-6 flex flex-col items-center">
          <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden shadow-2xl bg-[#09152a] border border-cyan-900/40 p-4 flex items-center justify-center">
            {/* SVG Continents & Markers */}
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              <defs>
                <radialGradient id="oceanGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0f2b4c" />
                  <stop offset="100%" stopColor="#061224" />
                </radialGradient>
              </defs>
              <rect width="1000" height="500" fill="url(#oceanGrad)" rx="8" />

              {/* Grid Lines */}
              <path d="M 0,250 L 1000,250 M 500,0 L 500,500 M 0,125 L 1000,125 M 0,375 L 1000,375 M 250,0 L 250,500 M 750,0 L 750,500" stroke="rgba(56,189,248,0.12)" strokeWidth="1" fill="none" />

              {/* Stylized 2D Continents */}
              {/* Eurasia */}
              <path d="M 520,120 Q 640,90 780,120 T 920,200 Q 860,280 720,270 Q 640,300 580,240 Q 520,200 520,120 Z" fill="#1e3a2b" stroke="#38bdf8" strokeWidth="0.8" opacity="0.9" />
              {/* Central Asia Silk Road Highlight */}
              <circle cx="680" cy="180" r="28" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="1.5" />
              {/* Africa */}
              <path d="M 500,220 Q 580,240 560,340 Q 530,420 500,430 Q 450,340 460,260 Z" fill="#2d2a1b" stroke="#f59e0b" strokeWidth="0.8" opacity="0.9" />
              {/* North America */}
              <path d="M 160,110 Q 320,120 310,240 Q 230,270 190,240 Q 140,180 160,110 Z" fill="#1b3324" stroke="#38bdf8" strokeWidth="0.8" opacity="0.9" />
              {/* South America */}
              <path d="M 270,270 Q 360,290 330,420 Q 280,470 260,390 Z" fill="#143825" stroke="#38bdf8" strokeWidth="0.8" opacity="0.9" />
              {/* Australia */}
              <path d="M 820,340 Q 920,340 910,420 Q 840,430 810,380 Z" fill="#3b2b1a" stroke="#f59e0b" strokeWidth="0.8" opacity="0.9" />

              {/* Interactive Country Markers */}
              {countriesData.map(c => {
                // Map lat/long to 2D SVG coords
                const x = ((c.coordinates.lng + 180) / 360) * 1000;
                const y = ((90 - c.coordinates.lat) / 180) * 500;
                const isUz = c.code === 'UZ';
                return (
                  <g key={c.code} className="cursor-pointer group" onClick={() => onSelectCountry?.(c.code)}>
                    {isUz && <circle cx={x} cy={y} r="12" fill="none" stroke="#38bdf8" strokeWidth="2" className="animate-ping" />}
                    <circle cx={x} cy={y} r={isUz ? 6 : 4} fill={isUz ? '#38bdf8' : '#f59e0b'} />
                    <text x={x + 8} y={y + 4} fill="#ffffff" fontSize="10" fontFamily="sans-serif" className="pointer-events-none drop-shadow">
                      {c.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {countriesData.slice(0, 6).map(c => (
              <button
                key={c.code}
                onClick={() => onSelectCountry?.(c.code)}
                className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 text-slate-200 hover:bg-cyan-900/60 hover:text-cyan-300 transition-colors border border-slate-700"
              >
                {c.flag} {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isDark = theme === 'dark';
  const t = (key: any) => getTranslation(lang, key);

  return (
    <div className={`relative ${heightClass} rounded-2xl overflow-hidden select-none ${
      isDark ? 'bg-slate-950' : 'bg-slate-100'
    }`}>
      {/* Three.js Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD Controls */}
      <div className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} z-20 flex flex-col gap-2`}>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          title={autoRotate ? 'Stop Rotation' : 'Start Auto Rotation'}
          className={`p-2.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all border shadow-xs ${
            autoRotate
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
              : isDark
              ? 'bg-slate-900/80 text-slate-200 border-white/10 hover:bg-slate-800'
              : 'bg-white/90 text-slate-800 border-slate-300 hover:bg-white'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <svg className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span className="hidden sm:inline">{autoRotate ? t('autoRotate') : t('resetView')}</span>
          </span>
        </button>

        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className={`p-2.5 rounded-xl text-xs font-semibold backdrop-blur-md border shadow-xs transition-colors ${
            isDark
              ? 'bg-slate-900/80 text-slate-200 border-white/10 hover:bg-slate-800'
              : 'bg-white/90 text-slate-800 border-slate-300 hover:bg-white'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className={`p-2.5 rounded-xl text-xs font-semibold backdrop-blur-md border shadow-xs transition-colors ${
            isDark
              ? 'bg-slate-900/80 text-slate-200 border-white/10 hover:bg-slate-800'
              : 'bg-white/90 text-slate-800 border-slate-300 hover:bg-white'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        <button
          onClick={handleResetCamera}
          title={t('resetView')}
          className={`p-2.5 rounded-xl text-xs font-semibold backdrop-blur-md border shadow-xs transition-colors ${
            isDark
              ? 'bg-slate-900/80 text-slate-200 border-white/10 hover:bg-slate-800'
              : 'bg-white/90 text-slate-800 border-slate-300 hover:bg-white'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>

      {/* Floating Hover Indicator / Tooltip */}
      {hoveredEntity && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className={`px-4 py-2 rounded-xl backdrop-blur-md border text-xs font-semibold shadow-2xl flex items-center gap-2 ${
            isDark
              ? 'bg-slate-950/90 text-cyan-300 border-cyan-500/40'
              : 'bg-white/95 text-cyan-800 border-cyan-400'
          }`}>
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>{t('targetInspect')}: {hoveredEntity}</span>
            <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>({t('dragRotateHint')})</span>
          </div>
        </div>
      )}

      {/* Subtle Legend overlay */}
      <div className={`absolute bottom-4 ${lang === 'ar' ? 'right-4' : 'left-4'} z-20 hidden sm:flex items-center gap-4 px-3 py-1.5 rounded-xl backdrop-blur-md border text-[11px] ${
        isDark
          ? 'bg-slate-950/80 text-slate-300 border-white/10'
          : 'bg-white/90 text-slate-700 border-slate-300 shadow-xs'
      }`}>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span>{lang === 'uz' ? 'Ipak yo‘li / Davlat' : lang === 'ru' ? 'Шелковый путь / Страна' : lang === 'ar' ? 'طريق الحرير / دولة' : 'Silk Road / Nation'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span>{t('capitalCity')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
          <span>{lang === 'uz' ? 'Qadimiy mo‘jiza' : lang === 'ru' ? 'Древнее чудо' : lang === 'ar' ? 'معلم أثري' : 'Ancient Wonder'}</span>
        </div>
      </div>
    </div>
  );
};
