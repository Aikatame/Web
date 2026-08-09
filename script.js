const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
    alpha:true,
    antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document
.getElementById("three-container")
.appendChild(renderer.domElement);

camera.position.z = 8;

// Blue Ring
const ring1 = new THREE.Mesh(
new THREE.TorusGeometry(3,0.08,16,100),
new THREE.MeshBasicMaterial({
    color:0x00cfff
})
);

scene.add(ring1);

// Yellow Ring
const ring2 = new THREE.Mesh(
new THREE.TorusGeometry(4.3,0.05,16,100),
new THREE.MeshBasicMaterial({
    color:0xffd700
})
);

ring2.rotation.x = 1.2;

scene.add(ring2);

// Vertical Orbit
const ring3 = new THREE.Mesh(
new THREE.TorusGeometry(3.5,0.03,16,100),
new THREE.MeshBasicMaterial({
    color:0xffffff
})
);

ring3.rotation.y = 1.5;

scene.add(ring3);

// Stars
const starsGeometry = new THREE.BufferGeometry();
const starVertices = [];

for(let i=0;i<2000;i++){

    starVertices.push(
        (Math.random()-0.5)*100,
        (Math.random()-0.5)*100,
        (Math.random()-0.5)*100
    );

}

starsGeometry.setAttribute(
'position',
new THREE.Float32BufferAttribute(starVertices,3)
);

const stars = new THREE.Points(
starsGeometry,
new THREE.PointsMaterial({
    color:0x00cfff,
    size:0.05
})
);

scene.add(stars);

function animate(){

requestAnimationFrame(animate);

ring1.rotation.z += 0.005;
ring1.rotation.x += 0.002;

ring2.rotation.y += 0.004;

ring3.rotation.x += 0.006;

stars.rotation.y += 0.0005;

renderer.render(scene,camera);
}

animate();

window.addEventListener("resize",()=>{

camera.aspect=
window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

});

<script>
document.addEventListener("mousemove", function(e) {
    const spark = document.createElement("div");
    spark.className = "lightning";

    spark.style.left = e.clientX + "px";
    spark.style.top = e.clientY + "px";

    // random flicker size (more electric feel)
    const size = Math.random() * 10 + 10;
    spark.style.width = size + "px";
    spark.style.height = size + "px";

    document.body.appendChild(spark);

    setTimeout(() => {
        spark.remove();
    }, 600);
});
</script>