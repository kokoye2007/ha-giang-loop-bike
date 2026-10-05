const section=document.querySelector('[data-moto-scroll]');
const canvas=document.querySelector('[data-moto-canvas]');
const stage=canvas?.closest('.moto-stage');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');

if(section&&canvas&&stage) try {
    const THREE=await import('three');
    const {GLTFLoader}=await import('three/addons/loaders/GLTFLoader.js');
    const {MeshoptDecoder}=await import('three/addons/libs/meshopt_decoder.module.js');
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(29,1,.1,100);
    camera.position.set(0,.35,7.4);
    const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.2;

    const bike=new THREE.Group();
    const model=(await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync(new URL('../assets/motorcycle/suzuki.glb',import.meta.url).href)).scene;
    const bounds=new THREE.Box3().setFromObject(model),centre=bounds.getCenter(new THREE.Vector3());
    model.position.set(-centre.x,-bounds.min.y,-centre.z);
    model.traverse(node=>{if(node.isMesh){node.castShadow=true;node.receiveShadow=true;}});
    bike.add(model);bike.position.y=-.95;bike.rotation.order='YXZ';scene.add(bike);

    scene.add(new THREE.HemisphereLight(0xfff0d7,0x102d29,2.8));
    const key=new THREE.DirectionalLight(0xffd0aa,5.2);key.position.set(4,6,5);scene.add(key);
    const rim=new THREE.DirectionalLight(0x91c2b3,3.4);rim.position.set(-5,3,-4);scene.add(rim);
    const fill=new THREE.DirectionalLight(0xffffff,1.5);fill.position.set(0,-1,4);scene.add(fill);

    let progress=0,scheduled=false,manualTurn=0,manualZoom=1;
    const controls=document.createElement('div');
    controls.className='moto-controls';
    controls.innerHTML='<button type="button" data-moto-turn="-1" aria-label="Rotate motorcycle left">↶</button><button type="button" data-moto-turn="1" aria-label="Rotate motorcycle right">↷</button><button type="button" data-moto-zoom="1" aria-label="Zoom motorcycle in">+</button><button type="button" data-moto-zoom="-1" aria-label="Zoom motorcycle out">−</button>';
    stage.append(controls);
    const render=()=>{
        scheduled=false;
        const zoom=(reduced.matches?1.3:.85+Math.sin(progress*Math.PI)*.95)*manualZoom;
        const turn=(reduced.matches?-.62:-.65+progress*1.3)+manualTurn;
        bike.rotation.set(reduced.matches?.035:(progress-.5)*.055,turn,0);
        bike.scale.setScalar(zoom);
        bike.position.x=reduced.matches?0:(progress-.5)*-.28;
        canvas.dataset.scrollProgress=progress.toFixed(3);
        canvas.dataset.modelScale=zoom.toFixed(3);
        canvas.dataset.modelRotation=turn.toFixed(3);
        section.style.setProperty('--moto-progress',progress);
        renderer.render(scene,camera);
    };
    const requestRender=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(render);}};
    controls.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;if(button.dataset.motoTurn)manualTurn+=Number(button.dataset.motoTurn)*.35;if(button.dataset.motoZoom)manualZoom=Math.min(1.8,Math.max(.6,manualZoom+Number(button.dataset.motoZoom)*.15));requestRender();});
    const resize=()=>{const rect=stage.getBoundingClientRect();renderer.setSize(Math.max(1,rect.width),Math.max(1,rect.height),false);camera.aspect=rect.width/Math.max(1,rect.height);camera.updateProjectionMatrix();requestRender();};
    const update=()=>{if(!reduced.matches){const rect=section.getBoundingClientRect(),distance=Math.max(1,rect.height-innerHeight);progress=Math.min(1,Math.max(0,-rect.top/distance));}requestRender();};
    addEventListener('scroll',update,{passive:true});addEventListener('resize',()=>{resize();update();},{passive:true});reduced.addEventListener('change',update);window.addEventListener('roadbook-theme-change',requestRender);
    new ResizeObserver(resize).observe(stage);resize();update();stage.classList.add('is-ready');canvas.dataset.ready='true';
} catch(error) {
    canvas.hidden=true;
    stage.dataset.error='true';
}
