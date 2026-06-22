import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 社区关怀网络：楼栋群 / 活动中心 / 社区食堂 / 服务站 / 卫生中心
const baseZones = [
  { name: "南苑楼栋", desc: "求助较多", x: -2.4, z: -1.1, color: 0xe8893a, dot: "bg-orange-500", baseHeight: 0.7 },
  { name: "活动中心", desc: "活动集中", x: -0.7, z: -0.3, color: 0x4a8fa8, dot: "bg-blue-500", baseHeight: 1.15 },
  { name: "社区食堂", desc: "送餐关怀", x: 1.1, z: -0.8, color: 0xe8a23b, dot: "bg-amber-500", baseHeight: 0.9 },
  { name: "服务站", desc: "响应中心", x: 0.2, z: 1.1, color: 0x5ba17a, dot: "bg-green-600", baseHeight: 1.35 },
  { name: "卫生中心", desc: "陪诊就医", x: 2.35, z: 0.75, color: 0xe26d5c, dot: "bg-red-400", baseHeight: 0.45 }
];

function makeMaterial(color, opacity = 1) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.55,
    metalness: 0.05,
    transparent: opacity < 1,
    opacity
  });
}

export default function CampusThreeMap({ intensity = 1, zoneStats = [], region = "全部社区" }) {
  const hostRef = useRef(null);
  const zones = baseZones.map((zone) => {
    const stat = zoneStats.find((item) => item.name === zone.name);
    const active = stat?.active ?? true;
    const height = stat ? Math.max(0.28, 0.35 + stat.score / 100) : zone.baseHeight;
    return { ...zone, ...stat, active, height: active ? height : Math.max(0.22, height * 0.38) };
  });

  useEffect(() => {
    if (!hostRef.current) return undefined;

    const host = hostRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfdf6ec);

    const camera = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(4.2, 4.1, 5.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.shadowMap.enabled = true;
    host.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 4.4;
    controls.maxDistance = 8.5;
    controls.minPolarAngle = Math.PI / 5;
    controls.maxPolarAngle = Math.PI / 2.35;
    controls.target.set(0, 0.25, 0);

    const group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.HemisphereLight(0xffffff, 0xf0e6d8, 2.2);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffffff, 2.4);
    sun.position.set(3, 7, 4);
    sun.castShadow = true;
    scene.add(sun);

    const ground = new THREE.Mesh(
      new THREE.BoxGeometry(6.4, 0.08, 4.4),
      makeMaterial(0xf7ecd9)
    );
    ground.position.y = -0.05;
    ground.receiveShadow = true;
    group.add(ground);

    const roadMaterial = makeMaterial(0xe8d9c0);
    const roadA = new THREE.Mesh(new THREE.BoxGeometry(6.1, 0.025, 0.12), roadMaterial);
    roadA.position.set(0, 0.02, 0.15);
    const roadB = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.025, 4.1), roadMaterial);
    roadB.position.set(0.35, 0.03, 0);
    group.add(roadA, roadB);

    const pulseDots = [];
    zones.forEach((zone, index) => {
      const block = new THREE.Mesh(
        new THREE.BoxGeometry(0.78, zone.height, 0.78),
        makeMaterial(zone.color, zone.active ? 0.92 : 0.34)
      );
      block.position.set(zone.x, zone.height / 2, zone.z);
      block.castShadow = true;
      block.receiveShadow = true;
      group.add(block);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(zone.active ? 0.4 + index * 0.015 : 0.28, 0.018, 10, 48),
        makeMaterial(zone.color, zone.active ? 0.5 : 0.16)
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.set(zone.x, 0.08, zone.z);
      group.add(ring);
      pulseDots.push(ring);
    });

    const routeMaterial = new THREE.LineBasicMaterial({ color: 0xe8893a, transparent: true, opacity: 0.55 });
    const points = [
      new THREE.Vector3(-2.4, 0.18, -1.1),
      new THREE.Vector3(-0.7, 0.18, -0.3),
      new THREE.Vector3(0.2, 0.18, 1.1),
      new THREE.Vector3(1.1, 0.18, -0.8),
      new THREE.Vector3(2.35, 0.18, 0.75)
    ];
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), routeMaterial));

    let frame = 0;
    let raf = 0;
    const animate = () => {
      frame += 0.01;
      pulseDots.forEach((ring, index) => {
        const scale = 1 + Math.sin(frame * 2 + index) * 0.08 * intensity;
        ring.scale.setScalar(scale);
      });
      controls.update();
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!host.clientWidth || !host.clientHeight) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      host.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [intensity, region, JSON.stringify(zoneStats)]);

  return (
    <div className="relative h-[300px] min-h-[280px] overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50 sm:h-[360px] sm:min-h-[320px]">
      <div ref={hostRef} className="absolute inset-0" aria-label="社区关怀网络三维地图" />
      <div className="pointer-events-none absolute left-3 right-3 top-3 rounded-2xl bg-white/90 px-3 py-2 shadow-sm backdrop-blur sm:left-4 sm:right-auto sm:top-4 sm:px-4 sm:py-3">
        <p className="text-sm font-black text-campus-ink">社区关怀网络图</p>
        <p className="mt-1 text-xs font-semibold text-campus-muted">{region} · 柱子越高代表该区域越活跃</p>
        <p className="mt-1 hidden text-xs font-semibold text-campus-muted sm:block">按住画面可以拖动旋转</p>
      </div>
      <div className="pointer-events-none absolute right-4 top-4 hidden w-36 space-y-2 rounded-2xl bg-white/85 p-3 text-xs font-bold text-campus-muted shadow-sm backdrop-blur sm:block">
        {zones.map((zone) => (
          <div key={zone.name} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${zone.dot}`} />
            <span className={zone.active ? "text-campus-ink" : ""}>{zone.name}</span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex gap-2 overflow-hidden text-xs font-bold text-campus-muted sm:bottom-4 sm:left-4 sm:right-4 sm:grid sm:grid-cols-5">
        {zones.map((zone) => (
          <span key={zone.name} className={`min-w-[7.5rem] flex-1 rounded-xl px-3 py-2 text-center shadow-sm backdrop-blur sm:min-w-0 ${zone.active ? "bg-white text-campus-orange ring-1 ring-campus-orange/25" : "bg-white/70 opacity-70"}`}>
            <span className="block text-campus-ink">{zone.name}</span>
            <span className="mt-0.5 block text-[11px]">{zone.desc}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
