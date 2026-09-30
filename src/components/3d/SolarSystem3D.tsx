import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { celestialBodiesData } from '../../data/spaceData';
import { CelestialBody, Language, ThemeMode } from '../../types';
import { getTranslation } from '../../data/i18n';

interface SolarSystem3DProps {
  onSelectBody?: (body: CelestialBody) => void;
  selectedBodyId?: string;
  theme?: ThemeMode;
  lang?: Language;
}

export const SolarSystem3D: React.FC<SolarSystem3DProps> = ({
  onSelectBody,
  selectedBodyId = 'earth',
  theme = 'dark',
  lang = 'en',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<CelestialBody>(
    celestialBodiesData.find(b => b.id === selectedBodyId) || celestialBodiesData[3]
  );

  const isDark = theme === 'dark';
  const t = (key: any) => getTranslation(lang, key);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Mesh registries for click & rotation
  const planetsRef = useRef<{ id: string; mesh: THREE.Mesh; orbitGroup: THREE.Group; speed: number }[]>([]);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraAngleRef = useRef({ x: 0.5, y: 0.3 });
  const cameraDistRef = useRef(35);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 20, cameraDistRef.current);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Ambient light & central Sun light
    const ambient = new THREE.AmbientLight(0x223344, 1.2);
    scene.add(ambient);

    const sunLight = new THREE.PointLight(0xfff7ed, 4.0, 300);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Deep space background stars
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 600;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 150;
      starPos[i + 1] = (Math.random() - 0.5) * 150;
      starPos[i + 2] = (Math.random() - 0.5) * 150;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3 });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // Central Sun Mesh
    const sunGeo = new THREE.SphereGeometry(2.4, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sunMesh);

    // Sun Glow Halo
    const haloGeo = new THREE.SphereGeometry(2.7, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(haloGeo, haloMat));

    // Scale orbital positions
    const planetsConfig = [
      { id: 'mercury', distance: 4.5, radius: 0.35, color: 0x94a3b8, speed: 0.024 },
      { id: 'venus', distance: 6.8, radius: 0.6, color: 0xf59e0b, speed: 0.018 },
      { id: 'earth', distance: 9.8, radius: 0.68, color: 0x38bdf8, speed: 0.013 },
      { id: 'mars', distance: 13.0, radius: 0.48, color: 0xef4444, speed: 0.010 },
      { id: 'jupiter', distance: 18.0, radius: 1.5, color: 0xd97706, speed: 0.006 },
      { id: 'saturn', distance: 23.5, radius: 1.2, color: 0xeab308, speed: 0.004, hasRings: true },
    ];

    planetsRef.current = [];

    planetsConfig.forEach(cfg => {
      // Orbit group (rotates around Sun)
      const orbitGroup = new THREE.Group();
      scene.add(orbitGroup);

      // Orbit guide ring
      const orbitLineGeo = new THREE.RingGeometry(cfg.distance - 0.04, cfg.distance + 0.04, 64);
      const orbitLineMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.14,
      });
      const orbitRing = new THREE.Mesh(orbitLineGeo, orbitLineMat);
      orbitRing.rotation.x = Math.PI / 2;
      scene.add(orbitRing);

      // Planet Mesh
      const planetGeo = new THREE.SphereGeometry(cfg.radius, 32, 32);
      const planetMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: 0.7,
        metalness: 0.2,
      });
      const planetMesh = new THREE.Mesh(planetGeo, planetMat);
      planetMesh.position.x = cfg.distance;
      orbitGroup.add(planetMesh);

      // Saturn Rings
      if (cfg.hasRings) {
        const ringGeo = new THREE.RingGeometry(cfg.radius * 1.4, cfg.radius * 2.3, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xd97706,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3;
        planetMesh.add(ringMesh);
      }

      // Moon for Earth
      if (cfg.id === 'earth') {
        const moonGeo = new THREE.SphereGeometry(0.16, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1 });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.x = 1.2;
        planetMesh.add(moonMesh);
      }

      planetsRef.current.push({
        id: cfg.id,
        mesh: planetMesh,
        orbitGroup,
        speed: cfg.speed,
      });
    });

    // Pointer Drag Controls
    const domElement = renderer.domElement;
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;
      cameraAngleRef.current.y += deltaX * 0.005;
      cameraAngleRef.current.x = Math.max(0.1, Math.min(1.4, cameraAngleRef.current.x + deltaY * 0.005));
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraDistRef.current = Math.max(12, Math.min(65, cameraDistRef.current + e.deltaY * 0.04));
    };

    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    // Resize
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      // Rotate planets around Sun
      planetsRef.current.forEach(p => {
        p.orbitGroup.rotation.y += p.speed * 0.4;
        p.mesh.rotation.y += 0.02;
      });

      // Update camera orbit position
      const cx = cameraDistRef.current * Math.sin(cameraAngleRef.current.y) * Math.cos(cameraAngleRef.current.x);
      const cy = cameraDistRef.current * Math.sin(cameraAngleRef.current.x);
      const cz = cameraDistRef.current * Math.cos(cameraAngleRef.current.y) * Math.cos(cameraAngleRef.current.x);
      camera.position.set(cx, cy, cz);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', onResize);
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('wheel', onWheel);
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [theme]);

  const handleSelectPlanet = (bodyId: string) => {
    const found = celestialBodiesData.find(b => b.id === bodyId);
    if (found) {
      setSelected(found);
      onSelectBody?.(found);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-stretch">
      {/* 3D Solar Canvas */}
      <div className={`flex-1 relative h-[420px] md:h-[520px] rounded-2xl overflow-hidden border ${
        isDark ? 'bg-slate-950 border-cyan-900/30' : 'bg-slate-900 border-slate-300 shadow-md'
      }`}>
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Planet quick selector bar */}
        <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap gap-1.5 justify-center sm:justify-start">
          {celestialBodiesData.map(b => (
            <button
              key={b.id}
              onClick={() => handleSelectPlanet(b.id)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                selected.id === b.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-white/10'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>

        <div className="absolute bottom-4 right-4 z-10 text-[11px] text-slate-300 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
          {t('dragRotateHint')}
        </div>
      </div>

      {/* Selected Celestial Body Educational Card */}
      <div className={`w-full lg:w-96 rounded-2xl p-6 border shadow-xl flex flex-col justify-between ${
        isDark
          ? 'bg-slate-900/90 backdrop-blur-xl border-slate-800 text-slate-200'
          : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-inherit">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-cyan-500 font-mono font-bold">
                {selected.type}
              </span>
              <h3 className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {selected.name}
              </h3>
            </div>
            <div
              className="w-8 h-8 rounded-full border border-white/20 shadow-lg"
              style={{ backgroundColor: selected.colorHex }}
            />
          </div>

          <p className={`mt-3 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {selected.description}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className={`p-2.5 rounded-xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <span className={`text-[10px] block font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('planetRadius')}</span>
              <span className={`text-xs font-mono font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                {selected.radiusKm.toLocaleString()} km
              </span>
            </div>

            <div className={`p-2.5 rounded-xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <span className={`text-[10px] block font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('distanceToSun')}</span>
              <span className={`text-xs font-mono font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                {selected.distanceFromSunMillionKm} {t('millionKm')}
              </span>
            </div>

            <div className={`p-2.5 rounded-xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <span className={`text-[10px] block font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('orbitalPeriod')}</span>
              <span className={`text-xs font-mono font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                {selected.orbitalPeriodDays} {t('daysUnit')}
              </span>
            </div>

            <div className={`p-2.5 rounded-xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <span className={`text-[10px] block font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('surfaceGravity')}</span>
              <span className={`text-xs font-mono font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                {selected.surfaceGravityMs2} m/s²
              </span>
            </div>
          </div>

          <div className={`mt-4 p-3 rounded-xl border ${
            isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <span className={`text-[10px] block font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('atmosphereComposition')}</span>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{selected.atmosphereComposition}</p>
          </div>

          <div className="mt-3">
            <span className={`text-[10px] block font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('keyMissions')}</span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {selected.missions.map(m => (
                <span
                  key={m}
                  className={`px-2 py-0.5 text-[11px] rounded border ${
                    isDark
                      ? 'bg-slate-800 text-cyan-300 border-cyan-800/40'
                      : 'bg-cyan-50 text-cyan-800 border-cyan-200 font-medium'
                  }`}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-5 pt-3 border-t border-inherit text-[10px] leading-tight ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          {t('solarSystemDisclaimer')}
        </div>
      </div>
    </div>
  );
};
