function saveUser() {
    let u = document.getElementById("username").value.trim();
    if (!u) return alert("Isi namanya dulu ya!");
    localStorage.setItem("currentUser", u);
    alert("Nama disimpan!");
}

function upload() {
    let url = document.getElementById("imgurl").value.trim();
    let user = localStorage.getItem("currentUser");

    if (!user) return alert("Isi & simpan namamu dulu!");
    if (!url) return alert("Link gambar masih kosong!");

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.push({
        img: url,
        uploader: user
    });

    localStorage.setItem("posts", JSON.stringify(posts));
    document.getElementById("imgurl").value = "";
    loadPosts();
}

function deletePost(i) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let user = localStorage.getItem("currentUser");

    if (posts[i].uploader !== user) {
        return alert("Hanya yang upload bisa menghapus!");
    }

    posts.splice(i, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let user = localStorage.getItem("currentUser");
    let html = "";

    posts.forEach((p, i) => {
        html += `
            <div class="post">
                <img src="${p.img}">
                <p>Uploader: <b>${p.uploader}</b></p>

                ${p.uploader === user 
                    ? `<button class="del-btn" onclick="deletePost(${i})">Hapus</button>`
                    : ""
                }
            </div>
        `;
    });

    document.getElementById("gallery").innerHTML = html;
}

loadPosts();
