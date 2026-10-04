const section=document.querySelector('[data-moto-scroll]');
const canvas=document.querySelector('[data-moto-canvas]');
const stage=canvas?.closest('.moto-stage');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');

if(section&&canvas&&stage) try {
    const THREE=await import('https://unpkg.com/three@0.180.0/build/three.module.min.js');
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(30,1,.1,100);
    camera.position.set(0,.35,8.5);
    const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.15;

    const bike=new THREE.Group();
    bike.rotation.order='YXZ'; scene.add(bike);
    const dark=new THREE.MeshStandardMaterial({color:0x14221f,roughness:.42,metalness:.72});
    const metal=new THREE.MeshStandardMaterial({color:0xa9b0a8,roughness:.28,metalness:.9});
    const rubber=new THREE.MeshStandardMaterial({color:0x111514,roughness:.8,metalness:.05});
    const leather=new THREE.MeshStandardMaterial({color:0x2b211c,roughness:.9});
    const paint=new THREE.MeshStandardMaterial({color:0xb75a35,roughness:.3,metalness:.58});
    const lamp=new THREE.MeshStandardMaterial({color:0xffdda0,emissive:0xffb44f,emissiveIntensity:1.7,roughness:.2});
    const tube=(a,b,r=.055,material=dark)=>{const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),delta=end.clone().sub(start);const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,delta.length(),10),material);mesh.position.copy(start).add(end).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());bike.add(mesh);return mesh;};
    const box=(size,position,material=dark,rotation=[0,0,0])=>{const mesh=new THREE.Mesh(new THREE.BoxGeometry(...size),material);mesh.position.set(...position);mesh.rotation.set(...rotation);bike.add(mesh);return mesh;};
    const wheel=x=>{
        const group=new THREE.Group();group.position.set(x,-.72,0);bike.add(group);
        const tyre=new THREE.Mesh(new THREE.TorusGeometry(.72,.12,14,44),rubber);group.add(tyre);
        const rim=new THREE.Mesh(new THREE.TorusGeometry(.58,.035,8,36),metal);group.add(rim);
        const hub=new THREE.Mesh(new THREE.CylinderGeometry(.11,.11,.24,16),metal);hub.rotation.x=Math.PI/2;group.add(hub);
        for(let i=0;i<10;i++){const angle=i*Math.PI/5;const spoke=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.56,6),metal);spoke.position.set(Math.cos(angle)*.28,Math.sin(angle)*.28,0);spoke.rotation.z=angle+Math.PI/2;group.add(spoke);}
    };
    wheel(-1.35);wheel(1.35);
    tube([-1.35,-.72,0],[.15,-.24,0],.065,paint);tube([.15,-.24,0],[-.56,.55,0],.065,paint);tube([-.56,.55,0],[-1.35,-.72,0],.06,paint);
    tube([.15,-.24,0],[.92,.62,0],.07,paint);tube([.92,.62,.07],[1.35,-.72,.07],.055,metal);tube([.92,.62,-.07],[1.35,-.72,-.07],.055,metal);
    tube([.88,.58,0],[1.03,1.05,0],.045,metal);tube([.7,1.05,0],[1.34,1.05,0],.035,metal);
    box([.84,.58,.54],[-.02,-.37,0],dark,[0,0,-.06]);box([.88,.16,.5],[-.57,.7,0],leather,[0,0,-.08]);
    const tank=new THREE.Mesh(new THREE.SphereGeometry(.52,24,16),paint);tank.scale.set(1.2,.68,.72);tank.position.set(.18,.52,0);tank.rotation.z=-.15;bike.add(tank);
    const headlight=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.18,20),lamp);headlight.position.set(1.08,.74,0);headlight.rotation.x=Math.PI/2;bike.add(headlight);
    tube([-.1,-.35,-.23],[-.52,-.72,-.34],.075,metal);tube([-.52,-.72,-.34],[-1.25,-.72,-.34],.075,metal);
    box([.18,.5,.18],[-.72,.11,.34],dark,[0,0,.5]);box([.42,.08,.25],[-.5,-.58,.34],metal);
    const fender=(x,angle)=>{const mesh=new THREE.Mesh(new THREE.TorusGeometry(.76,.035,8,30,Math.PI),paint);mesh.position.set(x,-.72,0);mesh.rotation.z=angle;bike.add(mesh);};fender(-1.35,0);fender(1.35,0);
    bike.position.y=.16;
    scene.add(new THREE.HemisphereLight(0xf7ead5,0x17362f,2.4));
    const key=new THREE.DirectionalLight(0xffd2a8,4.8);key.position.set(4,6,5);scene.add(key);
    const rimLight=new THREE.DirectionalLight(0x8db6a9,2.5);rimLight.position.set(-5,2,-4);scene.add(rimLight);

    let progress=0,scheduled=false;
    const render=()=>{scheduled=false;const scale=reduced.matches?1.03:.8+Math.sin(progress*Math.PI)*.42;bike.rotation.y=reduced.matches?-.62:-.72+progress*Math.PI*2;bike.rotation.x=reduced.matches?.04:(progress-.5)*.12;bike.scale.setScalar(scale);canvas.dataset.scrollProgress=progress.toFixed(3);canvas.dataset.modelScale=scale.toFixed(3);section.style.setProperty('--moto-progress',progress);renderer.render(scene,camera);};
    const requestRender=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(render);}};
    const resize=()=>{const rect=stage.getBoundingClientRect();renderer.setSize(Math.max(1,rect.width),Math.max(1,rect.height),false);camera.aspect=rect.width/Math.max(1,rect.height);camera.updateProjectionMatrix();requestRender();};
    const update=()=>{if(!reduced.matches){const rect=section.getBoundingClientRect(),distance=Math.max(1,rect.height-innerHeight);progress=Math.min(1,Math.max(0,-rect.top/distance));}requestRender();};
    addEventListener('scroll',update,{passive:true});addEventListener('resize',()=>{resize();update();},{passive:true});reduced.addEventListener('change',update);window.addEventListener('roadbook-theme-change',requestRender);
    new ResizeObserver(resize).observe(stage);resize();update();stage.classList.add('is-ready');canvas.dataset.ready='true';
} catch(error) {
    canvas.hidden=true;
    stage.dataset.error='true';
}
